import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import { Avatar, Box, CardHeader, Grid, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
export const ContactCard = () => {
  return (
    <Card>
      <CardHeader title="Contacto" />
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
            <Typography variant='caption'>099999999</Typography>
            <Typography variant='caption'>ejemplo@tt.com</Typography>
            </Box>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};