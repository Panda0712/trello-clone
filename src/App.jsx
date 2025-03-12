import { Button, useColorScheme } from "@mui/material";

const ModeToggle = () => {
  const { mode, setMode } = useColorScheme();

  return (
    <Button
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
};

function App() {
  return (
    <>
      <Button variant="contained">Hello World</Button>
      <ModeToggle />
    </>
  );
}

export default App;
