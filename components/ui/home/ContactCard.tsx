import { Avatar, Box, CardContent, CardHeader, Card, Grid, Typography, IconButton } from "@mui/material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { EmailIcon, EmailShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { useContext } from "react";
import { AuthContext } from "../../../context";
import { WhatsApp } from "@mui/icons-material";

export const ContactCard = () => {
  const { user } = useContext(AuthContext);
  const message = `Saludos soy ${user?.name} ${user?.last_name} necesito ayuda.`;
  const handleSendWhatsapp = () => {
    window.open(`https://wa.me/+5930999288791/?text=${message}`);
  };
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} textAlign="center">
                  <IconButton color="success" aria-label="whatsapp" component="label" size="small" onClick={handleSendWhatsapp}>
                    <WhatsApp fontSize="large" />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};
