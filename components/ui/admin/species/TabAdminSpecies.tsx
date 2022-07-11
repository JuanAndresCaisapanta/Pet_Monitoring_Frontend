import { NavigateBefore, NearMe } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Divider, Grid, IconButton, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import { DataGrid, esES, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useContext, useState, useEffect } from "react";
import { SpeciesContext } from "../../../../context/species/SpeciesContext";
import { ISpecies } from "../../../../interfaces";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

type FormData = {
  name: string;
};

export const TabAdminSpecies = () => {
  const { species, getSpecies } = useContext(SpeciesContext);
  const [listSpecies, setListSpecies] = useState<ISpecies[]>([]);
  const [speciesId, setSpeciesId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getSpecies();
  }, []);

  useEffect(() => {
    if (species) {
      setListSpecies(species as unknown as ISpecies[]);
    }
  }, [species]);

  const handleSaveSpecies = () => {
    console.log(speciesId);
    if (speciesId === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSpeciesId(0);
        setValue("name", "");
      }, 2000);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSpeciesId(0);
        setValue("name", "");
      }, 2000);
    }
  };

  const handleEditSpecies = (species_id: number, species_name: string) => () => {
    if (species_id !== 0) {
      setSpeciesId(species_id);
      setValue("name", species_name);
    }
  };

  const handleClearForm = () => {
    setSpeciesId(0);
    setValue("name", "");
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
      field: "name",
      headerName: "Nombre Completo",
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
                startIcon={<EditIcon />}
                onClick={handleEditSpecies(row.id as number, row.name as string)}
                disabled={isLoading}
              >
                Editar
              </Button>
            </Grid>
            <Grid item xs={6} textAlign={"center"}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => {}}
                disabled={isLoading}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        );
      },
    },
  ];

  const rows = listSpecies.map((species) => ({
    id: species.id,
    name: species.name,
  }));

  const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z]+$/;

  return (
    <Card>
      <CardHeader
        sx={{ paddingTop: "4px", paddingBottom: "4px" }}
        title={"admin"}
        titleTypographyProps={{ variant: "body1" }}
        action={
          <IconButton aria-label="close" style={{ color: "#9E69FD" }}>
            <NavigateBefore />
          </IconButton>
        }
      />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(handleSaveSpecies)}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              {speciesId !== 0 ? (
                <TextField fullWidth type="number" label="Id" placeholder="Id" disabled value={speciesId} />
              ) : (
                <></>
              )}
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
                    value: /^[a-zA-Z]+$/,
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
};
