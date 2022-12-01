import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import { ProductListToolbar } from "src/components/product/product-list-toolbar";
import { ProductListResults } from "src/components/product/product-list-results";
import ComponentDialog from "src/components/dialog";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getProductDetail } from "src/utils/api";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const productSlice = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const id = router.query.id;
      if (productSlice.products.hasOwnProperty(id)) {
        setProduct(productSlice.products[id]);
      } else {
        await getProductDetail({ id }).then(({ data: { data } }) => {
          delete data.relatedProduct;
          setProduct(data);
        });
      }
    };

    fetchData();
  }, [router]);

  const handleYes = async () => {
    setOpen(false);
  };

  const handleNo = () => {
    setOpen(false);
  };

  const DetailResultsProps = {
    product,
    isEdit: false,
  };

  const DialogProps = {
    open,
    handleNo,
    handleYes,
    yesColor: "error",
    noColor: "primary",
    yes: "Remove",
    no: "Cancel",
    title: "Doyou want to delete this product?",
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
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ mt: 3 }}></Box>
        </Container>
        <ComponentDialog {...DialogProps} />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
