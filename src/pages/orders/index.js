import Head from "next/head";
import { Box, Container } from "@mui/material";
import { OrderListResults } from "../../components/order/order-list-results";
import { CustomerListToolbar } from "../../components/order/customer-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { orders } from "../../__mocks__/order";

const Page = () => (
  <>
    <Head>
      <title>Orders | Dragon Fish</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <OrderListResults orders={orders} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
