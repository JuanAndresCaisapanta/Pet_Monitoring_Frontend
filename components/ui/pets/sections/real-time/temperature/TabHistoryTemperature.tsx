import { useContext, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";

import { NavigateBefore, Search } from "@mui/icons-material";
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
import CircularProgressMui from "@mui/material/CircularProgress";
import { CircularInput, CircularProgress, CircularTrack } from "react-circular-input";

import { PetContext } from "../../../../../../context";

export const TabHistoryTemperature = () => {
  const { getPet, pet, petChange } = useContext(PetContext);
  const [petName, setPetName] = useState("");
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
    }, 5000);
    return () => {
      clearInterval(interval);
      petChange();
    };
  }, [pet_id]);

  const [searchWord, setSearchWord] = useState("");
  const arrayDetails: any = [];
  pet?.device?.length! > 0
    ? pet?.device?.map((device: any) =>
        device.deviceDetail.map((deviceDetail: any) => {
          return arrayDetails.push(deviceDetail);
        }),
      )
    : undefined;

  const filteredOptions = arrayDetails!.filter(
    (details: any) => details.creation_date?.toLowerCase().includes(searchWord.toLowerCase()) || !searchWord,
  );

  if (pet) {
    return (
      <Card>
        <CardHeader
          sx={{ paddingTop: "4px", paddingBottom: "4px" }}
          title={`Hitorial de Temperaturas de ${petName} `}
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
                <TextField
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 4 } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search fontSize="small" />
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
                .sort().reverse()
                .map((details: any, i: any) => (
                  <Grid item xs={12} sm={4} key={details.id} textAlign="center">
                    <Typography>Fecha: {details.creation_date}</Typography>
                    <CircularInput value={(details?.temperature! * 1) / 50} style={{ marginTop: 10 }}>
                      <CircularTrack strokeWidth={5} stroke="#9C9FA4" />
                      <CircularProgress stroke={`hsl(${((details?.temperature! * 1) / 50) * 100}, 100%, 50%)`} />
                      <text x={100} y={100} textAnchor="middle" dy="0.3em" fontWeight="bold">
                        {`${details?.temperature!}°`}
                      </text>
                    </CircularInput>
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
        <Grid item>
          <Typography color={"primary"} sx={{ mt: 1 }}>
            <CircularProgressMui color="secondary" />
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
