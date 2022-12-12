import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Divider,
  Grid,
  Grow,
  InputAdornment,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProduct, update } from "src/store/reducers/productSlice";
import * as Yup from "yup";
import SaveCancelOps from "../save-cancel-ops";
import ImageZone from "./image-zone";

const ProductDetailView = ({ product, mode, handleDelete }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const disabled = mode === 2;

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const PRODUCT_SCHEMA = Yup.object().shape({
    name: Yup.string().required("Name is required.").max(50),
    price: Yup.number().required("Price is required.").min(0),
    SKU: Yup.string().required("SKU code is required."),
    description: Yup.string().required("Description is required."),
    totalQuantity: Yup.number().required("Quantity is required.").min(0),
    images: Yup.array(),
  });

  const initialValues =
    mode === 0
      ? {
          name: "",
          price: 0,
          availability: 0,
          vendor: "Vendor",
          SKU: "",
          description: "",
          totalQuantity: 0,
          images: [],
          categoryName: "",
        }
      : product;

  const categoryList = [
    {
      createdAt: 1669948735434,
      _id: "637b95d4e5b4db4c02b741f5",
      name: "Guppies",
      quantity: 3,
      __v: 0,
    },
    {
      createdAt: 1669948735434,
      _id: "637b95dee5b4db4c02b741f7",
      name: "Betta fish",
      quantity: 3,
      __v: 0,
    },
    {
      createdAt: 1669948735434,
      _id: "637b95eae5b4db4c02b741f9",
      name: "Dragon fish",
      quantity: 0,
      __v: 0,
    },
    {
      createdAt: 1669948735434,
      _id: "637b9600e5b4db4c02b741fb",
      name: "Aquatic plant",
      quantity: 6,
      __v: 0,
    },
    {
      createdAt: 1669948735434,
      _id: "637b9700e5b4db4c02b74214",
      name: "Arowana fish",
      quantity: 3,
      __v: 0,
    },
  ];

  return (
    <Formik
      validationSchema={PRODUCT_SCHEMA}
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        try {
          if (mode === 0) {
            // create
            dispatch(
              createProduct(values, (message, severity) => {
                enqueueSnackbar(message, { variant: severity });
                if (severity === "success") {
                  router.push("/products");
                }
              })
            );
          } else if (mode === 2) {
            router.push(router.asPath + "/edit");
          } else {
            dispatch(
              update(values, (message, severity) => {
                enqueueSnackbar(message, { variant: severity });
                if (severity === "success") {
                  router.push("/products");
                }
              })
            );
          }
        } catch (e) {
          console.log(e);
        }
        setSubmitting(false);
        resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
        setFieldError,
      }) => (
        <form className="form-wrapper" encType="multipart/form-data" onSubmit={handleSubmit}>
          <Container sx={{ pb: 4 }}>
            <Card>
              <CardHeader title="Basic information" />
              <Divider />
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      label="Name"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      disabled={disabled}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center" }}>
                    <Switch
                      value={Boolean(values.availability)}
                      name="availability"
                      onChange={handleChange}
                      disabled={disabled}
                    />
                    <Typography variant="h6">
                      {values.availability ? "Available" : "Not available"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      error={Boolean(touched.totalQuantity && errors.totalQuantity)}
                      fullWidth
                      helperText={touched.totalQuantity && errors.totalQuantity}
                      label="Quantity"
                      name="totalQuantity"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.totalQuantity}
                      variant="outlined"
                      disabled={disabled}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      error={Boolean(touched.price && errors.price)}
                      fullWidth
                      helperText={touched.price && errors.price}
                      label="Price"
                      name="price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.price}
                      variant="outlined"
                      disabled={disabled}
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.SKU && errors.SKU)}
                      fullWidth
                      helperText={touched.SKU && errors.SKU}
                      label="SKU code"
                      name="SKU"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.SKU}
                      variant="outlined"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} xs={12} sx={{ zIndex: 100 }}>
                    <Button
                      ref={anchorRef}
                      id="composition-button"
                      aria-controls={open ? "composition-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                      variant="outlined"
                      disabled={disabled}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        minWidth: 140,
                        width: "100%",
                        height: "56px",
                        "&:hover": { border: "1px solid rgba(18, 24, 40, 0.5)" },
                      }}
                      color={"custom"}
                      endIcon={<ArrowDropDownIcon />}
                    >
                      {values.categoryName || "Category"}
                    </Button>
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      placement="bottom-start"
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === "bottom-start" ? "left top" : "left bottom",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                              >
                                {categoryList.map((category) => (
                                  <MenuItem
                                    onClick={(event) => {
                                      setFieldValue("categoryName", category.name);
                                      handleClose(event);
                                    }}
                                    key={category._id}
                                    value={category.name}
                                  >
                                    {category.name}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card style={{ marginTop: "24px" }}>
              <CardHeader title="Description" />
              <Divider />
              <CardContent>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Description"
                  name="description"
                  multiline
                  sx={{ width: "100%" }}
                  minRows={9}
                  disabled={disabled}
                  value={values.description}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                  onChange={handleChange}
                />
              </CardContent>
            </Card>
            <ImageZone images={values.images} setFieldValue={setFieldValue} mode={mode} />
          </Container>

          <SaveCancelOps
            handleCancel={() => {
              router.push("/products");
            }}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            isSubmitting={isSubmitting}
            mode={mode}
          />
        </form>
      )}
    </Formik>
  );
};

export default ProductDetailView;
