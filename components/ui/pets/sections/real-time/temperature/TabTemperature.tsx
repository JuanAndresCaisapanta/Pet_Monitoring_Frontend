import { useContext, useEffect, useMemo } from "react";

import { useRouter } from "next/router";

import { Avatar, Card, CardContent, CardHeader, Divider, Grid, IconButton, Typography } from "@mui/material";
import { NavigateBefore } from "@mui/icons-material";
import { EmailIcon, EmailShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { CircularInput, CircularTrack, CircularProgress } from "react-circular-input";

import { PetContext } from "../../../../../../context";
import { Battery } from "../Battery";

export const TabTemperature = () => {
  const { isLoaded, getPet, pet, petChange } = useContext(PetContext);
  const router = useRouter();

  const { id } = router.query;

  useMemo(() => {
    getPet(id);
    return () => {
      petChange();
    };
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      getPet(id);
    }, 5000);
    return () => {
      clearInterval(interval);
      petChange();
    };
  }, [id]);

  const detail =
    pet?.device?.length! > 0
      ? pet?.device
          ?.map((device: any) =>
            device.deviceDetail
              .map((deviceDetail: any, i: any, { length }: any) => {
                if (i + 1 === length) {
                  return {
                    detail: {
                      temperature: deviceDetail.temperature,
                      battery: deviceDetail.battery,
                    },
                  };
                }
              })
              .splice(-1, 1),
          )[0]
          .shift()?.detail
      : undefined;
  const url_temp = `La temperatura de ${pet?.name} es ${detail?.temperature} `;

  const conversion = (detail?.temperature! * 1) / 50;

  if (isLoaded) {
    return (
      <>
        {detail?.temperature != undefined || detail != undefined ? (
          <Card>
            <CardHeader
              sx={{ paddingTop: "4px", paddingBottom: "4px" }}
              title={`Temperatura de ${pet?.name}`}
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
                <Grid item xs={12} sm={8}>
                  <Grid container item xs={12} sm={12} direction="column" alignItems="center">
                    {detail?.temperature ? (
                      <CircularInput value={conversion} style={{ marginTop: 10 }}>
                        <CircularTrack strokeWidth={5} stroke="#9C9FA4" />
                        <CircularProgress stroke={`hsl(${conversion * 100}, 100%, 50%)`} />
                        <text x={100} y={100} textAnchor="middle" dy="0.3em" fontWeight="bold">
                          {`${detail?.temperature!}°`}
                        </text>
                      </CircularInput>
                    ) : (
                      <CircularInput value={0} style={{ marginTop: 10 }}>
                        <CircularTrack strokeWidth={5} stroke="#9C9FA4" />
                        <CircularProgress stroke={`hsl(${0 * 100}, 100%, 50%)`} />
                        <text x={100} y={100} textAnchor="middle" dy="0.3em" fontWeight="bold">
                          {`0°`}
                        </text>
                      </CircularInput>
                    )}
                  </Grid>
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
                          <Battery value={detail?.battery!} />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12} sm={12} textAlign="justify">
                      <Typography variant="body2">
                        La temperatura de {pet?.name} se actualizara cada 10 minutos despues de encender el
                        dispositivo espere por favor.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12} sm={12} textAlign="center">
                      <Typography variant="body1" color={"secondary"}>
                        Compartir temperatura
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} textAlign="center">
                      <WhatsappShareButton url={url_temp}>
                        <WhatsappIcon size={32} round={true} />
                      </WhatsappShareButton>
                      <EmailShareButton url={url_temp} subject={`Ubicación de ${pet?.name}`}>
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
              title={`Temperatúra de ${pet?.name}`}
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
