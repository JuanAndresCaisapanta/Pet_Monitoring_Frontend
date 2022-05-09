// ** React Imports

import { forwardRef, useState } from "react";

// ** MUI Imports
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import RadioGroup from "@mui/material/RadioGroup";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";

// ** Third Party Imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Cards } from "../elements/Cards";
// ** Styled Components

export const TabPet = () => {
  // ** State
  const [date, setDate] = useState<Date | null | undefined>(null);

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
          {/* <Grid item xs={12}>
            <Button variant="contained" sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button
              type="reset"
              variant="outlined"
              color="secondary"
              onClick={() => setDate(null)}
            >
              Reset
            </Button>
          </Grid> */}
        </Grid>
      </form>
    </CardContent>
  );
};
