import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  Card,
  Grid,
  Typography,
} from "@mui/material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

export const ContactCard = () => {
  return (
    <Card>
      <CardHeader
        title="Servicio Tecnico"
        titleTypographyProps={{ color: "primary" }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(1)} !important` }}>
        <Grid sx={{ pt: (theme) => `${theme.spacing(1)} !important` }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              variant="rounded"
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: "common.white",
                backgroundColor: "green",
              }}
            >
              <ContactPhoneIcon />
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="caption">099999999</Typography>
              <Typography variant="caption">ejemplo@tt.com</Typography>
            </Box>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};
