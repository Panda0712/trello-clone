import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import ListColumns from "~/pages/Boards/BoardContent/ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";

const BoardContent = ({ board }) => {
  const [orderedColumns, setOrderColumns] = useState([]);

  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     distance: 10,
  //   },
  // });
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

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id);

      const dndNewOrdered = arrayMove(orderedColumns, oldIndex, newIndex);
      // const dndNewOrderedIds = dndNewOrdered.map((c) => c._id);

      setOrderColumns(dndNewOrdered);
    }
  };

  useEffect(() => {
    setOrderColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <ListColumns columns={orderedColumns} />;
    </DndContext>
  );
};

export default BoardContent;
