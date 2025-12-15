import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useWizardStore } from "../store/wizard-store";
import { useAreas } from "../hooks/useRecipes";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FirstStep = () => {
  const {
    data: areas,
    isFetching: loadingAreas,
    isLoading,
    isError,
    error,
    refetch: refetchAreas,
  } = useAreas();
  const { setActiveStep, setArea, area } = useWizardStore();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Step 1 - Choose your cuisine
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Cuisine / Area</InputLabel>

        <Select
          value={area}
          label="Cuisine / Area"
          onChange={(e) => setArea(e.target.value as string)}
          MenuProps={MenuProps}
          disabled={
            isLoading ||
            loadingAreas ||
            isError ||
            (areas && areas.length === 0)
          }
        >
          {areas?.map((a) => (
            <MenuItem key={a.strArea} value={a.strArea}>
              {a.strArea}
            </MenuItem>
          ))}
        </Select>

        {isLoading && (
          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={20} />
            <Typography variant="body2">Loading cuisines…</Typography>
          </Box>
        )}

        {isError && (
          <Box sx={{ mt: 2 }}>
            <Alert
              severity="error"
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => refetchAreas()}
                >
                  Retry
                </Button>
              }
            >
              {(error as Error)?.message || "Failed to load cuisines."}
            </Alert>
          </Box>
        )}

        {!isLoading && !isError && areas && areas.length === 0 && (
          <Box sx={{ mt: 2 }}>
            <Alert severity="info">
              No cuisines found.{" "}
              <Button onClick={() => refetchAreas()}>Try again</Button>
            </Alert>
          </Box>
        )}
      </FormControl>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        disabled={!area}
        onClick={() => setActiveStep(1)}
      >
        Next
      </Button>
    </Box>
  );
};

export default FirstStep;
