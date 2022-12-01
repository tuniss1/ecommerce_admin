import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Alert,
  Avatar,
  Box,
  Card,
  Checkbox,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";
import { ORDER_STATUS } from "src/utils/constant";
import DoneIcon from "@mui/icons-material/Done";
import EastIcon from "@mui/icons-material/East";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { updateOrder } from "src/utils/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, setOrderByCacheId } from "src/store/reducers/orderSlice";
import TableSkelton from "../skeleton";

export const OrderListResults = ({ orders, ...rest }) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({ message: "", severity: "error" });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const orderSlice = useSelector((state) => state.orders);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchOrders({ page: page, limit: limit, sort: "desc" }, setLoading));
    };

    fetchData();

    return () => {};
  }, [page]);

  const handleUpdateStatus = async (orderId, userId, status, idx) => {
    setOpen(true);
    setSnackBar({ message: "Updating order!", severity: "info" });
    await updateOrder({ orderId, userId, status })
      .then(() => {
        dispatch(setOrderByCacheId({ ...orderSlice.orders[orderId], status: status }));
        setSnackBar({ message: "Update status successful!!!", severity: "success" });
      })
      .catch((e) => {
        setSnackBar({ message: "Update error: " + e, severity: "error" });
      });
  };

  const handleLimitChange = (event) => {
    setPage(Math.ceil(Object.values(orderSlice.orders).length / event.target.value));
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };

  return (
    <Card {...rest}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity={snackBar.severity}
          sx={{ width: "100%" }}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Ref</TableCell>
                <TableCell>Order</TableCell>
                <TableCell sortDirection="desc" sx={{ textAlign: "center" }}>
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Total cost
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell sortDirection="desc" sx={{ textAlign: "center" }}>
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                <TableCell sx={{ textAlign: "right", px: 4 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? Array(limit / 5).map(() => <TableSkelton />)
                : Object.entries(orderSlice.orders)
                    .slice((page - 1) * limit, (page - 1) * limit + limit)
                    .map(([key, order], idx) => {
                      return (
                        <TableRow hover key={key}>
                          <TableCell>{order._id}</TableCell>
                          <TableCell>
                            {order.customer.firstName} {order.customer.lastName}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>{order.totalCost}</TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {format(order.createdAt ? order.createdAt : new Date(), "dd/MM/yyyy")}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <SeverityPill
                              color={
                                (order.status < 2 && "warning") ||
                                (order.status == 2 && "info") ||
                                (order.status == 3 && "secondary") ||
                                (order.status == 4 && "success") ||
                                "error"
                              }
                            >
                              {ORDER_STATUS[order.status]}
                            </SeverityPill>
                          </TableCell>

                          <TableCell sx={{ textAlign: "right" }}>
                            {order.status < 2 ? (
                              <>
                                <Tooltip
                                  enterDelay={300}
                                  title={loading ? "Processing" : "Decline"}
                                >
                                  <IconButton
                                    color="info"
                                    onClick={() => handleUpdateStatus(key, order.userId, 5, idx)}
                                    disabled={loading}
                                  >
                                    <CloseIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip enterDelay={300} title={loading ? "Processing" : "Accept"}>
                                  <IconButton
                                    color="info"
                                    disabled={loading}
                                    onClick={() => handleUpdateStatus(key, order.userId, 2, idx)}
                                  >
                                    <DoneIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </>
                            ) : (
                              <></>
                            )}
                            <Tooltip enterDelay={300} title={loading ? "Processing" : "Detail"}>
                              <IconButton color="info" disabled={loading}>
                                <EastIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
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
        count={orderSlice.meta_data.total_records ? orderSlice.meta_data.total_records : -1}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page - 1}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

OrderListResults.propTypes = {
  orders: PropTypes.array.isRequired,
};
