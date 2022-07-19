import { useContext, useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { NavigateBefore, Edit, Delete, Visibility } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { GridValueGetterParams } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";

import { IBreed, ISpecies, IUser } from "../../../../interfaces";
import { SelectFormId, TabAdminType } from "../../elements";
import { BreedContext, SpeciesContext, UserContext } from "../../../../context";

import { CardContent, TextField, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
type FormData = {
  name: string;
  species: any;
};

export const TabAdminUsers = () => {
  const { users, getUsers, clearUsers } = useContext(UserContext);
  //const { species, getSpecies } = useContext(SpeciesContext);
  const [listUsers, setListUsers] = useState<IUser[]>([]);
  //const [listSpecies, setListSpecies] = useState<string | null>("");
  //const [breedId, setBreedId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getUsers();
    //getBreeds();
    //getSpecies();
  }, []);

  useEffect(() => {
    if (users) {
      setListUsers(users as unknown as IUser[]);
    }
  }, [users]);

  // const handleAddBreed = async ({ name, species }: FormData) => {
  //   if (breedId === 0) {
  //     setIsLoading(true);
  //     const { isComplete } = await addBreed(name, species);
  //     if (isComplete) {
  //       setIsLoading(false);
  //       setBreedId(0);
  //       setValue("name", "");
  //       setValue("species", "");
  //       setListSpecies("");
  //     }
  //   } else {
  //     setIsLoading(true);
  //     const { isComplete } = await updateBreed(breedId, name, species);
  //     if (isComplete) {
  //       setIsLoading(false);
  //       setBreedId(0);
  //       setValue("name", "");
  //       setValue("species", "");
  //       setListSpecies("");
  //     }
  //   }
  // };

  // const handleUpdateBreed = (breed_id: number, breed_name: string, species_id: number) => () => {
  //   if (breed_id !== 0) {
  //     setBreedId(breed_id);
  //     setValue("name", breed_name);
  //     setValue("species", species_id);
  //     setListSpecies(species_id.toString());
  //   }
  // };

  // const handleDeleteBreed = (breed_id: number) => async () => {
  //   setIsLoading(true);
  //   const { isComplete } = await deleteBreed(breed_id);
  //   if (isComplete) {
  //     setIsLoading(false);
  //     setBreedId(0);
  //     setValue("name", "");
  //     setValue("species", "");
  //     setListSpecies("");
  //   }
  // };

  // const handleClearForm = () => {
  //   setBreedId(0);
  //   setValue("name", "");
  //   setValue("species", "");
  //   setListSpecies("");
  // };

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

  const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z]+$/;

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
