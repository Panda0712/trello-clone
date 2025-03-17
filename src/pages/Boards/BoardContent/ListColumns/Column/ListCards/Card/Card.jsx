import { Attachment, Comment, Group } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const CustomCard = ({ temporaryHideMedia }) => {
  if (temporaryHideMedia) {
    return (
      <Card
        sx={{
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
          overflow: "unset",
        }}
      >
        <CardContent
          sx={{
            p: 1.5,
            "&:last-child": {
              p: 1.5,
            },
          }}
        >
          <Typography>Panda MERN Stack</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        overflow: "unset",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD-9774ovWzYp6o-qiMg1_8Ok9OSPz_U135w&s"
        title="green iguana"
      />
      <CardContent
        sx={{
          p: 1.5,
          "&:last-child": {
            p: 1.5,
          },
        }}
      >
        <Typography>Panda MERN Stack</Typography>
      </CardContent>
      <CardActions sx={{ p: "0 4px 8px 4px" }}>
        <Button size="small" startIcon={<Group />}>
          20
        </Button>
        <Button size="small" startIcon={<Comment />}>
          15
        </Button>
        <Button size="small" startIcon={<Attachment />}>
          10
        </Button>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
