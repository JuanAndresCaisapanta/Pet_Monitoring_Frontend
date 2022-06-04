import { useContext, useEffect} from "react";

import { useRouter } from "next/router";

import { Avatar, CardContent, Divider, Grid, Typography } from "@mui/material";

import {
  EmailIcon,
  EmailShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import {
  CircularInput,
  CircularTrack,
  CircularProgress,
} from "react-circular-input";

import { PetContext } from "../../../../../../context";
import { Battery } from "../Battery";

export const TabTemperature = () => {
  const { isLoaded, getPet, pet, petChange } = useContext(PetContext);
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
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
    };
  }, [id]);

  const detail = pet?.masterData
    .map((masterData) =>
      masterData.detailData
        .map((detailData, i, { length }) => {
          if (i + 1 === length) {
            return {
              detail: {
                temperature: detailData.temperature,
                battery: detailData.battery,
              },
            };
          }
        })
        .splice(-1, 1),
    )[0]
    .shift()?.detail;
  const url_temp = `La temperatura de ${pet?.name} es ${detail?.temperature} `;

  const conversion = (detail?.temperature! * 1) / 50;

  if (isLoaded) {
    return (
      <CardContent key={id as any}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Grid
              container
              item
              xs={12}
              sm={12}
              direction="column"
              alignItems="center"
            >
              {detail?.temperature ? (
                <CircularInput value={conversion} style={{ marginTop: 10 }}>
                  <CircularTrack strokeWidth={5} stroke="#9C9FA4" />
                  <CircularProgress
                    stroke={`hsl(${conversion * 100}, 100%, 50%)`}
                  />
                  <text
                    x={100}
                    y={100}
                    textAnchor="middle"
                    dy="0.3em"
                    fontWeight="bold"
                  >
                    {`${detail?.temperature!}°`}
                  </text>
                </CircularInput>
              ) : (
                <CircularInput value={0} style={{ marginTop: 10 }}>
                  <CircularTrack strokeWidth={5} stroke="#9C9FA4" />
                  <CircularProgress stroke={`hsl(${0 * 100}, 100%, 50%)`} />
                  <text
                    x={100}
                    y={100}
                    textAnchor="middle"
                    dy="0.3em"
                    fontWeight="bold"
                  >
                    {`0°`}
                  </text>
                </CircularInput>
              )}
            </Grid>
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
                  La temperatura de {pet?.name} se actualizara cada 10 minutos
                  despues de encender el dispositivo espere por favor.
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
                <EmailShareButton
                  url={url_temp}
                  subject={`Ubicación de ${pet?.name}`}
                >
                  <EmailIcon size={32} round={true} />
                </EmailShareButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
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
