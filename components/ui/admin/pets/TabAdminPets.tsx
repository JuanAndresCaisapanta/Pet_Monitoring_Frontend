import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import { NavigateBefore, Visibility } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography,
  Button,
  CardContent,
  Box,
} from "@mui/material";
import { GridValueGetterParams, DataGrid, esES, GridColDef } from "@mui/x-data-grid";

import { PetContext } from "../../../../context";
import { IPets } from "../../../../interfaces";

export const TabAdminPets = () => {
  const { pets, getPets, clearPets } = useContext(PetContext);
  const [listPets, setListPets] = useState<IPets>([]);

  const router = useRouter();

  useEffect(() => {
    getPets();
  }, []);

  useEffect(() => {
    if (pets) {
      setListPets(pets);
    }
  }, [pets]);

  const navigateTo = (url: string) => {
    router.push(url);
  };

  const rows = listPets.map((pets) => ({
    id: pets.id,
    name: pets.name,
    sex: pets.sex,
    breed: pets.breed.name,
    species: pets.breed.species.name,
    user: pets.users.email,
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
      field: "sex",
      headerName: "Sexo",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "breed",
      headerName: "Raza",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "species",
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
                  navigateTo(`pets/pet/${row.id}`);
                  clearPets();
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

  if (pets) {
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
