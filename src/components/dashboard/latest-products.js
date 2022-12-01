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
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import EastIcon from "@mui/icons-material/East";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { useState, useEffect } from "react";

export const LatestProducts = ({ latestProducts, ...rest }) => {
  const [sort, setSort] = useState({
    quantity: null,
    price: null,
    createdAt: null,
    updatedAt: null,
  });

  return (
    <Card {...rest}>
      <CardHeader title="Latest Products" />
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box sx={{ minWidth: 800, overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 250 }}>Product Ref</TableCell>
                <TableCell sx={{ minWidth: 400 }}>Name</TableCell>
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
            <TableBody>
              {latestProducts.map((product) => (
                <TableRow hover key={product._id}>
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
                  <TableCell>{product.SKU}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{product.totalQuantity}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{format(product.createdAt, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{format(product.updatedAt, "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <IconButton color="info">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="info">
                      <EastIcon fontSize="small" />
                    </IconButton>
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
