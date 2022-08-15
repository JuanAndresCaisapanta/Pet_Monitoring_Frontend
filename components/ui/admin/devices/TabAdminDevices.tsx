import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import { Delete, NavigateBefore, Visibility } from "@mui/icons-material";
import { Card, CardHeader, CircularProgress, Divider, Grid, IconButton, Typography, Button } from "@mui/material";
import { GridValueGetterParams, DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import { CardContent, Box } from "@mui/material";

import { IDevices, IUser } from "../../../../interfaces";
import { DeviceContext, UserContext } from "../../../../context";
import { LoadingButton } from "@mui/lab";

export const TabAdminDevices = () => {
  const { devices, getDevices, clearDevices, deleteDevice } = useContext(DeviceContext);
  const [listDevices, setListDevices] = useState<IDevices>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getDevices();
  }, []);

  useEffect(() => {
    if (devices) {
      setListDevices(devices);
    }
  }, [devices]);

  const navigateTo = (url: string) => {
    router.push(url);
  };

  const rows = listDevices.map((devices) => ({
    id: devices.id,
    code: devices.code,
    callback_code: devices.callback_code,
    pet: devices.pet.name,
    user: devices.pet.users.email,
  }));

  const handleDeleteDevice = (device_id: number) => async () => {
    setIsLoading(true);
    const { isComplete } = await deleteDevice(device_id);
    if (isComplete) {
      setIsLoading(false);
    }
  };

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
      field: "code",
      headerName: "Código",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 240,
    },
    {
      field: "callback_code",
      headerName: "Codigo de Callback",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 240,
    },
    {
      field: "pet",
      headerName: "Mascota",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "user",
      headerName: "Usuario",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 220,
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 240,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Grid container spacing={0}>
            <Grid item xs={12} textAlign={"center"}>
              <Button
                variant="contained"
                startIcon={<Visibility />}
                disabled={isLoading}
                sx={{
                  mr: 1,
                }}
                onClick={() => {
                  navigateTo(`devices/device/${row.id}`);
                  clearDevices();
                }}
                disableElevation
              >
                Ver
              </Button>
              <LoadingButton
                disableElevation
                variant="outlined"
                color="secondary"
                onClick={handleDeleteDevice(row.id as number)}
                startIcon={<Delete />}
                loading={isLoading}
                loadingPosition="start"
              >
                Eliminar
              </LoadingButton>
            </Grid>
          </Grid>
        );
      },
    },
  ];

  if (devices) {
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
