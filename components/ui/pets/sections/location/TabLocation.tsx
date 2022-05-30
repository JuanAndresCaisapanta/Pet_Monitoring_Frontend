import { CardContent, Grid, Typography } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { PetContext } from "../../../../../context";
import { IPet } from "../../../../../interfaces";

interface Props {
  id: any;
}

export const TabLocation: FC<Props> = ({ id }) => {
  const { isLoading, getPet, pet } = useContext(PetContext);
  useEffect(() => {
    setInterval(function () {
      getPet(id);
    }, 30000);
  }, [id]);

  if (!isLoading) {
    return <CardContent>Loading...</CardContent>;
  } else {
    return (
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography>Ubicacion</Typography>
            {pet?.masterData.map((masterData) =>
              masterData.detailData.map((detailData, i, { length }) => {
                if (i + 1 === length) {
                  return (
                    <Typography key={i}>
                      {detailData.latitude}+{detailData.longitude}
                    </Typography>
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
