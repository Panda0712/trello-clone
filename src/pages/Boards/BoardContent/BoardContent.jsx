/* eslint-disable indent */
import {
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  getFirstCollision,
  // MouseSensor,
  pointerWithin,
  // TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { cloneDeep, isEmpty } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { MouseSensor, TouchSensor } from "~/customLibraries/DndKitSensors";
import Column from "~/pages/Boards/BoardContent/ListColumns/Column/Column";
import CustomCard from "~/pages/Boards/BoardContent/ListColumns/Column/ListCards/Card/Card";
import ListColumns from "~/pages/Boards/BoardContent/ListColumns/ListColumns";
import { generatePlaceholderCard } from "~/utils/formatters";

// store the type of the active drag item (column or card)
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent = ({
  board,
  createNewColumn,
  createNewCard,
  updateColumns,
  updateCardsSameColumn,
  updateCardsDifferentColumns,
  deleteColumnDetails,
}) => {
  // array to store the order of columns
  const [orderedColumns, setOrderColumns] = useState([]);

  // store the id of the active drag item (column or card)
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  // store the type of the active drag item (column or card)
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  // store the data of the active drag item (column or card)
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  // store the previous column when dragging a card
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);

  // store the id of the last over item (don't need to care much)
  const lastOverId = useRef(null);

  // config the sensor for mouse (laptop and pc)
  const mouseSensor = useSensor(MouseSensor, {
    // config the distance to trigger the drag and drop logic (10px)
    activationConstraint: {
      distance: 10,
    },
  });
  // config the sensor for touch (tablet and mobile)
  const touchSensor = useSensor(TouchSensor, {
    // config the distance and delay to trigger the drag and drop logic (250ms and tolerance 500)
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });
  // config the sensors variables to use both the mouseSensor and the touchSensor
  const sensors = useSensors(mouseSensor, touchSensor);

  // function to find a column by cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    );
  };

  // handle the drag start event
  const handleDragStart = (event) => {
    // set the id of the active item
    setActiveDragItemId(event?.active?.id);
    // set the type of the active item
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    // set the data of the active item
    setActiveDragItemData(event?.active?.data?.current);

    // if the active item has the columnId, set the old column data to the oldColumnWhenDraggingCard
    // because when we drag the card into new column, we need to update the columnId of that card. If not, BUG
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
    }
  };

  // handle the drag over event (trigger when you are dragging or dropping a card or column and not completed yet)
  const handleDragOver = (event) => {
    // We just need to handle drag over of card, not column
    // because we can config column drag logic in the drag end event and it will be enough smooth, no need to handle drag over
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    // access the active and over of the event
    // active: old data
    // over: new data
    const { active, over } = event;

    if (!over || !active) return;

    // access the id and data of the active item
    // access the id of the overItem
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;

    // find the column of the active item
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    // find the column of the over item
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;

    // handle when we drag a card to another column, not the same column
    if (activeColumn._id !== overColumn._id) {
      setOrderColumns((prevColumns) => {
        // find the index of the new card position in the new column
        const overCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardId
        );

        // initial new card Index to calculate right logic
        let newCardIndex;
        // logic of the dnd-kit library (no need to deeply try to understand)
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;
        // logic of the library too
        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn?.cards?.length + 1;

        // clone the previous column into new constant to return
        const nextColumns = cloneDeep(prevColumns);

        // find the active column
        // because we don't want to touch the data of the main orderedColumns, so we clone into new array and find again
        const nextActiveColumn = nextColumns.find(
          (column) => column._id === activeColumn._id
        );
        // find the over column
        const nextOverColumn = nextColumns.find(
          (column) => column._id === overColumn._id
        );

        // handle if the nextActiveColumn exists
        if (nextActiveColumn) {
          // delete the old cardId of the old column
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          );

          // if the old column is empty, create a new placeholder card to prevent bug
          if (isEmpty(nextActiveColumn.cards)) {
            nextActiveColumn.cards = [
              generatePlaceholderCard(nextActiveColumn),
            ];
          }

          // update the cardOrderIds array of the column array
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card) => card._id
          );
        }

        // handle if the nextOverColumn exists
        if (nextOverColumn) {
          // delete the cardId to clear the logic first
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          );

          // create a new object card data to insert new card to new column
          const updateActiveData = {
            ...activeDraggingCardData,
            columnId: overColumn._id,
          };

          // insert new card to new column
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            updateActiveData
          );

          // if the new column has the placeholder card after inserted, delete it
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (c) => !c.FE_PlaceholderCard
          );

          // update the cardOrderIds array of the column array
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
            (card) => card._id
          );
        }

        // return new array to set to the state
        return nextColumns;
      });
    }
  };

  // handle the drag end event (triggered when you finished dragging or dropping column or card)
  const handleDragEnd = (event) => {
    // access the active and the over
    const { active, over } = event;

    if (!over || !active) return;

    // handle when drag item is a card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // LOGIC IS THE SAME WITH THE HANDLE DRAG OVER, JUST A LITTLE BIT DIFFERENT
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;

      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (!activeColumn || !overColumn) return;

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        const overCardIndex = overColumn.cards.findIndex(
          (c) => c._id === overCardId
        );
        let newCardIndex;
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn?.cards?.length + 1;

        // Handle Old Column
        oldColumnWhenDraggingCard.cards =
          oldColumnWhenDraggingCard.cards.filter(
            (c) => c._id !== activeDraggingCardId
          );

        if (isEmpty(oldColumnWhenDraggingCard.cards)) {
          oldColumnWhenDraggingCard.cards = [
            generatePlaceholderCard(oldColumnWhenDraggingCard),
          ];
        }

        oldColumnWhenDraggingCard.cardOrderIds =
          oldColumnWhenDraggingCard.cards.map((c) => c._id);

        // Handle New Column
        overColumn.cards = overColumn.cards.filter(
          (c) => c._id !== activeDraggingCardId
        );

        const updateActiveData = {
          ...activeDraggingCardData,
          columnId: overColumn._id,
        };

        overColumn.cards = overColumn.cards.toSpliced(
          newCardIndex,
          0,
          updateActiveData
        );

        overColumn.cards = overColumn.cards.filter(
          (c) => !c.FE_PlaceholderCard
        );

        overColumn.cardOrderIds = overColumn.cards.map((c) => c._id);

        setOrderColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);

          const newOrderedColumns = nextColumns.map((c) =>
            c._id === oldColumnWhenDraggingCard._id
              ? oldColumnWhenDraggingCard
              : c._id === overColumn._id
              ? overColumn
              : c
          );

          updateCardsDifferentColumns(
            activeDraggingCardId,
            oldColumnWhenDraggingCard._id,
            overColumn._id,
            newOrderedColumns
          );

          return newOrderedColumns;
        });
      } else {
        // handle when we drag a card in the same column, logic the same with the drag column
        // take the oldIndex
        const oldIndex = oldColumnWhenDraggingCard.cards.findIndex(
          (c) => c._id === activeDragItemId
        );
        // take the newIndex
        const newIndex = oldColumnWhenDraggingCard.cards.findIndex(
          (c) => c._id === overCardId
        );

        // call the arrayMove function of the library to handle the order logic
        const cardNewOrdered = arrayMove(
          oldColumnWhenDraggingCard.cards,
          oldIndex,
          newIndex
        );

        // update new cardOrderIds array
        const cardNewOrderIds = cardNewOrdered.map((c) => c._id);

        // update new data to the column array, find the column and update new data
        const newOrderedColumns = orderedColumns.map((c) =>
          c._id === oldColumnWhenDraggingCard._id
            ? {
                ...c,
                cardOrderIds: cardNewOrderIds,
                cards: cardNewOrdered,
              }
            : c
        );
        setOrderColumns(newOrderedColumns);

        updateCardsSameColumn(
          cardNewOrdered,
          cardNewOrderIds,
          oldColumnWhenDraggingCard._id
        );
      }
    }

    // handle when dragging a column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
        const newIndex = orderedColumns.findIndex((c) => c._id === over.id);

        const dndNewOrdered = arrayMove(orderedColumns, oldIndex, newIndex);
        // const dndNewOrderedIds = dndNewOrdered.map((c) => c._id);

        setOrderColumns(dndNewOrdered);

        updateColumns(dndNewOrdered);
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  // animation when dragging a column or a card
  // card or column will have the opacity of 0.5 when dragging
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  // algorithm to detect the collision, custom to prevent flickering bug of the dnd-kit library
  const collisionDetectionStrategy = useCallback(
    (args) => {
      // this bug will just happen when we drag a card, so we just need to use the closestCorners algorithm if the active item is a column
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }
      // First, let's see if there are any collisions with the pointer
      // pointerIntersection is a array of position when dragging. Old position, new position, possible position
      // when we drag in an available space
      // If not, it will be null when we drag out available space
      const pointerIntersections = pointerWithin(args);

      if (!pointerIntersections?.length) return;

      // take the overId of dragging
      let overId = getFirstCollision(pointerIntersections, "id");
      if (overId) {
        // find the column with the overId
        const checkColumn = orderedColumns.find(
          (column) => column._id === overId
        );
        // no need to deeply understanding
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId &&
                checkColumn?.cardOrderIds?.includes(container.id)
            ),
          })[0]?.id;
        }

        lastOverId.current = overId;
        return [{ id: overId }];
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedColumns]
  );

  // useEffect to catch the time when the order of column is changed
  useEffect(() => {
    setOrderColumns(board.columns);
  }, [board]);

  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <ListColumns
        columns={orderedColumns}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        deleteColumnDetails={deleteColumnDetails}
      />
      ;
      <DragOverlay dropAnimation={dropAnimation}>
        {/* return null when the type is null */}
        {!activeDragItemType && null}
        {/* return column when the type is column */}
        {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
          <Column column={activeDragItemData} />
        )}
        {/* return card when the type is card */}
        {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
          <CustomCard card={activeDragItemData} />
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default BoardContent;
