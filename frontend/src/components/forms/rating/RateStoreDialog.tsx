import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Typography
} from "@mui/material";

interface RateStoreDialogProps {
  open: boolean;
  storeName: string;
  initialRating: number | null;
  onClose: () => void;
  onSubmit: (rating: number) => Promise<void>;
}

const RateStoreDialog = ({ open, storeName, initialRating, onClose, onSubmit }: RateStoreDialogProps) => {
  const [rating, setRating] = useState<number | null>(initialRating ?? 3);
    useEffect(() => {
      setRating(initialRating ?? 3);
    }, [initialRating, open]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!rating) {
      setError("Please select a rating between 1 and 5");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(rating);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to submit rating. Try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Rate {storeName}</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" flexDirection="column" py={2}>
          <Typography variant="body1" gutterBottom>
            Select your rating (1-5 stars)
          </Typography>
          <Rating
            name="store-rating"
            value={rating}
            onChange={(_event, value) => setRating(value)}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RateStoreDialog;
