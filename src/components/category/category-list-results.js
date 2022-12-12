import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { format } from "date-fns";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  TableSortLabel,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchCategories } from "src/store/reducers/categorySlice";
import EditIcon from "@mui/icons-material/Edit";
import EastIcon from "@mui/icons-material/East";
import TableSkelton from "../skeleton";
import Link from "next/link";

export const CategoryListResults = ({
  selectedCategoryIds,
  handleSelectAll,
  handleSelectOne,
  categories,
  isSelectedAll,
  searchField,
  total_records,
  ...rest
}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const [sort, setSort] = useState({
    quantity: null,
    createdAt: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchCategories({ page: page, limit: limit }, setLoading));
    };

    fetchData();

    return () => {};
  }, [page]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const categoryFilter = categories.filter(([key, category]) => category.name.includes(searchField));
  //     // if ()
  //     // dispatch(fetchCategories({ searchField, page: page, limit: limit }, setLoading));
  //     console.log(categoryFilter);
  //   };

  //   fetchData();

  //   return () => {};
  // }, [searchField]);

  const handleLimitChange = (event) => {
    setPage(Math.ceil(categories.length / event.target.value));
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelectedAll}
                    color="primary"
                    indeterminate={
                      selectedCategoryIds.length > 0 &&
                      selectedCategoryIds.length < categories.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ minWidth: 250 }}>Category Ref</TableCell>
                <TableCell sx={{ minWidth: 300 }}>Name</TableCell>

                <TableCell sx={{ textAlign: "center" }}>Products count</TableCell>
                <TableCell sortDirection={sort.createdAt ? sort.createdAt : "desc"}>
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel
                      active
                      direction={sort.createdAt ? sort.createdAt : "desc"}
                      onClick={() => {
                        if (sort.createdAt == "asc") setSort({ ...sort, createdAt: "desc" });
                        else setSort({ ...sort, createdAt: "asc" });
                      }}
                    >
                      Created at
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>

                <TableCell sx={{ px: 4 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? Array(limit / 5).map((_value, idx) => <TableSkelton key={idx} />)
                : categories
                    .slice((page - 1) * limit, (page - 1) * limit + limit)
                    .map(([key, category]) => {
                      return (
                        <TableRow
                          hover
                          key={key}
                          selected={
                            selectedCategoryIds.indexOf(category._id) !== -1 || isSelectedAll
                          }
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={
                                selectedCategoryIds.indexOf(category._id) !== -1 || isSelectedAll
                              }
                              onChange={(event) => handleSelectOne(event, category._id)}
                              value="true"
                            />
                          </TableCell>
                          <TableCell>{category._id}</TableCell>
                          <TableCell>{category.name}</TableCell>
                          <TableCell sx={{ textAlign: "center" }}>{category.quantity}</TableCell>
                          <TableCell>
                            {format(
                              category.createdAt ? category.createdAt : new Date(),
                              "dd/MM/yyyy"
                            )}
                          </TableCell>
                          <TableCell>
                            <Link href={`/categories/${category._id}/edit`}>
                              <IconButton color="info">
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Link>
                            <Link href={`/categories/${category._id}`}>
                              <IconButton color="info">
                                <EastIcon fontSize="small" />
                              </IconButton>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={total_records}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page - 1}
        rowsPerPage={limit}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Card>
  );
};
