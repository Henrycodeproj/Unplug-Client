import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export function EventViewer({ open, setOpen, event }) {
  const navigateTo = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ display: "flex", gap: "3%", alignItems: "center" }}
        >
          {event ? `${event.original_poster[0].username}'s Event` : null}
          <Avatar
            alt="Remy Sharp"
            src={
              event &&
              `https://ucarecdn.com/${event.original_poster[0].profilePicture}/`
            }
            sx={{ width: "45px", height: "45px" }}
            onClick={() =>
              event && navigateTo(`/profile/${event.original_poster[0]._id}`)
            }
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h3 style={{ color: "rgb(99, 99, 99)", fontSize: ".9rem" }}>
              {event
                ? `${format(event.start, "h:mm aa")} - ${format(
                    event.end,
                    "h:mm aa"
                  )}`
                : null}
            </h3>
            <p style={{ color: "black", fontSize: "1.25rem" }}>
              {event ? event.title : null}
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
