import { Card, CardContent, CardHeader, Divider, Grid, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { create as createCategory, update } from "src/store/reducers/categorySlice";
import * as Yup from "yup";
import SaveCancelOps from "../save-cancel-ops";

const CategoryDetailView = ({ category, mode, handleDelete }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const disabled = mode === 2;

  const CATEGORY_SCHEMA = Yup.object().shape({
    name: Yup.string().required("Name is required.").max(50),
  });

  const initialValues =
    mode === 0
      ? {
          name: "",
        }
      : category;

  const handleSnackbar = (message, severity) => {
    enqueueSnackbar(message, { variant: severity });
    if (severity === "success") {
      router.push("/categories");
    }
  };

  return (
    <Formik
      validationSchema={CATEGORY_SCHEMA}
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log("click");
        setSubmitting(true);
        try {
          if (mode === 0) {
            // create
            dispatch(createCategory(values, handleSnackbar));
          } else if (mode === 2) {
            router.push(router.asPath + "/edit");
          } else {
            dispatch(update(values, handleSnackbar));
          }
        } catch (e) {
          console.log(e);
        }
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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
                </Grid>
              </CardContent>
            </Card>
          </Container>
          <SaveCancelOps
            handleCancel={() => {
              router.push("/categories");
            }}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            isSubmitting={isSubmitting}
            mode={mode}
            position="fixed"
          />
        </form>
      )}
    </Formik>
  );
};

export default CategoryDetailView;
