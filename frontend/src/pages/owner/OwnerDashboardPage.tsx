import { useQuery } from "@tanstack/react-query";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import DashboardLayout from "@layouts/DashboardLayout";
import Loader from "@components/Loader";
import { getOwnerDashboard } from "@pages/owner/api";
import { Store } from "@mui/icons-material";

const OwnerDashboardPage = () => {
  const { data, isLoading } = useQuery({ queryKey: ["owner", "dashboard"], queryFn: getOwnerDashboard });

  const navigation = [
    { to: "/owner", label: "Dashboard", icon: <Store /> }
  ];

  return (
    <DashboardLayout title="Store Owner Dashboard" navigation={navigation}>
      {isLoading && <Loader />}
      {!isLoading && data && (
        <Grid container spacing={2}>
          {data.map((store) => (
            <Grid item xs={12} md={6} key={store.store.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{store.store.name}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Average Rating: {store.store.averageRating ?? "No ratings yet"}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Recent Ratings
                    </Typography>
                    {store.ratings.length === 0 && (
                      <Typography variant="body2" color="text.secondary">
                        No ratings yet.
                      </Typography>
                    )}
                    {store.ratings.map((rating, index) => (
                      <Box key={index} sx={{ mb: 1 }}>
                        <Typography variant="body2">
                          {rating.user.name} ({rating.user.email}) - {rating.score} stars
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {!isLoading && !data && <Typography variant="body1">Failed to load dashboard.</Typography>}
    </DashboardLayout>
  );
};

export default OwnerDashboardPage;
