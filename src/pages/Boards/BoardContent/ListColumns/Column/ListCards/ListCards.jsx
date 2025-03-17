import { Box } from "@mui/material";
import CustomCard from "~/pages/Boards/BoardContent/ListColumns/Column/ListCards/Card/Card";

const ListCards = ({ cards }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: "0 5px",
        m: "0 5px",
        overflowX: "hidden",
        overflowY: "auto",
        maxHeight: (theme) =>
          `calc(
${theme.trelloCustom.boardContentHeight} - 
${theme.spacing(5)} - 
${theme.trelloCustom.columnHeaderHeight} - 
${theme.trelloCustom.columnFooterHeight})`,
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ced0da",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#bfc2cf",
        },
      }}
    >
      {cards.map((card) => (
        <CustomCard key={card._id} card={card} />
      ))}
    </Box>
  );
};

export default ListCards;
