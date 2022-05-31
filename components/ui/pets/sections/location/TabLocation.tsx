import { useContext, useEffect } from "react";

import {
  Avatar,
  Button,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";

import { PetContext } from "../../../../../context";
import { MapView } from "./MapView";

export const TabLocation = () => {
  const { isLoading, getPet, pet } = useContext(PetContext);
  useEffect(() => {
    setInterval(function () {
      getPet(Cookies.get("pet_id"));
    }, 15000);
  }, []);

  const detail = pet?.masterData
    .map((masterData) =>
      masterData.detailData
        .map((detailData, i, { length }) => {
          if (i + 1 === length) {
            return {
              detail: {
                latitude: detailData.latitude,
                longitude: detailData.longitude,
              },
            };
          }
        })
        .splice(-1, 1),
    )[0]
    .shift()?.detail;

  const openMap = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${detail?.latitude},${detail?.longitude}`,
    );
  };

  if (!isLoading) {
    return <CardContent>Loading...</CardContent>;
  } else {
    return (
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {pet?.masterData
              .map((masterData) =>
                masterData.detailData
                  .map((detailData, i, { length }) => {
                    if (i + 1 === length) {
                      return (
                        <MapView
                          key={i}
                          image={pet?.image}
                          latitude={detailData?.latitude as number}
                          longitude={detailData?.longitude as number}
                        />
                      );
                    }
                  })
                  .splice(-1, 1),
              )[0]
              .shift()}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <Avatar
                      alt="Remy Sharp"
                      src={`data:image/jpeg;base64,${pet?.image}`}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">{pet?.name}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  disableElevation
                  fullWidth
                  variant="contained"
                  onClick={openMap}
                >
                  Ubicar en Mapa
                </Button>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Divider />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    );
  }
};
