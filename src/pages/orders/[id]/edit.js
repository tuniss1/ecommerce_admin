import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getOrderDetail } from "src/utils/api";
import { useRouter } from "next/router";
import OrderDetailView from "src/components/order/order-detail";

const Page = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const orderSlice = useSelector((state) => state.orders);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const id = router.query.id;
      if (orderSlice.orders.hasOwnProperty(id)) {
        setOrder(orderSlice.orders[id]);
      } else {
        await getOrderDetail({ orderId: id }).then(({ data }) => {
          setOrder(data);
        });
      }
    };

    fetchData();
  }, [router]);

  console.log(order);

  const DetailResultsProps = {
    order,
    mode: 1,
  };

  return (
    <>
      <Head>
        <title>Order | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pb: 8,
        }}
      >
        <Container maxWidth={false}>
          <Typography variant="h3" sx={{ mt: 3 }}>
            Order
          </Typography>
        </Container>
        {!order ? (
          <></>
        ) : (
          <Box sx={{ mt: 3 }}>
            <OrderDetailView {...DetailResultsProps} />
          </Box>
        )}
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
