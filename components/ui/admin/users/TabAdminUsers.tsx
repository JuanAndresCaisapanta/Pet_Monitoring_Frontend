import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import { NavigateBefore, Visibility } from "@mui/icons-material";
import { Card, CardHeader, CircularProgress, Divider, Grid, IconButton, Typography, Button } from "@mui/material";
import { GridValueGetterParams, DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import { CardContent, Box } from "@mui/material";

import { IUser } from "../../../../interfaces";
import { UserContext } from "../../../../context";

export const TabAdminUsers = () => {
  const { users, getUsers, clearUsers } = useContext(UserContext);
  const [listUsers, setListUsers] = useState<IUser[]>([]);

  const router = useRouter();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (users) {
      setListUsers(users as unknown as IUser[]);
    }
  }, [users]);

  const navigateTo = (url: string) => {
    router.push(url);
  };

  const rows = listUsers.map((users) => ({
    id: users.id,
    name: users.name,
    last_name: users.last_name,
    email: users.email,
    address: users.address,
    phone: users.phone,
    role: users.role[0].name,
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
      field: "name",
      headerName: "Nombre",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "last_name",
      headerName: "Apellido",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "email",
      headerName: "Correo Electronico",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "phone",
      headerName: "Celular",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "role",
      headerName: "Rol",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Grid container spacing={0}>
            <Grid item xs={12} textAlign={"center"}>
              <Button
                variant="contained"
                startIcon={<Visibility />}
                onClick={() => {
                  navigateTo(`users/user/${row.id}`);
                  clearUsers();
                }}
                disableElevation
              >
                Ver
              </Button>
            </Grid>
          </Grid>
        );
      },
    },
  ];

  if (users) {
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
