/* eslint-disable indent */
import {
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import Column from "~/pages/Boards/BoardContent/ListColumns/Column/Column";
import CustomCard from "~/pages/Boards/BoardContent/ListColumns/Column/ListCards/Card/Card";
import ListColumns from "~/pages/Boards/BoardContent/ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent = ({ board }) => {
  const [orderedColumns, setOrderColumns] = useState([]);

  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    );
  };

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);

    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
    }
  };

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const { active, over } = event;

    if (!over || !active) return;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;

    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      setOrderColumns((prevColumns) => {
        const overCardIndex = overColumn?.cards?.findIndex(
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

        const nextColumns = cloneDeep(prevColumns);

        const nextActiveColumn = nextColumns.find(
          (column) => column._id === activeColumn._id
        );
        const nextOverColumn = nextColumns.find(
          (column) => column._id === overColumn._id
        );

        if (nextActiveColumn) {
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          );

          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card) => card._id
          );
        }

        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          );

          const updateActiveData = {
            ...activeDraggingCardData,
            columnId: overColumn._id,
          };

          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            updateActiveData
          );

          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
            (card) => card._id
          );
        }

        return nextColumns;
      });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || !active) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
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
        overColumn.cardOrderIds = overColumn.cards.map((c) => c._id);

        setOrderColumns((c) =>
          c._id === oldColumnWhenDraggingCard._id
            ? oldColumnWhenDraggingCard
            : c._id === overColumn._id
            ? overColumn
            : c
        );
      } else {
        const oldIndex = oldColumnWhenDraggingCard.cards.findIndex(
          (c) => c._id === activeDragItemId
        );
        const newIndex = oldColumnWhenDraggingCard.cards.findIndex(
          (c) => c._id === overCardId
        );

        const cardNewOrdered = arrayMove(
          oldColumnWhenDraggingCard.cards,
          oldIndex,
          newIndex
        );

        const cardNewOrderIds = cardNewOrdered.map((c) => c._id);

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
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
        const newIndex = orderedColumns.findIndex((c) => c._id === over.id);

        const dndNewOrdered = arrayMove(orderedColumns, oldIndex, newIndex);
        // const dndNewOrderedIds = dndNewOrdered.map((c) => c._id);

        setOrderColumns(dndNewOrdered);
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  useEffect(() => {
    setOrderColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <ListColumns columns={orderedColumns} />;
      <DragOverlay dropAnimation={dropAnimation}>
        {!activeDragItemType && null}
        {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
          <Column column={activeDragItemData} />
        )}
        {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
          <CustomCard card={activeDragItemData} />
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default BoardContent;
