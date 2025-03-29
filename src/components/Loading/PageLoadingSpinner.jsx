import { Box, CircularProgress, Typography } from "@mui/material";

const PageLoadingSpinner = ({ caption }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography>{caption}</Typography>
    </Box>
  );
};

export default PageLoadingSpinner;
