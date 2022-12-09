import { format } from "date-fns";
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
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import EastIcon from "@mui/icons-material/East";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import Link from "next/link";

export const LatestProducts = ({ latestProducts, ...rest }) => {
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
                <TableCell>Remain quantity</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Price</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Created at</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Updated at</TableCell>
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
        <Link href="/products">
          <Button
            color="primary"
            endIcon={<ArrowRightIcon fontSize="small" />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Link>
      </Box>
    </Card>
  );
};
