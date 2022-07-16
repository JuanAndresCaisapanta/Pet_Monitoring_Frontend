import { useContext, useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { NavigateBefore, Edit, Delete } from "@mui/icons-material";
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

import { IBreed, ISpecies } from "../../../../interfaces";
import { SelectFormId, TabAdminType } from "../../elements";
import { BreedContext, SpeciesContext } from "../../../../context";

import { CardContent, TextField, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
type FormData = {
  name: string;
  species: any;
};

export const TabAdminBreeds = () => {
  const { breeds, getBreeds, addBreed, updateBreed, deleteBreed } = useContext(BreedContext);
  const { species, getSpecies } = useContext(SpeciesContext);
  const [listBreeds, setListBreeds] = useState<IBreed[]>([]);
  const [listSpecies, setListSpecies] = useState<string | null>("");
  const [breedId, setBreedId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getBreeds();
    getSpecies();
  }, []);

  useEffect(() => {
    if (breeds) {
      setListBreeds(breeds as unknown as IBreed[]);
    }
  }, [breeds]);

  const handleAddBreed = async ({ name, species }: FormData) => {
    if (breedId === 0) {
      setIsLoading(true);
      const { isComplete } = await addBreed(name, species);
      if (isComplete) {
        setIsLoading(false);
        setBreedId(0);
        setValue("name", "");
        setValue("species", "");
        setListSpecies("");
      }
    } else {
      setIsLoading(true);
      const { isComplete } = await updateBreed(breedId, name, species);
      if (isComplete) {
        setIsLoading(false);
        setBreedId(0);
        setValue("name", "");
        setValue("species", "");
        setListSpecies("");
      }
    }
  };

  const handleUpdateBreed = (breed_id: number, breed_name: string, species_id: number) => () => {
    if (breed_id !== 0) {
      setBreedId(breed_id);
      setValue("name", breed_name);
      setValue("species", species_id);
      setListSpecies(species_id.toString());
    }
  };

  const handleDeleteBreed = (breed_id: number) => async () => {
    setIsLoading(true);
    const { isComplete } = await deleteBreed(breed_id);
    if (isComplete) {
      setIsLoading(false);
      setBreedId(0);
      setValue("name", "");
      setValue("species", "");
      setListSpecies("");
    }
  };

  const handleClearForm = () => {
    setBreedId(0);
    setValue("name", "");
    setValue("species", "");
    setListSpecies("");
  };

  const rows = listBreeds.map((breeds) => ({
    id: breeds.id,
    name: breeds.name,
    species_id: breeds.species.id,
    species_name: breeds.species.name,
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
      headerName: "Nombre Completo",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "species_name",
      headerName: "Nombre Especie",
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
            <Grid item xs={6} textAlign={"center"}>
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={handleUpdateBreed(row.id as number, row.name as string, row.species_id as number)}
                disabled={isLoading}
                disableElevation
              >
                Editar
              </Button>
            </Grid>
            <Grid item xs={6} textAlign={"center"}>
              <LoadingButton
                disableElevation
                variant="outlined"
                color="secondary"
                onClick={handleDeleteBreed(row.id as number)}
                sx={{ marginRight: 2 }}
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

  if (breeds && species) {
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
          <form noValidate autoComplete="off" onSubmit={handleSubmit(handleAddBreed)}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <SelectFormId
                  label="Especies"
                  name="species"
                  object={species}
                  value={listSpecies}
                  onChange={(event: SelectChangeEvent) => {
                    setListSpecies(event.target.value);
                  }}
                  register={register}
                  disabled={isLoading}
                  error={!!errors.species}
                  helperText={errors.species?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Nombre"
                  placeholder="Nombre"
                  {...register("name", {
                    required: "Este campo es requerido",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                    pattern: {
                      value: ALPHA_NUMERIC_DASH_REGEX,
                      message: "Solo se permiten letras",
                    },
                  })}
                  onKeyDown={(event) => {
                    if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  disabled={isLoading}
                />
              </Grid>
              <Grid item container direction="row" alignItems="center" justifyContent="center" xs={4}>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  disableElevation
                  type="submit"
                  sx={{ marginRight: 2 }}
                  startIcon={<SaveIcon />}
                  loading={isLoading}
                  loadingPosition="start"
                >
                  Guardar
                </LoadingButton>
                <Button
                  disableElevation
                  variant="outlined"
                  color="secondary"
                  onClick={handleClearForm}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
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
