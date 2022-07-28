import { useContext, useEffect, useMemo, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { NavigateBefore, Search } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Map, { Marker } from "react-map-gl";

import { PetContext } from "../../../../../../context";

export const TabHistoryLocation = () => {
  const {getPet, pet, petChange } = useContext(PetContext);
  const [petName, setPetName] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { id: pet_id } = router.query;

  useMemo(() => {
    if (pet_id !== undefined) {
      getPet(Number(pet_id));
      setPetName(pet?.name!);
    }
    return () => {
      petChange();
    };
  }, [pet_id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pet_id !== undefined) {
        getPet(Number(pet_id));
      }
    }, 30000);
    return () => {
      clearInterval(interval);
      petChange();
    };
  }, [pet_id]);

  const arrayDetails: any = [];
  pet?.device?.length! > 0
    ? pet?.device?.map((device: any) =>
        device.deviceDetail.map((deviceDetail: any) => {
          return arrayDetails.push(deviceDetail);
        }),
      )
    : undefined;

  const paginate = (array: any, pageSize: any, pageNumber: any) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (pet) {
    return (
      <Card>
        <CardHeader
          sx={{ paddingTop: "4px", paddingBottom: "4px" }}
          title={`Hitorial de Ubicaciones de ${petName} `}
          titleTypographyProps={{ variant: "body1" }}
          action={
            <IconButton aria-label="close" onClick={() => router.back()} style={{ color: "#9E69FD" }}>
              <NavigateBefore />
            </IconButton>
          }
        />
        <Divider sx={{ margin: 0 }} />
        <CardContent>
          <Grid container spacing={2} justifyContent={"center"}>
            <Grid container sx={{ mt: 2 }} direction="column" alignItems={"center"}>
              <Grid item>
                <Stack spacing={2}>
                  <Pagination
                    count={Number((arrayDetails!.length / 10).toFixed())}
                    page={page}
                    onChange={handleChangePage}
                  />
                </Stack>
              </Grid>
            </Grid>
            {arrayDetails!.length > 0 ? (
              paginate(
                arrayDetails!
                  .sort()
                  .reverse()
                  .map((details: any, i: any) => (
                    <Grid item xs={12} sm={4} key={details.id}>
                      <Typography>Fecha: {details.creation_date}</Typography>
                      <Map
                        key={details.id}
                        initialViewState={{
                          longitude: details?.longitude as number,
                          latitude: details?.latitude as number,
                          zoom: 16.5,
                          bearing: 0,
                          pitch: 0,
                        }}
                        style={{ width: "100%", height: 250 }}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        mapboxAccessToken="pk.eyJ1IjoianVhbmNhaXNhcGFudGEiLCJhIjoiY2wzczQyajB5MW45eDNpb2Vsd3FnemxxcCJ9.Goc9SFssphx808eCRVIBSg"
                      >
                        <Marker
                          longitude={details?.longitude as number}
                          latitude={details?.latitude as number}
                          anchor="bottom"
                        >
                          <Image
                            src={`data:image/jpeg;base64,${pet?.image}`}
                            style={{
                              borderRadius: "50%",
                            }}
                            width="35px"
                            height="35px"
                            alt="Mascota"
                            quality={100}
                          />
                        </Marker>
                      </Map>
                    </Grid>
                  )),
                10,
                page,
              )
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
      </Card>
    );
  } else {
    return (
      <Grid container direction="column" alignItems={"center"}>
        <Grid item>
          <Typography color={"primary"} sx={{ mt: 1 }}>
            Cargando...
          </Typography>
          <Grid item>
            <Typography color={"primary"} sx={{ mt: 1 }}>
              <CircularProgress color="secondary" />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};
