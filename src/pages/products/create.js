import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import ProductDetailView from "src/components/product/product-detail";

const Page = () => {
  const DetailResultsProps = {
    mode: 0,
    handleDelete: () => {},
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
            Create product
          </Typography>
        </Container>

        <Box sx={{ mt: 3 }}>
          <ProductDetailView {...DetailResultsProps} />
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
