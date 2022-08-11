import { FC, useContext, useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import { Delete, Visibility } from "@mui/icons-material";
import { Button, Card, Grid, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { MedicineContext } from "../../../../../../context";

interface Props {
  pet_id: number;
  medicine_id: number;
  name: string;
  manufacturer: string;
  application_date: string;
  applicator: string;
  medicineType: string;
  image: any;
}

export const CardMedicine: FC<Props> = ({
  pet_id,
  medicine_id,
  name,
  manufacturer,
  application_date,
  applicator,
  medicineType,
  image,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteMedicine } = useContext(MedicineContext);

  const router = useRouter();
  const navigateTo = (url: string) => {
    router.push(url);
  };

  const handleDeleteMedicine = async (pet_id: number, medicine_id: number) => {
    setIsLoading(true);
    const { isComplete } = await deleteMedicine(pet_id, medicine_id);
    if (isComplete) {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <Grid container direction={{ xs: "column", md: "row" }}>
        <Grid
          item
          xs={6}
          md={5}
          textAlign="center"
          padding={2}
          borderRight={{ md: 1, xs: 0, color: "rgba(0, 0, 0, 0.12)" }}
          borderBottom={{ xs: 1, md: 0, color: "rgba(0, 0, 0, 0.12)" }}
        >
          <Image
            width="187px"
            height="177px"
            alt="Mascota"
            src={`data:image/jpeg;base64,${image}`}
            style={{ borderRadius: "15px" }}
            quality={100}
          />
        </Grid>
        <Grid item xs={6} md={7} padding={1}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Typography variant="h6" color={"primary"} noWrap>
                {name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body1">
                <b>Tipo: </b> {medicineType}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body1" noWrap>
                <b>Aplicador: </b> {applicator}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body2" noWrap>
                <b>Fabricante: </b> {manufacturer}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body2">
                <b>Fecha Aplicación: </b> {application_date}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} textAlign="center">
              <Button
                variant="contained"
                disableElevation
                startIcon={<Visibility />}
                sx={{
                  width: "40%",
                  marginRight: 2,
                }}
                onClick={() => navigateTo(`profile/${medicine_id}`)}
              >
                Ver
              </Button>
              <LoadingButton
                onClick={() => handleDeleteMedicine(pet_id, medicine_id)}
                variant="outlined"
                color="secondary"
                disableElevation
                startIcon={<Delete />}
                loading={isLoading}
                loadingPosition="start"
                sx={{
                  width: "50%",
                }}
              >
                Eliminar
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
