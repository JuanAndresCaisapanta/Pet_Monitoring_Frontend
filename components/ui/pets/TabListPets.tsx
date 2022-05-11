// ** MUI Imports
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import { CardPet } from "./CardPet";
// ** Styled Components

export const TabListPets = () => {
  return (
    <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CardPet />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardPet />
          </Grid>
        </Grid>
    </CardContent>
  );
};
