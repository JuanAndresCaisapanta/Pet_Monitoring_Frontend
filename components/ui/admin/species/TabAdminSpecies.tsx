import { NavigateBefore } from "@mui/icons-material";
import { Card, CardHeader, Divider, Grid, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import { GridValueGetterParams } from "@mui/x-data-grid";
import { useContext, useState, useEffect } from "react";
import { SpeciesContext } from "../../../../context/species/SpeciesContext";
import { ISpecies } from "../../../../interfaces";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { TabAdminType } from "../../elements";

type FormData = {
  name: string;
};

export const TabAdminSpecies = () => {
  const { species, getSpecies, addSpecies, updateSpecies, deleteSpecies } = useContext(SpeciesContext);
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

  const handleAddSpecies = async ({ name }: FormData) => {
    if (speciesId === 0) {
      setIsLoading(true);
      const { isComplete } = await addSpecies(name);
      if (isComplete) {
        setIsLoading(false);
        setSpeciesId(0);
        setValue("name", "");
      }
    } else {
      setIsLoading(true);
      const { isComplete } = await updateSpecies(speciesId, name);
      if (isComplete) {
        setIsLoading(false);
        setSpeciesId(0);
        setValue("name", "");
      }
    }
  };

  const handleEditSpecies = (species_id: number, species_name: string) => () => {
    if (species_id !== 0) {
      setSpeciesId(species_id);
      setValue("name", species_name);
    }
  };

  const handleDeleteSpecies = (species_id: number) => async () => {
    setIsLoading(true);
    const { isComplete } = await deleteSpecies(species_id);
    if (isComplete) {
      setIsLoading(false);
      setSpeciesId(0);
      setValue("name", "");
    }
  };

  const handleClearForm = () => {
    setSpeciesId(0);
    setValue("name", "");
  };

  const rows = listSpecies.map((species) => ({
    id: species.id,
    name: species.name,
  }));

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
      <TabAdminType
        handleSubmit={handleSubmit(handleAddSpecies)}
        handleClearForm={handleClearForm}
        register={register}
        errors={errors}
        renderCell={({ row }: GridValueGetterParams) => {
          return (
            <Grid container spacing={0}>
              <Grid item xs={6} textAlign={"center"}>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={handleEditSpecies(row.id as number, row.name as string)}
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
                  onClick={handleDeleteSpecies(row.id as number)}
                  sx={{ marginRight: 2 }}
                  startIcon={<DeleteIcon />}
                  loading={isLoading}
                  loadingPosition="start"
                >
                  Eliminar
                </LoadingButton>
              </Grid>
            </Grid>
          );
        }}
        id={speciesId}
        isLoading={isLoading}
        rows={rows}
      />
    </Card>
  );
};
