import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Attachment, Comment, Group } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  toggleShowModalActiveCard,
  updateCurrentActiveCard,
} from "~/redux/activeCard/activeCardSlice";

const CustomCard = ({ card }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id, data: { ...card } });

  const dispatch = useDispatch();

  const dndKitCardStyles = {
    // touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid #2ecc71" : undefined,
  };

  const showCardActions =
    !!card?.memberIds?.length ||
    !!card?.comments?.length ||
    !!card?.attachments?.length;

  const setActiveCardToRedux = () => {
    dispatch(updateCurrentActiveCard(card));
    dispatch(toggleShowModalActiveCard());
  };

  return (
    <Card
      onClick={setActiveCardToRedux}
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        overflow: "unset",
        display: card?.FE_PlaceholderCard ? "none" : "block",
        border: "1px solid transparent",
        "&:hover": {
          borderColor: (theme) => theme.palette.primary.main,
        },
      }}
    >
      {card?.cover && (
        <CardMedia
          sx={{ height: 140 }}
          image={card.cover}
          title={card?.title}
        />
      )}
      <CardContent
        sx={{
          p: 1.5,
          "&:last-child": {
            p: 1.5,
          },
        }}
      >
        <Typography>{card?.title}</Typography>
      </CardContent>
      {showCardActions && (
        <CardActions sx={{ p: "0 4px 8px 4px" }}>
          {!!card?.memberIds?.length && (
            <Button size="small" startIcon={<Group />}>
              {card.memberIds.length}
            </Button>
          )}
          {!!card?.comments?.length && (
            <Button size="small" startIcon={<Comment />}>
              {card.comments.length}
            </Button>
          )}
          {!!card?.attachments?.length && (
            <Button size="small" startIcon={<Attachment />}>
              {card.attachments.length}
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default CustomCard;
