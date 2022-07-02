import { FC } from "react";

import Image from "next/image";

import { Card, Grid } from "@mui/material";
import Map, { Marker } from "react-map-gl";

import { IPet } from "../../../../../../interfaces";

interface Props {
  pet: IPet;
}

export const MapView: FC<Props> = ({ pet }) => {
  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          {pet
            ?.device.map((device: any) =>
              device.deviceDetail
                .map((deviceDetail: any, i: any, { length }: any) => {
                  if (i + 1 === length) {
                    return (
                      <Map
                        key={i}
                        initialViewState={{
                          longitude: deviceDetail?.longitude as number,
                          latitude:deviceDetail?.latitude as number,
                          zoom: 16.5,
                          bearing: 0,
                          pitch: 0,
                        }}
                        style={{ width: "100%", height: 450 }}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        mapboxAccessToken="pk.eyJ1IjoianVhbmNhaXNhcGFudGEiLCJhIjoiY2wzczQyajB5MW45eDNpb2Vsd3FnemxxcCJ9.Goc9SFssphx808eCRVIBSg"
                      >
                        <Marker
                          longitude={deviceDetail?.longitude as number}
                          latitude={deviceDetail?.latitude as number}
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
                    );
                  }
                })
                .splice(-1, 1),
            )[0]
            .shift()}
        </Grid>
      </Grid>
    </Card>
  );
};
