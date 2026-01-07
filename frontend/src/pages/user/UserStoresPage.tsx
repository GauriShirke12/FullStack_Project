import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Box, Snackbar } from "@mui/material";
import StoresTable from "@components/tables/stores/StoresTable";
import DashboardLayout from "@layouts/DashboardLayout";
import Loader from "@components/Loader";
import RateStoreDialog from "@components/forms/rating/RateStoreDialog";
import { getUserStores, submitRating } from "@pages/user/api";
import { StoreListItem } from "@pages/user/types";
import { Store, Person } from "@mui/icons-material";

const UserStoresPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({ queryKey: ["user", "stores"], queryFn: getUserStores });
  const [selectedStore, setSelectedStore] = useState<StoreListItem | null>(null);
  const [toastOpen, setToastOpen] = useState(false);

  const submitMutation = useMutation({
    mutationFn: async ({ storeId, score }: { storeId: number; score: number }) => submitRating({ storeId, score }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user", "stores"] });
      setToastOpen(true);
    }
  });

  const navigation = [
    { to: "/user", label: "Stores", icon: <Store /> },
    { to: "/user/profile", label: "Profile", icon: <Person /> }
  ];

  return (
    <DashboardLayout title="Browse Stores" navigation={navigation}>
      {isLoading && <Loader />}
      {isError && <Alert severity="error">Failed to load stores.</Alert>}
      {!isLoading && data && (
        <Box>
          <StoresTable stores={data as StoreListItem[]} onRate={setSelectedStore} />
        </Box>
      )}
      <RateStoreDialog
        open={Boolean(selectedStore)}
        storeName={selectedStore?.name ?? ""}
        initialRating={selectedStore?.userRating ?? null}
        onClose={() => setSelectedStore(null)}
        onSubmit={async (rating) => {
          if (!selectedStore) {
            return;
          }
          await submitMutation.mutateAsync({ storeId: selectedStore.id, score: rating });
          setSelectedStore(null);
        }}
      />
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        message="Rating saved"
      />
    </DashboardLayout>
  );
};

export default UserStoresPage;
