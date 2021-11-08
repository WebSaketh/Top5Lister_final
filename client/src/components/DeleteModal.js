import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal(props) {
  return (
    <div>
      <Modal
        open={props.presence != null}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            align="center"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Delete Top 5 {props.message} List?
          </Typography>
          <Typography align="center">
            <Button
              align="center"
              variant="contained"
              color="success"
              onClick={props.confirmCallback}
            >
              ✓
            </Button>
            <Button
              align="center"
              variant="contained"
              color="error"
              onClick={props.handleClose}
            >
              X
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
