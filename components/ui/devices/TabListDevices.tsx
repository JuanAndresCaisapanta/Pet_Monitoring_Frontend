import { useContext, useState } from "react";

import { useRouter } from "next/router";

import { CircularProgress, Grid, Typography } from "@mui/material";

import { AuthContext } from "../../../context";
import { CardDevice } from "./CardDevice";
import { CardList } from "../elements";

export const TabListDevices = () => {
  const [searchWord, setSearchWord] = useState("");

  const { user } = useContext(AuthContext);

  const router = useRouter();

  const devices = user?.device;

  const filteredOptions = devices?.filter(
    (device) => device.code.toLowerCase().includes(searchWord.toLowerCase()) || !searchWord,
  );
  if (user?.device) {
    return (
      <CardList
        title={`Lista de dispositivos`}
        router={() => router.back()}
        onChange={(event) => setSearchWord(event.target.value)}
        filterCard={
          filteredOptions!.length > 0 ? (
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
                    device_id={device.id}
                    code={device.code}
                    name={device.pet.name}
                  />
                </Grid>
              ))
          ) : (
            <Grid container direction="column" alignItems={"center"}>
              <Grid item>
                <Typography color={"primary"} sx={{ mt: 1 }}>
                  Sin Resultados.
                </Typography>
              </Grid>
            </Grid>
          )
        }
      />
    );
  } else {
    return (
      <Grid container direction="column" alignItems={"center"}>
        <Grid item>
          <Typography color={"primary"} sx={{ mt: 1 }}>
            Cargando...
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={"primary"} sx={{ mt: 1 }}>
            <CircularProgress color="secondary" />
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
