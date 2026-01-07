import { useQuery } from "@tanstack/react-query";
import { People, Store } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useMemo, useState } from "react";
import DashboardLayout from "@layouts/DashboardLayout";
import Loader from "@components/Loader";
import { getAdminStores } from "@pages/admin/api";
import { AdminStore } from "@pages/admin/types";

const AdminStoresPage = () => {
  const { data, isLoading } = useQuery({ queryKey: ["admin", "stores"], queryFn: getAdminStores });
  const [search, setSearch] = useState("");
  const [selectedStore, setSelectedStore] = useState<AdminStore | null>(null);

  const navigation = [
    { to: "/admin", label: "Dashboard", icon: <People /> },
    { to: "/admin/users", label: "Users", icon: <People /> },
    { to: "/admin/stores", label: "Stores", icon: <Store /> }
  ];

  const filteredStores = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.filter((store) =>
      [store.name, store.email ?? "", store.address]
        .some((value) => value.toLowerCase().includes(search.toLowerCase()))
    );
  }, [data, search]);

  return (
    <DashboardLayout title="Manage Stores" navigation={navigation}>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Filter by name, email, or address"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </Box>
          <Grid container spacing={2}>
            {filteredStores.map((store) => (
              <Grid item xs={12} md={6} lg={4} key={store.id}>
                <StoreCard store={store} onInspect={() => setSelectedStore(store)} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <Dialog open={Boolean(selectedStore)} onClose={() => setSelectedStore(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Store Details</DialogTitle>
        <DialogContent>
          {selectedStore ? (
            <>
              <Typography variant="subtitle1">Name: {selectedStore.name}</Typography>
              <Typography variant="subtitle1">Email: {selectedStore.email ?? "-"}</Typography>
              <Typography variant="subtitle1">Address: {selectedStore.address}</Typography>
              <Typography variant="subtitle1">Owner: {selectedStore.owner?.name ?? "Unassigned"}</Typography>
              <Typography variant="subtitle1">Average Rating: {selectedStore.averageRating ?? "No ratings yet"}</Typography>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

interface StoreCardProps {
  store: AdminStore;
  onInspect: () => void;
}

const StoreCard = ({ store, onInspect }: StoreCardProps) => (
  <Box
    sx={{
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 2,
      p: 2,
      cursor: "pointer",
      "&:hover": {
        borderColor: "primary.main"
      }
    }}
    onClick={onInspect}
  >
    <Typography variant="h6">{store.name}</Typography>
    <Typography variant="body2" color="text.secondary">
      {store.address}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Owner: {store.owner?.name ?? "Unassigned"}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Average Rating: {store.averageRating ?? "No ratings yet"}
    </Typography>
  </Box>
);

export default AdminStoresPage;
