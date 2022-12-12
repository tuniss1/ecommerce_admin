import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import ComponentDialog from "src/components/dialog";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteProduct, getProductDetail } from "src/utils/api";
import { useRouter } from "next/router";
import ProductDetailView from "src/components/product/product-detail";

const Page = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const productSlice = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const id = router.query.id;
      if (productSlice.products.hasOwnProperty(id)) {
        setProduct(productSlice.products[id]);
      } else {
        await getProductDetail({ id }).then(({ data: { data } }) => {
          delete data.relatedProduct;
          setProduct(data);
        });
      }
      setLoading(false);
    };

    fetchData();
  }, [router]);

  const handleYes = async () => {
    await deleteProduct({ _id: [product._id] }).then((res) => {
      console.log(res.status);
    });

    setOpen(false);
    router.push("/products");
  };

  const handleNo = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(true);
  };

  const DetailResultsProps = {
    product,
    handleDelete,
    mode: 2,
  };

  const DialogProps = {
    open,
    handleNo,
    handleYes,
    yesColor: "error",
    noColor: "primary",
    yes: "Remove",
    no: "Cancel",
    title: "Do you want to delete this product?",
  };

  return (
    <>
      <Head>
        <title>Products | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth={false}>
          <Typography variant="h3" sx={{ mt: 3 }}>
            Product
          </Typography>
        </Container>
        {loading ? (
          <></>
        ) : (
          <Box sx={{ mt: 3 }}>
            <ProductDetailView {...DetailResultsProps} />
          </Box>
        )}
        <ComponentDialog {...DialogProps} />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
