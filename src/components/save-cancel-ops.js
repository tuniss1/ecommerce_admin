import { Button, Card, createTheme } from "@mui/material";
import React from "react";

const theme = createTheme({});

const SaveCancelOps = ({
  handleSubmit,
  handleCancel,
  handleDelete,
  isSubmitting,
  mode,
  position,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 0,
        position: position ? position : "sticky",
        bottom: 0,
        width: "100%",
        py: 1,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        columnGap: "16px",
        borderTop: "1px solid #E6E8F0",
        zIndex: 1000,
        [theme.breakpoints.up("lg")]: {
          width: "calc(100% - 280px)",
          right: 0,
        },
      }}
    >
      <Button size="medium" onClick={handleCancel} disabled={isSubmitting} color="primary">
        {mode === 2 ? "Back" : "Cancel"}
      </Button>

      <Button size="medium" disabled={isSubmitting} onClick={handleSubmit} color="primary">
        {mode === 2 ? "Edit" : "Save"}
      </Button>

      {mode !== 0 && handleDelete && (
        <Button size="medium" onClick={handleDelete} disabled={isSubmitting} color="error">
          Delete
        </Button>
      )}
    </Card>
  );
};

export default SaveCancelOps;
