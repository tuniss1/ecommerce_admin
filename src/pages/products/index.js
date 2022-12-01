import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { ProductListToolbar } from "src/components/product/product-list-toolbar";
import { ProductListResults } from "src/components/product/product-list-results";
import ComponentDialog from "src/components/dialog";
import { useState } from "react";
import { useSelector } from "react-redux";
import { truncateProduct } from "src/utils/api";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [searchField, setSearchField] = useState("");

  const productSlice = useSelector((state) => state.products);
  const products = Object.entries(productSlice.products);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedProductIds.indexOf(id);
    let newSelectedProductIds = [];

    if (selectedIndex === -1) {
      newSelectedProductIds = newSelectedProductIds.concat(selectedProductIds, id);
    } else if (selectedIndex === 0) {
      newSelectedProductIds = newSelectedProductIds.concat(selectedProductIds.slice(1));
    } else if (selectedIndex === selectedProductIds.length - 1) {
      newSelectedProductIds = newSelectedProductIds.concat(selectedProductIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedProductIds = newSelectedProductIds.concat(
        selectedProductIds.slice(0, selectedIndex),
        selectedProductIds.slice(selectedIndex + 1)
      );
    }

    setSelectedProductIds(newSelectedProductIds);
  };

  const handleYes = async () => {
    if (isSelectedAll) {
      const res = await truncateProduct().then((res) => console.log(res.status));
    } else {
    }
    setOpen(false);
    setSelectedProductIds([]);
  };

  const handleNo = () => {
    setOpen(false);
  };

  const ListResultsProps = {
    selectedProductIds,
    handleSelectAll,
    handleSelectOne,
    isSelectedAll,
    searchField,
    products,
    total_records: productSlice.meta_data.total_records ? productSlice.meta_data.total_records : -1,
  };

  const ListToolBarProps = {
    setSearchField,
    isSelected: selectedProductIds.length || isSelectedAll,
    setOpen,
  };

  const DialogProps = {
    open,
    handleNo,
    handleYes,
    yesColor: "error",
    noColor: "primary",
    yes: "Remove",
    no: "Cancel",
    title: "Doyou want to delete this/these product(s)?",
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
          <ProductListToolbar {...ListToolBarProps} />
          <Box sx={{ mt: 3 }}>
            <ProductListResults {...ListResultsProps} />
          </Box>
        </Container>
        <ComponentDialog {...DialogProps} />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
