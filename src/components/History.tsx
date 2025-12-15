import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { useHistoryStore } from "../store/history-store";

const History = () => {
  const { history } = useHistoryStore();
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        History
      </Typography>

      {history?.map((h) => (
        <Card key={h.timestamp} sx={{ mb: 2 }}>
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <img src={h.image} alt="" width={64} height={64} />
            <Box flex={1}>
              <Typography fontWeight={600}>{h.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {h.criteria.area} • {h.criteria.ingredient}
              </Typography>
            </Box>
            <Chip
              color={h.liked ? "success" : "error"}
              label={h.liked ? "Liked" : "Disliked"}
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default History;
