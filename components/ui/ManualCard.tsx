import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import { Avatar, Box, CardHeader, Grid } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";

export const ManualCard = () => {
  return (
    <Card>
      <CardHeader title="Manual" />
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
                backgroundColor: "red",
              }}
            >
              <ArticleIcon />
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button size="small" variant="contained">
                Descargar
              </Button>
            </Box>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};
