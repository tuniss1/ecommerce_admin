import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";
import { ORDER_STATUS } from "src/utils/constant";
import DoneIcon from "@mui/icons-material/Done";
import EastIcon from "@mui/icons-material/East";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { updateOrder } from "src/utils/api";
import { useState } from "react";
import { useSnackbar } from "notistack";

export const LatestOrders = ({ latestOrders, ...rest }) => {
  const [ordersList, setOrdersList] = useState(latestOrders);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdateStatus = async (orderId, userId, status, idx) => {
    enqueueSnackbar("Updating order!", { variant: "info" });
    await updateOrder({ orderId, userId, status })
      .then(() => {
        const temp = [...ordersList];
        temp[idx].status = status;
        setOrdersList(temp);
        enqueueSnackbar("Update status successful!!!", { variant: "success" });
      })
      .catch((e) => {
        enqueueSnackbar("Update error: " + e, { variant: "error" });
      });
  };

  return (
    <Card {...rest}>
      <CardHeader title="Latest Orders" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800, overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Ref</TableCell>
                <TableCell>Customer</TableCell>
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
              {ordersList.map((order, idx) => (
                <TableRow hover key={order._id}>
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
                        <Tooltip enterDelay={300} title={loading ? "Processing" : "Decline"}>
                          <IconButton
                            color="info"
                            onClick={() => handleUpdateStatus(order._id, order.userId, 5, idx)}
                            disabled={loading}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip enterDelay={300} title={loading ? "Processing" : "Accept"}>
                          <IconButton
                            color="info"
                            disabled={loading}
                            onClick={() => handleUpdateStatus(order._id, order.userId, 2, idx)}
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
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};
