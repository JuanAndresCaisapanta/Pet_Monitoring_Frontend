import { FC } from "react";

import { Card, Grid } from "@mui/material";
import Map, { Marker } from "react-map-gl";

interface Props {
  image: string;
  latitude: number;
  longitude: number;
}

export const MapView: FC<Props> = ({ image, latitude, longitude }) => {
  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Map
            initialViewState={{
              longitude: longitude,
              latitude: latitude,
              zoom: 16.5,
              bearing: 0,
              pitch: 0,
            }}
            
            style={{ width: "100%", height: 485 }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken="pk.eyJ1IjoianVhbmNhaXNhcGFudGEiLCJhIjoiY2wzczQyajB5MW45eDNpb2Vsd3FnemxxcCJ9.Goc9SFssphx808eCRVIBSg"
          >
            <Marker longitude={longitude} latitude={latitude} anchor="bottom">
              <img
                src={`data:image/jpeg;base64,${image}`}
                style={{ width: 35, height: 35, borderRadius: '50%' }}
              />
            </Marker>
          </Map>
        </Grid>
      </Grid>
    </Card>
  );
};
