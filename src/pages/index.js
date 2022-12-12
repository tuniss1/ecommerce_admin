import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import { DashboardLayout } from "../components/dashboard-layout";
import { budget, getOrders, getProduct } from "src/utils/api";
import { useEffect, useRef, useState } from "react";

const Page = ({}) => {
  const [dashboardChart, setDashboardChart] = useState({});

  const [latestProducts, setLatestProducts] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);
  const firstInit = useRef(false);

  useEffect(() => {
    if (firstInit.current) return;
    firstInit.current = true;

    const fetchData = async () => {
      await budget()
        .then(({ data }) => {
          setDashboardChart({ ...data });
        })
        .catch((e) => console.log(e));

      await getProduct({
        page: 1,
        limit: 6,
        minPrice: null,
        maxPrice: null,
        sort: "",
      }).then(({ data }) => {
        console.log(data);
        setLatestProducts(data.listRoom.data);
      });

      await getOrders({
        page: 1,
        limit: 6,
        sort: "desc",
      }).then(({ data }) => {
        setLatestOrders(data.listRoom.data);
      });
    };

    fetchData();

    return () => {
      if (firstInit.current) return;
      firstInit.current = true;
      fetchData();
    };
  }, []);

  console.log(dashboardChart);

  const labels = [];
  const data = [];

  if (dashboardChart.barData) {
    dashboardChart.barData.map(({ label, budget, time }) => {
      labels.push(label);
      data.push(budget);
    });
  }

  return (
    <>
      <Head>
        <title>Dashboard | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCustomers count={dashboardChart.orderMonth} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget budget={dashboardChart.budgetMonth} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TasksProgress count={dashboardChart.total} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalProfit sx={{ height: "100%" }} budget={dashboardChart.totalBudget} />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <Sales labels={labels} data={data} />
            </Grid>
            <Grid item lg={12} md={12} xl={9} xs={12}>
              <LatestProducts latestProducts={latestProducts} />
            </Grid>
            <Grid item lg={12} md={12} xl={9} xs={12}>
              <LatestOrders latestOrders={latestOrders} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    return {
      props: {
        latestOrders,
        latestProducts,
        dashboardChart,
      },
    };
  } catch (e) {
    console.log(e);
  }
  return {
    props: { latestOrders: [], latestProducts: [], dashboardChart: {} },
  };
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
