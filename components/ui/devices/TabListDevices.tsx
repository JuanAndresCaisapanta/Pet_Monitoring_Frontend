import { useContext, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { AuthContext } from "../../../context";
import { CardDevice } from "./CardDevice";
import { useRouter } from "next/router";
import { NavigateBefore } from "@mui/icons-material";

export const TabListDevices = () => {
  const [searchWord, setSearchWord] = useState("");
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const filteredOptions = user?.device.filter(
    (device) =>
      device.code.toLowerCase().includes(searchWord.toLowerCase()) ||
      !searchWord,
  );
  if (user?.device) {
    return (
      <Card>
      <CardHeader
        title={`Lista de sus Dispositivos`}
        titleTypographyProps={{ variant: "body1" }}
        action={
          <IconButton
            aria-label="close"
            onClick={() => router.back()}
            style={{ color: "#9E69FD" }}
          >
            <NavigateBefore />
          </IconButton>
        }
      />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid item xs={12} md={12} textAlign="center">
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
                <Grid item xs={12} sm={3} key={device.id}>
                  <CardDevice
                    id={device.id}
                    code={device.code}
                    name={device.masterData
                      .map((data) => data.pet?.name)
                      .filter((v: any, i: any, a: any) => a.indexOf(v) === i)}
                  />
                </Grid>
              ))
          ) : (
            <Grid item>
              <Typography color={"primary"}>Sin Resultados.</Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
      </Card>
    );
  } else {
    return (
      <Grid container direction="column" alignItems={"center"}>
        <Grid item>
          <Typography color={"primary"} sx={{ mt: 1 }}>
            Cargando...
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
