import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography
} from "@mui/material";
import { StoreListItem } from "@pages/user/types";
import { Order } from "@utils/sort";

interface StoresTableProps {
  stores: StoreListItem[];
  onRate: (store: StoreListItem) => void;
}

type SortableKeys = keyof Pick<StoreListItem, "name" | "address" | "averageRating">;

const StoresTable = ({ stores, onRate }: StoresTableProps) => {
  const [sortBy, setSortBy] = useState<SortableKeys>("name");
  const [order, setOrder] = useState<Order>("asc");
  const [search, setSearch] = useState("");

  const sortedStores = useMemo(() => {
    return [...stores]
      .filter((store) =>
        [store.name, store.address]
          .some((field) => field?.toLowerCase().includes(search.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === "averageRating") {
          const aRating = a.averageRating ?? -1;
          const bRating = b.averageRating ?? -1;
          return order === "asc" ? aRating - bRating : bRating - aRating;
        }

        const aValue = (a[sortBy] ?? "") as string;
        const bValue = (b[sortBy] ?? "") as string;
        return order === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
  }, [stores, sortBy, order, search]);

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
        label="Search by name or address"
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
                  Store Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Address</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "averageRating"}
                  direction={sortBy === "averageRating" ? order : "asc"}
                  onClick={() => handleSort("averageRating")}
                >
                  Overall Rating
                </TableSortLabel>
              </TableCell>
              <TableCell>Your Rating</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStores.map((store) => (
              <TableRow key={store.id} hover>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.address}</TableCell>
                <TableCell>
                  {store.averageRating ? (
                    <Box display="flex" alignItems="center">
                      <Rating value={store.averageRating} readOnly precision={0.5} />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {store.averageRating.toFixed(2)}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No ratings yet
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {store.userRating ? (
                    <Rating value={store.userRating} readOnly />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Not rated
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" size="small" onClick={() => onRate(store)}>
                    {store.userRating ? "Edit Rating" : "Rate Store"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StoresTable;
