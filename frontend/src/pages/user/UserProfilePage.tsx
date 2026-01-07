import { useQuery } from "@tanstack/react-query";
import { Alert, Box, Card, CardContent, TextField, Typography } from "@mui/material";
import DashboardLayout from "@layouts/DashboardLayout";
import Loader from "@components/Loader";
import { getUserProfile } from "@pages/user/api";
import { Person, Store } from "@mui/icons-material";

const UserProfilePage = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ["user", "profile"], queryFn: getUserProfile });

  const navigation = [
    { to: "/user", label: "Stores", icon: <Store /> },
    { to: "/user/profile", label: "Profile", icon: <Person /> }
  ];

  return (
    <DashboardLayout title="My Profile" navigation={navigation}>
      {isLoading && <Loader />}
      {isError && <Alert severity="error">Failed to load profile.</Alert>}
      {!isLoading && data && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2}>
              <TextField label="Full Name" value={data.name} InputProps={{ readOnly: true }} />
              <TextField label="Email" value={data.email} InputProps={{ readOnly: true }} />
              <TextField label="Address" value={data.address ?? "-"} InputProps={{ readOnly: true }} multiline minRows={2} />
              <TextField label="Role" value={data.role} InputProps={{ readOnly: true }} />
            </Box>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default UserProfilePage;
