import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import { NavigateBefore } from "@mui/icons-material";
import { Card, CardHeader, CircularProgress, Divider, Grid, IconButton, Typography } from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import { CardContent, Box } from "@mui/material";

import { IDeviceDetails } from "../../../../../interfaces";
import { DeviceContext } from "../../../../../context";

export const TabAdminDeviceDetails = () => {
  const { deviceDetails,getDeviceDetailsByDevice } = useContext(DeviceContext);
  const [listDeviceDetails, setListDeviceDetails] = useState<IDeviceDetails>([]);

  const router = useRouter();

  const {id: device_id} = router.query;

  useEffect(() => {
    if (device_id!==undefined) {
      getDeviceDetailsByDevice(Number(device_id));
    }
  }, []);

  useEffect(() => {
    if (deviceDetails) {
      setListDeviceDetails(deviceDetails);
    }
  }, [deviceDetails]);

  const navigateTo = (url: string) => {
    router.push(url);
  };

  const rows = listDeviceDetails.map((deviceDetails) => ({
    id: deviceDetails.id,
    latitude: deviceDetails.latitude,
    longitude: deviceDetails.longitude,
    temperature: deviceDetails.temperature,
    battery: deviceDetails.battery,
    code: deviceDetails.device.code
  }));

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "latitude",
      headerName: "Latitud",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "longitude",
      headerName: "Longitud",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "temperature",
      headerName: "Temperatura",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "battery",
      headerName: "Bateria",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "code",
      headerName: "Código de dispositivo",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 210,
    },
  ];

  if (deviceDetails) {
    return (
      <Card>
        <CardHeader
          sx={{ paddingTop: "4px", paddingBottom: "4px" }}
          title={"Mantenimiento"}
          titleTypographyProps={{ variant: "body1" }}
          action={
            <IconButton aria-label="close" style={{ color: "#9E69FD" }}>
              <NavigateBefore />
            </IconButton>
          }
        />
        <Divider sx={{ margin: 0 }} />
        <CardContent>
          <Box
            sx={{
              width: "100%",
              "& .header": {
                backgroundColor: "#9E69FD",
                color: "#fff",
              },
            }}
          >
            <Grid container className="fadeIn">
              <Grid item xs={12} sx={{ width: "100%" }}>
                <DataGrid
                  autoHeight
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                />
              </Grid>
            </Grid>
          </Box>
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
            <CircularProgress color="secondary" />
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
