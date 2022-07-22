import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import { NavigateBefore, Visibility } from "@mui/icons-material";
import { Card, CardHeader, CircularProgress, Divider, Grid, IconButton, Typography, Button } from "@mui/material";
import { GridValueGetterParams } from "@mui/x-data-grid";
import { CardContent, Box } from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import { EstablishmentContext, ProfessionalContext } from "../../../../context";
import { IEstablishments, IProfessionals } from "../../../../interfaces";

export const TabAdminEstablishments = () => {
  const { establishments, getEstablishments, clearEstablishments } = useContext(EstablishmentContext);
  const [listEstablishments, setListEstablishments] = useState<IEstablishments>([]);

  const router = useRouter();

  useEffect(() => {
    getEstablishments();
  }, []);

  useEffect(() => {
    if (establishments) {
      setListEstablishments(establishments);
    }
  }, [establishments]);

  const navigateTo = (url: string) => {
    router.push(url);
  };

  const rows = listEstablishments.map((establishments) => ({
    id: establishments.id,
    name: establishments.name,
    email: establishments.email,
    pet: establishments.pet.name,
    pet_breed: establishments.pet.breed.name,
    pet_species: establishments.pet.breed.species.name,
    user: establishments.pet.users.email,
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
      field: "email",
      headerName: "Email",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
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
      field: "pet_breed",
      headerName: "Raza",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "pet_species",
      headerName: "Especie",
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
                  navigateTo(`establishments/establishment/${row.id}`);
                  clearEstablishments();
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

  if (establishments) {
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
