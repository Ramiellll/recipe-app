import { Card, CardContent, Button, Typography, Box } from "@mui/material";

interface EmptyResultProps {
  onRetry: () => void;
  onBack: () => void;
}

const EmptyResult = ({ onRetry, onBack }: EmptyResultProps) => {
  return (
    <Card sx={{ mt: 2, textAlign: "center", p: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          No recipe found
        </Typography>

        <Typography color="text.secondary" gutterBottom>
          We couldn’t find a recipe that matches your preferences.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
          <Button variant="outlined" onClick={onBack}>
            Change criteria
          </Button>
          <Button variant="contained" onClick={onRetry}>
            Try again
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default EmptyResult;