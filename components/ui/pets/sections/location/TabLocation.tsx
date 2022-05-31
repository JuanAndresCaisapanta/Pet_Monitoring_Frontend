import { useContext, useEffect } from "react";

import {
  Avatar,
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  Slider,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";

import { PetContext } from "../../../../../context";
import { MapView } from "./MapView";
import {
  EmailIcon,
  EmailShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  MailruShareButton,
  TwitterIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { Battery20Outlined, Battery90Outlined } from "@mui/icons-material";
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';

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
                battery: detailData.battery,
              },
            };
          }
        })
        .splice(-1, 1),
    )[0]
    .shift()?.detail;

  const url_map = `https://www.google.com/maps/search/?api=1&query=${detail?.latitude},${detail?.longitude}`;

  const openMap = () => {
    window.open(url_map);
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
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <BatteryChargingFullIcon/>
                  </Grid>
                  <Grid item>
                    <Box sx={{ width: 100 }}>
                      <Slider
                        value={detail?.battery}
                        min={0}
                        step={1}
                        max={3345}
                        onChange={(e, value) => {}}
                        sx={{ color: detail?.battery as any > 3345/4 ? '#52af77' : "#e91e63",
                        height: 5,
                        '& .MuiSlider-track': {
                          border: 'none',
                        },
                        '& .MuiSlider-thumb': {
                          height: 15,
                          width: 15,
                          backgroundColor:  detail?.battery as any > 3345/4 ? '#52af77' : "#e91e63",
                          border: '2px solid currentColor',
                          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                            boxShadow: 'inherit',
                          },
                          '&:before': {
                            display: 'none',
                          },
                        },}}
                        size="small"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={12} textAlign="center">
                <Typography variant="body2">
                  La ubicación de {pet?.name} se actualizara cada 10 minutos
                  despues de encender el dispositivo espere por favor.
                </Typography>
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

              <Grid item xs={12} sm={12} textAlign="center">
                <Typography variant="body1" color={"secondary"}>
                  Compartir Ubicación
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} textAlign="center">
                <WhatsappShareButton url={url_map}>
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
                <EmailShareButton
                  url={url_map}
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
  }
};
