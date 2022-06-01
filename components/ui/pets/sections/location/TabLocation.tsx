import { useContext, useEffect } from "react";

import { useRouter } from "next/router";

import {
  Avatar,
  Button,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import {
  Battery0BarOutlined,
  Battery2BarOutlined,
  Battery4BarOutlined,
  BatteryStdOutlined,
} from "@mui/icons-material";

import {
  EmailIcon,
  EmailShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import { PetContext } from "../../../../../context";
import { MapView } from "./MapView";

export const TabLocation = () => {
  const { isLoading, getPet, pet } = useContext(PetContext);

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getPet(id);
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
  const battery = (() => {
    if (detail?.battery! > 3300) {
      return <BatteryStdOutlined color="success" />;
    } else if (detail?.battery! > 2500 && detail?.battery! <= 3300) {
      return <Battery4BarOutlined color="warning" />;
    } else if (detail?.battery! > 1500 && detail?.battery! <= 2500) {
      return <Battery2BarOutlined color="warning" />;
    } else if (detail?.battery == 0 && detail?.battery <= 1500) {
      return <Battery0BarOutlined color="error" />;
    }
  })();

  if (!isLoading) {
    return <CardContent>Loading...</CardContent>;
  } else {
    return (
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <MapView pet={pet!} />
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
                  <Grid item>{battery}</Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={12} textAlign="justify">
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
