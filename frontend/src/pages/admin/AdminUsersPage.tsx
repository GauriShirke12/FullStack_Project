import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { People, Store } from "@mui/icons-material";
import DashboardLayout from "@layouts/DashboardLayout";
import AdminUsersTable from "@components/tables/admin/AdminUsersTable";
import Loader from "@components/Loader";
import { getAdminUsers } from "@pages/admin/api";
import { AdminUser } from "@pages/admin/types";

const AdminUsersPage = () => {
  const { data, isLoading } = useQuery({ queryKey: ["admin", "users"], queryFn: getAdminUsers });
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const navigation = [
    { to: "/admin", label: "Dashboard", icon: <People /> },
    { to: "/admin/users", label: "Users", icon: <People /> },
    { to: "/admin/stores", label: "Stores", icon: <Store /> }
  ];

  return (
    <DashboardLayout title="Manage Users" navigation={navigation}>
      {isLoading && <Loader />}
      {!isLoading && data && <AdminUsersTable users={data} onInspect={setSelectedUser} />}
      <Dialog open={Boolean(selectedUser)} onClose={() => setSelectedUser(null)} maxWidth="sm" fullWidth>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser ? (
            <>
              <Typography variant="subtitle1">Name: {selectedUser.name}</Typography>
              <Typography variant="subtitle1">Email: {selectedUser.email}</Typography>
              <Typography variant="subtitle1">Role: {selectedUser.role}</Typography>
              <Typography variant="subtitle1">Address: {selectedUser.address ?? "-"}</Typography>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminUsersPage;
