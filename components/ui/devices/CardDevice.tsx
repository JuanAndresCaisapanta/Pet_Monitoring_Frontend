// ** MUI Imports
import { Card, Avatar, Button, Typography, CardContent } from "@mui/material";
// ** Icons Imports
import OnDeviceTrainingOutlinedIcon from "@mui/icons-material/OnDeviceTrainingOutlined";

export const CardDevice = () => {
  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: (theme) => `${theme.spacing(2, 1, 2)} !important`,
        }}
      >
        <Avatar
          sx={{
            width: 50,
            height: 50,
            marginBottom: 2.25,
            color: "common.white",
            backgroundColor: "primary.main",
          }}
        >
          <OnDeviceTrainingOutlinedIcon sx={{ fontSize: "2rem" }} />
        </Avatar>
        <Typography variant="h6" sx={{ marginBottom: 2.75 }}>
          Codigo: 9191919191
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 6 }}>
          Mascota: Toby Estado: Activo
        </Typography>
        <Button
          variant="contained"
          sx={{ padding: (theme) => theme.spacing(1, 2) }}
        >
          Editar
        </Button>
      </CardContent>
    </Card>
  );
};
