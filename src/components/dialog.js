import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function ComponentDialog({
  open,
  yes,
  no,
  title,
  handleYes,
  handleNo,
  yesColor,
  noColor,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleNo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogActions>
        <Button color={noColor} onClick={handleNo}>
          {no}
        </Button>
        <Button onClick={handleYes} autoFocus color={yesColor}>
          {yes}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
