import { CardContent, Grid, Typography } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { PetContext } from "../../../../../context";
import { IPet } from "../../../../../interfaces";
import { MapView } from "./MapView";

interface Props {
  id: any;
}

export const TabLocation: FC<Props> = ({ id }) => {
  const { isLoading, getPet, pet } = useContext(PetContext);
  useEffect(() => {
    setInterval(function () {
      getPet(id);
    }, 60000);
  }, [id]);

  if (!isLoading) {
    return <CardContent>Loading...</CardContent>;
  } else {
    return (
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            {pet?.masterData.map((masterData) =>
              masterData.detailData.map((detailData, i, { length }) => {
                if (i + 1 === length) {
                  return (
                    <MapView
                      key={i}
                      image={pet?.image}
                      latitude={detailData.latitude}
                      longitude={detailData.longitude}
                    />
                  );
                }
              }),
            )}
          </Grid>
        </Grid>
      </CardContent>
    );
  }
};
