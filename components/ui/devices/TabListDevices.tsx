import { CardContent, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context";
import { CardDevice } from "./CardDevice";
import SearchIcon from '@mui/icons-material/Search';

export const TabListDevices = () => {
  const [searchWord, setSearchWord] = useState("");
  const { user } = useContext(AuthContext);

  const filteredOptions = user?.device.filter(
    (device) =>
      device.code.toLowerCase().includes(searchWord.toLowerCase()) || !searchWord,
  );
  if (user?.device) {
  return (
    <CardContent>
      <Grid container spacing={2}>
          <Grid
            container
            sx={{ mt: 2 }}
            direction="column"
            alignItems={"center"}
          >
            <Grid item>
              <TextField
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 4 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearchWord(e.target.value)}
                placeholder={"Buscar"}
              />
            </Grid>
          </Grid>
          {filteredOptions!.length > 0 ? (
            filteredOptions!
              .sort((a: any, b: any) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name < b.name) {
                  return 1;
                }
                return 0;
              })
              .map((device) => (
                <Grid item xs={12} sm={6} key={device.id}>
                 <CardDevice code={device.code} name={device.deviceData.map((data)=>(data.pet?.name)).filter((v:any, i:any, a:any) => a.indexOf(v) === i)} state={"activo"}/></Grid>
              ))
          ) : (
            <Grid container direction="column" alignItems={"center"}>
              <Grid item>
                <Typography color={"primary"} sx={{ mt: 1 }}>
                  Sin Resultados.
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
    </CardContent>
  );
} else {
  return (
    <Grid container direction="column" alignItems={"center"}>
      <Grid item>
        <Typography color={"primary"} sx={{ mt: 1 }}>Cargando...</Typography>
      </Grid>
    </Grid>
  );
}
};
