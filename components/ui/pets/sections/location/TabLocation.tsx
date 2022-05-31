import { CardContent, Grid, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import { PetContext } from "../../../../../context";
import { IPet } from "../../../../../interfaces";
import { MapView } from "./MapView";

export const TabLocation = () => {
  const { isLoading, getPet, pet } = useContext(PetContext);
  const a = Cookies.get("pet_id")
  console.log(a)
  useEffect(() => {
    setInterval(function () {
      getPet(Cookies.get("pet_id"));
    }, 15000);
  }, []);

  if (!isLoading) {
    return <CardContent>Loading...</CardContent>;
  } else {
    return (
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
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
