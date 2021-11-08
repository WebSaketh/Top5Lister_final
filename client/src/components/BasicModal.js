import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import AlertTitle from "@mui/material/AlertTitle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
};

export default function BasicModal(props) {
  return (
    <div>
      <Modal
        open={props.presence}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Alert severity="error">
            {props.message + "   "}
            <Button
              disabled="true"
              style={{
                maxWidth: "30px",
                maxHeight: "30px",
                minWidth: "30px",
                minHeight: "30px",
                opacity: "0",
              }}
              size="small"
              variant="contained"
              color="error"
              onClick={props.handleClose}
            >
              X
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={props.handleClose}
            >
              X
            </Button>
          </Alert>
        </Box>
      </Modal>
    </div>
  );
}
