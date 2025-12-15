import {
  Box,
  Button,
  Chip,
  CircularProgress,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useIngredientSearch } from "../hooks/useRecipes";
import type { Ingredient } from "../types/types";
import { useWizardStore } from "../store/wizard-store";

const SecondStep = () => {
  const { setIngredient, setActiveStep, ingredient } = useWizardStore();
  const {
    data: suggestions = [],
    isFetching,
    isLoading,
    isError,
    error,
    refetch,
  } = useIngredientSearch(ingredient);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Step 2 - Choose the main ingredient
      </Typography>

      <TextField
        label="Search ingredient"
        fullWidth
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
      />

      {isLoading && (
        <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <CircularProgress size={20} />
          <Typography variant="body2">Searching ingredients…</Typography>
        </Box>
      )}

      {isError && (
        <Box sx={{ mt: 2 }}>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => refetch()}>
                Retry
              </Button>
            }
          >
            {(error as Error)?.message || "Failed to search ingredients."}
          </Alert>
        </Box>
      )}

      {!isLoading && !isFetching && !isError && suggestions.length === 0 && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="info">No ingredients found.</Alert>
        </Box>
      )}

      <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
        {suggestions.map((i: Ingredient) => (
          <Chip
            key={i.idIngredient}
            label={i.strIngredient}
            onClick={() => setIngredient(i.strIngredient)}
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={() => setActiveStep(0)}>
          Back
        </Button>
        <Button
          variant="contained"
          disabled={!ingredient}
          onClick={() => {
            setActiveStep(2);
          }}
        >
          Find recipe
        </Button>
      </Box>
    </Box>
  );
};

export default SecondStep;
