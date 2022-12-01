import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
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
  Typography,
  Tooltip,
  TableSortLabel,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "src/store/reducers/productSlice";
import EditIcon from "@mui/icons-material/Edit";
import EastIcon from "@mui/icons-material/East";
import Image from "next/image";
import TableSkelton from "../skeleton";
import Link from "next/link";

export const ProductListResults = ({
  selectedProductIds,
  handleSelectAll,
  handleSelectOne,
  products,
  isSelectedAll,
  searchField,
  total_records,
  ...rest
}) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const [sort, setSort] = useState({
    quantity: null,
    price: null,
    createdAt: null,
    updatedAt: null,
    category: null,
  });
  // console.log(products);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProducts({ page: page, limit: limit }, setLoading));
    };

    fetchData();

    return () => {};
  }, [page]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const productFilter = products.filter(([key, product]) => product.name.includes(searchField));
  //     // if ()
  //     // dispatch(fetchProducts({ searchField, page: page, limit: limit }, setLoading));
  //     console.log(productFilter);
  //   };

  //   fetchData();

  //   return () => {};
  // }, [searchField]);

  const handleLimitChange = (event) => {
    setPage(Math.ceil(products.length / event.target.value));
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box sx={{ minWidth: 1050, overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelectedAll}
                    color="primary"
                    indeterminate={
                      selectedProductIds.length > 0 && selectedProductIds.length < products.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ minWidth: 250 }}>Product Ref</TableCell>
                <TableCell sx={{ minWidth: 400 }}>Name</TableCell>
                <TableCell sortDirection={sort.category ? sort.category : "desc"}>
                  <Tooltip enterDelay={300} title="Sort" sx={{ minWidth: 150 }}>
                    <TableSortLabel
                      active
                      direction={sort.category ? sort.category : "desc"}
                      onClick={() => {
                        if (sort.category == "asc") setSort({ ...sort, category: "desc" });
                        else setSort({ ...sort, category: "asc" });
                      }}
                    >
                      Category
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>SKU</TableCell>
                <TableCell sortDirection={sort.quantity ? sort.quantity : "desc"}>
                  <Tooltip enterDelay={300} title="Sort" sx={{ minWidth: 150 }}>
                    <TableSortLabel
                      active
                      direction={sort.quantity ? sort.quantity : "desc"}
                      onClick={() => {
                        if (sort.quantity == "asc") setSort({ ...sort, quantity: "desc" });
                        else setSort({ ...sort, quantity: "asc" });
                      }}
                    >
                      Remain quantity
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell sortDirection={sort.price ? sort.price : "desc"} sx={{ minWidth: 150 }}>
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel
                      active
                      direction={sort.price ? sort.price : "desc"}
                      onClick={() => {
                        const temp = { ...sort };
                        if (sort.price == "asc") setSort({ ...temp, price: "desc" });
                        else setSort({ ...temp, price: "asc" });
                      }}
                    >
                      Price
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell
                  sortDirection={sort.createdAt ? sort.createdAt : "desc"}
                  sx={{ minWidth: 150 }}
                >
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
                <TableCell
                  sortDirection={sort.updatedAt ? sort.updatedAt : "desc"}
                  sx={{ minWidth: 150 }}
                >
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel
                      active
                      direction={sort.updatedAt ? sort.updatedAt : "desc"}
                      onClick={() => {
                        if (sort.updatedAt == "asc") setSort({ ...sort, updatedAt: "desc" });
                        else setSort({ ...sort, updatedAt: "asc" });
                      }}
                    >
                      Updated at
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell sortDirection="desc" sx={{ px: 4 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ height: 464.5 }}>
              {loading
                ? Array(limit / 5).map(() => <TableSkelton />)
                : products
                    .slice((page - 1) * limit, (page - 1) * limit + limit)
                    .map(([key, product]) => {
                      return (
                        <TableRow
                          hover
                          key={key}
                          selected={selectedProductIds.indexOf(product._id) !== -1 || isSelectedAll}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={
                                selectedProductIds.indexOf(product._id) !== -1 || isSelectedAll
                              }
                              onChange={(event) => handleSelectOne(event, product._id)}
                              value="true"
                            />
                          </TableCell>
                          <TableCell>{product._id}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Image
                                src={
                                  product.images && product.images.length
                                    ? product.images[0]
                                    : "/static/no-image.png"
                                }
                                width={60}
                                height={60}
                              />
                              <Typography variant="inherit" ml={2}>
                                {product.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{}}>{product.categoryName}</TableCell>
                          <TableCell>{product.SKU}</TableCell>

                          <TableCell sx={{ textAlign: "center" }}>
                            {product.totalQuantity}
                          </TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>
                            {format(
                              product.createdAt ? product.createdAt : new Date(),
                              "dd/MM/yyyy"
                            )}
                          </TableCell>
                          <TableCell>
                            {format(
                              product.createdAt ? product.createdAt : new Date(),
                              "dd/MM/yyyy"
                            )}
                          </TableCell>
                          <TableCell>
                            <IconButton color="info">
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <Link href={`/products/${product._id}`}>
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
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
