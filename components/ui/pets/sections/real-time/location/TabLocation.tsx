import { useContext, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Battery0BarRounded, Battery30Rounded, Battery80Rounded, BatteryFullRounded, NavigateBefore } from "@mui/icons-material";
import { EmailIcon, EmailShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";

import { PetContext } from "../../../../../../context";
import { MapView } from "./MapView";
import { Battery } from "../Battery";

export const TabLocation = () => {
  const { isLoaded, getPet, pet, petChange } = useContext(PetContext);
  const [battery, setBattery] = useState(0);
  const router = useRouter();
  const { id: pet_id } = router.query;

  useMemo(() => {
    if (pet_id !== undefined) {
      getPet(Number(pet_id));
    }
    return () => {
      petChange();
    };
  }, [pet_id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pet_id !== undefined) {
      getPet(Number(pet_id));
      setBattery(detail?.battery);
      console.log(detail?.battery);
      }
    },  1000);
    return () => {
      clearInterval(interval);
      petChange();
    };
  }, [pet_id]);

  const detail =
    pet?.device?.length! > 0
      ? pet?.device
          ?.map((device: any) =>
            device.deviceDetail
              .map((deviceDetail: any, i: any, { length }: any) => {
                if (i + 1 === length) {
                  return {
                    detail: {
                      latitude: deviceDetail.latitude,
                      longitude: deviceDetail.longitude,
                      battery: deviceDetail.battery,
                    },
                  };
                }
              })
              .splice(-1, 1),
          )[0]
          .shift()?.detail
      : undefined;

  const url_map = `https://www.google.com/maps/search/?api=1&query=${detail?.latitude},${detail?.longitude}`;

  const openMap = () => {
    window.open(url_map);
  };

  if (pet) {
    return (
      <>
        {detail?.latitude != undefined || detail != undefined ? (
          <Card>
            <CardHeader
              sx={{ paddingTop: "4px", paddingBottom: "4px" }}
              title={`Ubicación de ${pet?.name}`}
              titleTypographyProps={{ variant: "body1" }}
              action={
                <IconButton aria-label="close" onClick={() => router.back()} style={{ color: "#9E69FD" }}>
                  <NavigateBefore />
                </IconButton>
              }
            />
            <Divider sx={{ margin: 0 }} />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <MapView pet={pet!} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
                        <Grid item>
                          <Avatar alt="Remy Sharp" src={`data:image/jpeg;base64,${pet?.image}`} />
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">{pet?.name}</Typography>
                        </Grid>
                        <Grid item>
                          <Battery value={detail?.battery} />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12} sm={12} textAlign="justify">
                      <Typography variant="body2">
                        La ubicación de {pet?.name} se actualizara cada 10 minutos despues de encender el
                        dispositivo espere por favor.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Button disableElevation fullWidth variant="contained" onClick={openMap}>
                        Ubicar en Mapa
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12} sm={12} textAlign="center">
                      <Typography variant="body1" color={"secondary"}>
                        Compartir Ubicación
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} textAlign="center">
                      <WhatsappShareButton url={url_map}>
                        <WhatsappIcon size={32} round={true} />
                      </WhatsappShareButton>
                      <EmailShareButton url={url_map} subject={`Ubicación de ${pet?.name}`}>
                        <EmailIcon size={32} round={true} />
                      </EmailShareButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader
              sx={{ paddingTop: "4px", paddingBottom: "4px" }}
              title={`Ubicación de ${pet?.name}`}
              titleTypographyProps={{ variant: "body1" }}
              action={
                <IconButton aria-label="close" onClick={() => router.back()} style={{ color: "#9E69FD" }}>
                  <NavigateBefore />
                </IconButton>
              }
            />
            <Divider sx={{ margin: 0 }} />
            <Grid container direction="column" alignItems={"center"}>
              <Grid item>
                <Typography color={"primary"} sx={{ mt: 1 }}>
                  Sin lecturas encienda el dispositivo
                </Typography>
              </Grid>
            </Grid>
          </Card>
        )}
      </>
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
