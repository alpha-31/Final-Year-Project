import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { WidthFull } from "@mui/icons-material";

const passwordRegEx =
  "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$";

const initialValues = {
  password: "",
  passwordAgain: "",
};

const userSchema = yup.object().shape({
  password: yup.string().matches(passwordRegEx).required("required"),
  passwordpasswordAgain: yup
    .string()
    .matches(passwordRegEx)
    .required("required"),
});

const ResetPassword = () => {
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  return (
    <Box
      m="20px"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h2"
        color="secondary"
        width="100%"
        mb={5}
        fontWeight="800"
      >
        Enter Password
      </Typography>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0,1fr))"
              sx={{
                "& > div": { gridColumn: "span 4" },
                width: "100%",
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{
                  gridColumn: "span 4",
                }}
              />
            </Box>
            <Box full display="flex" mt="20px" justifyContent="end">
              <Button variant="contained" type="submit" color="secondary">
                Check Password
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Typography
        variant="h2"
        color="secondary"
        width="100%"
        mb={5}
        fontWeight="800"
      >
        Reset Password
      </Typography>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0,1fr))"
              sx={{
                "& > div": { gridColumn: "span 4" },
                width: "100%",
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{
                  gridColumn: "span 4",
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password Again"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.passwordAgain}
                name="passwordAgain"
                error={!!touched.passwordAgain && !!errors.passwordAgain}
                helperText={touched.passwordAgain && errors.passwordAgain}
                sx={{
                  gridColumn: "span 4",
                }}
              />
            </Box>
            <Box full display="flex" mt="20px" justifyContent="end">
              <Button variant="contained" type="submit" color="secondary">
                Change Password
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ResetPassword;
