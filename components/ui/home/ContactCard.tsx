import { Avatar, Box, CardContent, CardHeader, Card, Grid, Typography } from "@mui/material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { EmailIcon, EmailShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { useContext } from "react";
import { AuthContext } from "../../../context";

export const ContactCard = () => {
  const { user } = useContext(AuthContext);
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
              <Grid item xs={6} sm={6} textAlign="center">
                <WhatsappShareButton url={`Saludos soy ${user?.name} ${user?.last_name} necesito ayuda.`}>
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
              </Grid>
              <Grid item xs={6} sm={6} textAlign="center">
                <EmailShareButton
                  url={`Saludos soy ${user?.name} ${user?.last_name} necesito ayuda.`}
                  subject={`Servicio Técnico`}
                >
                  <EmailIcon size={32} round={true} />
                </EmailShareButton>
              </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};
