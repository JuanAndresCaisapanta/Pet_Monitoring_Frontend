import { Avatar, Box, CardHeader, Grid, Card, Button, CardContent } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";

export const ManualCard = () => {
  return (
    <Card>
      <CardHeader title="Manual Usuario" titleTypographyProps={{ color: "primary" }} />
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
                backgroundColor: "red",
              }}
            >
              <ArticleIcon />
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button onClick={()=>{window.open("/manual/parque.pdf")}} variant="contained" disableElevation>
                Descargar
              </Button>
            </Box>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};
