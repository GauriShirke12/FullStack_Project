import { useMemo, useState } from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { AdminUser } from "@pages/admin/types";
import { Order } from "@utils/sort";

interface AdminUsersTableProps {
  users: AdminUser[];
  onInspect: (user: AdminUser) => void;
}

type SortableKeys = keyof Pick<AdminUser, "name" | "email" | "address" | "role">;

const AdminUsersTable = ({ users, onInspect }: AdminUsersTableProps) => {
  const [sortBy, setSortBy] = useState<SortableKeys>("name");
  const [order, setOrder] = useState<Order>("asc");
  const [search, setSearch] = useState("");

  const sortedUsers = useMemo(() => {
    return [...users]
      .filter((user) =>
        [user.name, user.email, user.address, user.role]
          .filter(Boolean)
          .some((field) => field!.toLowerCase().includes(search.toLowerCase()))
      )
      .sort((a, b) => {
        const aVal = a[sortBy] ?? "";
        const bVal = b[sortBy] ?? "";

        return order === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
  }, [users, sortBy, order, search]);

  const handleSort = (property: SortableKeys) => {
    const isAsc = sortBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setSortBy(property);
  };

  return (
    <Box>
      <TextField
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        label="Search by name, email, or role"
        fullWidth
        sx={{ mb: 2 }}
      />
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "name"}
                  direction={sortBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "email"}
                  direction={sortBy === "email" ? order : "asc"}
                  onClick={() => handleSort("email")}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>Address</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "role"}
                  direction={sortBy === "role" ? order : "asc"}
                  onClick={() => handleSort("role")}
                >
                  Role
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address ?? "-"}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onInspect(user)}>
                    <InfoIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminUsersTable;
