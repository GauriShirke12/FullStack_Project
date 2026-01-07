import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Grid, Typography } from "@mui/material";
import DashboardLayout from "@layouts/DashboardLayout";
import StatCard from "@components/cards/StatCard";
import { getAdminDashboard } from "@pages/admin/api";
import { People, Store, Star } from "@mui/icons-material";
import Loader from "@components/Loader";
import { useAuth } from "@context/AuthContext";

const AdminDashboard = () => {
  const { setUser } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: getAdminDashboard
  });

  useEffect(() => {
    if (data?.currentUser) {
      setUser(data.currentUser);
    }
  }, [data?.currentUser, setUser]);

  const navigation = [
    { to: "/admin", label: "Dashboard", icon: <People /> },
    { to: "/admin/users", label: "Users", icon: <People /> },
    { to: "/admin/stores", label: "Stores", icon: <Store /> }
  ];

  return (
    <DashboardLayout title="Admin Dashboard" navigation={navigation}>
      {isLoading && <Loader />}
      {!isLoading && data && (
        <>
          <Box>
            <Typography variant="h1" sx={{ mb: 1 }}>
              Welcome back{data.currentUser?.name ? `, ${data.currentUser.name}` : ""}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Monitor platform performance and community sentiment in real time.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard title="Total Users" value={data.stats.users} icon={<People />} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard title="Total Stores" value={data.stats.stores} icon={<Store />} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard title="Total Ratings" value={data.stats.ratings} icon={<Star />} />
            </Grid>
          </Grid>
        </>
      )}
      {!isLoading && !data && (
        <Typography variant="body1">Failed to load dashboard.</Typography>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
