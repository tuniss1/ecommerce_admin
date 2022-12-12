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
  const [limit, setLimit] = useState(10);
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
      // if (sort.price) {
      //   setPage(1);
      //   dispatch(fetchProducts({ page: page, limit: limit, sort: sort.price }, setLoading));
      // } else {
      // }
      dispatch(fetchProducts({ page: page, limit: limit, sort: sort.price }, setLoading));
    };

    fetchData();

    return () => {};
  }, [page, sort]);

  // useEffect(() => {
  //   setPage(1);
  // }, [sort]);

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
                <TableCell sx={{ minWidth: 250 }}>Product Ref</TableCell>
                <TableCell sx={{ minWidth: 400 }}>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Remain quantity</TableCell>
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
                <TableCell>Created at</TableCell>
                <TableCell>Updated at</TableCell>
                <TableCell sortDirection="desc" sx={{ px: 4 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? Array(limit / 5).map((_values, idx) => <TableSkelton key={idx} />)
                : products
                    // .sort((a, b) => {
                    //   if (!sort.price) return 0;
                    //   if (a[1].price > b[1].price) return 1;
                    //   if (a[1].price < b[1].price) return -1;
                    //   return 0;
                    // })
                    .slice((page - 1) * limit, (page - 1) * limit + limit)
                    .map(([key, product]) => {
                      return (
                        <TableRow
                          hover
                          key={key}
                          selected={selectedProductIds.indexOf(product._id) !== -1 || isSelectedAll}
                        >
                          <TableCell>{product._id}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Image
                                src={
                                  product.images && product.images.length
                                    ? typeof product.images[0] === "string"
                                      ? product.images[0]
                                      : product.images[0].url
                                      ? product.images[0].url
                                      : "/static/no-image.png"
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
                            <Link href={`/products/${product._id}/edit`}>
                              <IconButton color="info">
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Link>
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
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Card>
  );
};
