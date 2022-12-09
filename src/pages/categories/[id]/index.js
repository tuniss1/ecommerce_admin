import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import ComponentDialog from "src/components/dialog";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteCategory, getCategoryDetail } from "src/utils/api";
import { useRouter } from "next/router";
import CategoryDetailView from "src/components/category/category-detail";

const Page = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const categorySlice = useSelector((state) => state.categories);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const id = router.query.id;
      if (categorySlice.categories.hasOwnProperty(id)) {
        setCategory(categorySlice.categories[id]);
      } else {
        await getCategoryDetail({ id }).then(({ data: { data } }) => {
          delete data.relatedCategory;
          setCategory(data);
        });
      }
      setLoading(false);
    };

    fetchData();
  }, [router]);

  console.log(category);

  const handleYes = async () => {
    await deleteCategory({ _id: [category._id] }).then((res) => {
      console.log(res.status);
    });

    setOpen(false);
    router.push("/categories");
  };

  const handleNo = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(true);
  };

  const DetailResultsProps = {
    category,
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
    title: "Do you want to delete this category?",
  };

  return (
    <>
      <Head>
        <title>Category | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth={false}>
          <Typography variant="h3" sx={{ mt: 3 }}>
            Category
          </Typography>
        </Container>
        {loading ? (
          <></>
        ) : (
          <Box sx={{ mt: 3 }}>
            <CategoryDetailView {...DetailResultsProps} />
          </Box>
        )}
        <ComponentDialog {...DialogProps} />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
