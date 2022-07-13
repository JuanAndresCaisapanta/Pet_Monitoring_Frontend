import { Battery0Bar, Delete, NotificationsActive, NotificationsNone, Thermostat } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Badge, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext, NotificationContext } from "../../../context";

export const Notifications = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(AuthContext);
  const { user_notifications, getNotificationsByUser, deleteNotification } = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        getNotificationsByUser(user.id); 
      }
    }, 30000);
    return () => {
      clearInterval(interval);
      //petChange();
    };
  }, [getNotificationsByUser]);

  const newNotifications = `Tiene ${user_notifications?.length} notificaciones`;
  const noNotifications = "No tiene notificaciones";

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteNotification = async (user_id: number, notification_id: number) => {
    setIsLoading(true);
    const { isComplete } = await deleteNotification(user_id, notification_id);
    if (isComplete) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Tooltip title={user_notifications?.length ? newNotifications : noNotifications}>
        <IconButton color={"inherit"} onClick={user_notifications?.length ? handleOpen : undefined}>
          <Badge badgeContent={user_notifications?.length} color="error">
            <NotificationsNone />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            overflowX: "auto",
            backgroundColor: "#F4F5FA",
          },
        }}
      >
        {user_notifications?.map((item: any) => (
          <MenuItem key={item.id} disableTouchRipple>
            <Grid container direction={"row"}>
              <Grid item container xs={12}>
                {item.subject === "Temperatura" ? (
                  <>
                    <Thermostat color={"error"} /> Temperatura
                  </>
                ) : (
                  <>
                    <Battery0Bar color={"error"} /> Batería
                  </>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <LoadingButton
                    variant="text"
                    color="primary"
                    sx={{ pl: "0px", pr: "0px" }}
                    disableElevation
                    onClick={() => {handleDeleteNotification(user?.id!, item.id); handleClose()}}
                    startIcon={<Delete sx={{ p: "0px", width: "32px" }} />}
                    loading={isLoading}
                    loadingPosition="start"
                  />
                  {item.text}
                </Typography>
              </Grid>
            </Grid>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
