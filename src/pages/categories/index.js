import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import ComponentDialog from "src/components/dialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, truncateCategory } from "src/utils/api";
import { CategoryListResults } from "src/components/category/category-list-results";
import { CategoryListToolbar } from "src/components/category/category-list-toolbar";
import { removeList } from "src/store/reducers/categorySlice";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [searchField, setSearchField] = useState("");

  const categorySlice = useSelector((state) => state.categories);
  const categories = Object.entries(categorySlice.categories);
  const dispatch = useDispatch();

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCategoryIds.indexOf(id);
    let newSelectedCategoryIds = [];

    if (selectedIndex === -1) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(selectedCategoryIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(selectedCategoryIds.slice(1));
    } else if (selectedIndex === selectedCategoryIds.length - 1) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(selectedCategoryIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(
        selectedCategoryIds.slice(0, selectedIndex),
        selectedCategoryIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCategoryIds(newSelectedCategoryIds);
  };

  const handleYes = async () => {
    if (isSelectedAll) {
      await truncateCategory().then((res) => console.log(res.status));
    } else {
      await deleteCategory({ _id: selectedCategoryIds }).then((res) => {
        console.log(res);
        dispatch(removeList(selectedCategoryIds));
      });
    }
    setOpen(false);
    setSelectedCategoryIds([]);
  };

  const handleNo = () => {
    setOpen(false);
  };

  const ListResultsProps = {
    selectedCategoryIds,
    handleSelectAll,
    handleSelectOne,
    isSelectedAll,
    searchField,
    categories,
    total_records: categorySlice.meta_data.total_records
      ? categorySlice.meta_data.total_records
      : -1,
  };

  const ListToolBarProps = {
    setSearchField,
    isSelected: selectedCategoryIds.length || isSelectedAll,
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
    title: "Do you want to delete this/these category(s)?",
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
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CategoryListToolbar {...ListToolBarProps} />
          <Box sx={{ mt: 3 }}>
            <CategoryListResults {...ListResultsProps} />
          </Box>
        </Container>
        <ComponentDialog {...DialogProps} />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
