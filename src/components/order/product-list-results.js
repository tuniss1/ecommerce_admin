import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";

export const ProductListResults = ({ products, ...rest }) => {
  return (
    <Card {...rest}>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 250 }}>Product Ref</TableCell>
                <TableCell sx={{ minWidth: 400 }}>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell sx={{ textAlign: "right" }}>Temporary price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => {
                return (
                  <TableRow hover key={product._id}>
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
                          alt="product-image"
                          width={60}
                          height={60}
                        />
                        <Typography variant="inherit" ml={2}>
                          {product.name}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>{product.quantity}</TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      {product.price * product.quantity}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
