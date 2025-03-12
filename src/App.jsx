import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useColorScheme,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

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

export function SelectSmall() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    const colorMode = event.target.value;
    setMode(colorMode);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="mode-color">Mode</InputLabel>
      <Select
        labelId="model-color"
        id="mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Color Mode</em>
        </MenuItem>
        <MenuItem value="dark">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <DarkModeOutlinedIcon fontSize="small" />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value="light">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <LightModeIcon fontSize="small" />
            Light
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <SettingsBrightnessIcon fontSize="small" />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function App() {
  return (
    <>
      <Button variant="contained">Hello World</Button>
      <ModeToggle />
      <SelectSmall />
    </>
  );
}

export default App;
