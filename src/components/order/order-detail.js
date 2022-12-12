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
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { update } from "src/store/reducers/orderSlice";
import { ORDER_STATUS } from "src/utils/constant";
import SaveCancelOps from "../save-cancel-ops";
import { ProductListResults } from "./product-list-results";

const OrderDetailView = ({ mode, order }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const disabled = true;

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

  const initialValues = order;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        try {
          if (mode === 2) {
            router.push(`/orders/${order._id}/edit`);
          } else {
            dispatch(
              update(values, (message, severity) => {
                enqueueSnackbar(message, { variant: severity });
                if (severity === "success") {
                  router.push("/orders");
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
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
        <form className="form-wrapper" encType="multipart/form-data" onSubmit={handleSubmit}>
          <Container sx={{ pb: 4 }}>
            <Card>
              <CardHeader title="Basic information" />
              <Divider />
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Order ref"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values._id}
                      disabled={disabled}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Customer"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.customer.firstName + " " + values.customer.lastName}
                      disabled={disabled}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid
                    item
                    lg={5}
                    md={5}
                    xs={12}
                    sx={{ zIndex: 900, display: "flex", alignItems: "center" }}
                  >
                    <Typography variant="h6">Status:</Typography>
                    <Box sx={{ width: "100%", position: "relative" }}>
                      <Button
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? "composition-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        variant="outlined"
                        disabled={mode === 2}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          minWidth: 140,
                          marginLeft: 2,
                          width: "100%",
                          height: "56px",
                          "&:hover": { border: "1px solid rgba(18, 24, 40, 0.5)" },
                        }}
                        color={"custom"}
                        endIcon={<ArrowDropDownIcon />}
                      >
                        {ORDER_STATUS[values.status] || "Status"}
                      </Button>
                      <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                        sx={{ width: "100%" }}
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
                                  {Object.entries(ORDER_STATUS).map(([key, value]) => {
                                    if (order.status < 2) {
                                      if (key < 2) return null;
                                      return (
                                        <MenuItem
                                          onClick={(event) => {
                                            setFieldValue("status", key);
                                            handleClose(event);
                                          }}
                                          key={key}
                                          value={value}
                                        >
                                          {value}
                                        </MenuItem>
                                      );
                                    }

                                    if (key <= order.status || key < 2 || key === 5)
                                      return (
                                        <MenuItem
                                          sx={{ display: "none" }}
                                          key={key}
                                          value={value}
                                        ></MenuItem>
                                      );

                                    return (
                                      <MenuItem
                                        onClick={(event) => {
                                          setFieldValue("status", key);
                                          handleClose(event);
                                        }}
                                        key={key}
                                        value={value}
                                      >
                                        {value}
                                      </MenuItem>
                                    );
                                  })}
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ mt: 4 }}>
              <CardHeader title="Delivery information" />
              <Divider />
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Deliver to"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.deliver.location}
                      disabled={disabled}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Delivery fee"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.deliver.fee}
                      disabled={disabled}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ mt: 4 }}>
              <CardHeader title="Customer's cart information" />
              <Divider />
              <CardContent>
                <ProductListResults products={values.products} />
              </CardContent>
              <Divider />
              <CardContent>
                <Box mt="4">
                  <Grid container spacing={4}>
                    <Grid item xs={0} md={6}></Grid>

                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                      >
                        <Typography variant="h6">Total products cost:</Typography>
                        <Typography variant="body" ml={2}>
                          {values.totalCost}$
                        </Typography>
                      </Box>
                      <Divider sx={{ mt: 2 }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <Typography variant="h6">Total cost {`(with delivery)`}:</Typography>
                        <Typography variant="body" ml={2}>
                          {values.totalCost + values.deliver.fee}$
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Container>

          <SaveCancelOps
            handleCancel={() => {
              router.push("/orders");
            }}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            mode={mode}
            position="fixed"
          />
        </form>
      )}
    </Formik>
  );
};

export default OrderDetailView;
