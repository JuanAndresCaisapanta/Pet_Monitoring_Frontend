import { Avatar, Box, CardContent, CardHeader, Card, Grid, Typography } from "@mui/material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

export const ContactCard = () => {
  return (
    <Card>
      <CardHeader title="Servicio Técnico" titleTypographyProps={{ color: "primary" }} />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(1)} !important` }}>
        <Grid sx={{ pt: (theme) => `${theme.spacing(1)} !important` }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              variant="rounded"
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                color: "common.white",
                backgroundColor: "green",
              }}
            >
              <ContactPhoneIcon />
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="caption">0999288791</Typography>
              <Typography variant="caption">juancaisapanta@hotmail.com</Typography>
            </Box>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};
