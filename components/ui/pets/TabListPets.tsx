// ** MUI Imports
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import "react-datepicker/dist/react-datepicker.css";
import { Cards } from "./Cards";
// ** Styled Components

export const TabListPets = () => {
  return (
    <CardContent>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Cards />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Cards />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};
