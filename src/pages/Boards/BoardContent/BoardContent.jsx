import ListColumns from "~/pages/Boards/BoardContent/ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";

const BoardContent = ({ board }) => {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, "_id");

  return <ListColumns columns={orderedColumns} />;
};

export default BoardContent;
