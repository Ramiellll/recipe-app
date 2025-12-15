import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
import { useRecipeRecommendation } from "../hooks/useRecipes";
import { useWizardStore } from "../store/wizard-store";
import EmptyResult from "./EmptyResult";
import { useHistoryStore } from "../store/history-store";

const Result = () => {
  const { ingredient, setActiveStep, activeStep, area } = useWizardStore();
  const { addHistoryItem } = useHistoryStore();
  const isResultStep = activeStep === 2;
  const handleFeedback = (liked: boolean, timestamp: number) => {
    if (!meal) {
      return;
    }

    addHistoryItem({
      id: meal.idMeal,
      title: meal.strMeal,
      timestamp,
      criteria: {
        area,
        ingredient
      },
      image: meal.strMealThumb,
      liked,
    });
  };
  const {
    data: meal,
    isFetching: loadingMeal,
    isLoading,
    isError,
    error,
    refetch: fetchMeal,
  } = useRecipeRecommendation(ingredient, isResultStep);

  return (
    <Box>
      {isLoading && <CircularProgress sx={{ mt: 2 }} />}

      {isError && (
        <Box sx={{ mt: 2 }}>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => fetchMeal()}>
                Retry
              </Button>
            }
          >
            {(error as Error)?.message || "Failed to fetch recipe."}
          </Alert>
        </Box>
      )}

      {meal && !isLoading && !isError && (
        <Box>
          <Card sx={{ mt: 2 }}>
            <CardMedia component="img" height="200" image={meal.strMealThumb} />
            <CardContent>
              <Typography variant="h6">{meal.strMeal}</Typography>
              <Typography color="text.secondary">
                {meal.strCategory} • {meal.strArea}
              </Typography>
              {meal.strSource && (
                <Button href={meal.strSource} target="_blank" sx={{ mt: 1 }}>
                  View recipe
                </Button>
              )}

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => handleFeedback(true, Date.now())}
                >
                  Yes
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => handleFeedback(false, Date.now())}
                >
                  No
                </Button>
                <Button variant="text" onClick={() => fetchMeal()} disabled={loadingMeal}>
                  New idea
                </Button>
              </Box>
            </CardContent>
          </Card>
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button variant="outlined" onClick={() => setActiveStep(1)}>
              Back
            </Button>
          </Box>
        </Box>
      )}
      {!isLoading && !isError && meal === null && (
        <EmptyResult
          onRetry={() => fetchMeal()}
          onBack={() => setActiveStep(1)}
        />
      )}
    </Box>
  );
};

export default Result;
