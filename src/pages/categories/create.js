import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import CategoryDetailView from "src/components/category/category-detail";

const Page = () => {
  const DetailResultsProps = {
    mode: 0,
    handleDelete: () => {},
  };

  return (
    <>
      <Head>
        <title>Categories | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth={false}>
          <Typography variant="h3" sx={{ mt: 3 }}>
            Create category
          </Typography>
        </Container>

        <Box sx={{ mt: 3 }}>
          <CategoryDetailView {...DetailResultsProps} />
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
