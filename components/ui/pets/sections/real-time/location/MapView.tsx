import { FC } from "react";

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
            ?.masterData!.map((masterData: any) =>
              masterData.detailData
                .map((detailData: any, i: any, { length }: any) => {
                  if (i + 1 === length) {
                    return (
                      <Map
                        key={i}
                        initialViewState={{
                          longitude: detailData?.longitude as number,
                          latitude: detailData?.latitude as number,
                          zoom: 16.5,
                          bearing: 0,
                          pitch: 0,
                        }}
                        style={{ width: "100%", height: 450 }}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        mapboxAccessToken="pk.eyJ1IjoianVhbmNhaXNhcGFudGEiLCJhIjoiY2wzczQyajB5MW45eDNpb2Vsd3FnemxxcCJ9.Goc9SFssphx808eCRVIBSg"
                      >
                        <Marker
                          longitude={detailData?.longitude as number}
                          latitude={detailData?.latitude as number}
                          anchor="bottom"
                        >
                          <img
                            src={`data:image/jpeg;base64,${pet?.image}`}
                            style={{
                              width: 35,
                              height: 35,
                              borderRadius: "50%",
                            }}
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
