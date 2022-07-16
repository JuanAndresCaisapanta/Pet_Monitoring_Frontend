import { useContext, useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { NavigateBefore, Edit, Delete } from "@mui/icons-material";
import { Card, CardHeader, CircularProgress, Divider, Grid, IconButton, Typography, Button } from "@mui/material";
import { GridValueGetterParams } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";

import { IProfession } from "../../../../interfaces";
import { TabAdminType } from "../../elements";
import { ProfessionContext } from "../../../../context";

type FormData = {
  name: string;
};

export const TabAdminProfessions = () => {
  const { professions, getProfessions, addProfession, updateProfession, deleteProfession } =
    useContext(ProfessionContext);
  const [listProfessions, setListProfessions] = useState<IProfession[]>([]);
  const [professionId, setProfessionId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getProfessions();
  }, []);

  useEffect(() => {
    if (professions) {
      setListProfessions(professions as unknown as IProfession[]);
    }
  }, [professions]);

  const handleAddProfession = async ({ name }: FormData) => {
    if (professionId === 0) {
      setIsLoading(true);
      const { isComplete } = await addProfession(name);
      if (isComplete) {
        setIsLoading(false);
        setProfessionId(0);
        setValue("name", "");
      }
    } else {
      setIsLoading(true);
      const { isComplete } = await updateProfession(professionId, name);
      if (isComplete) {
        setIsLoading(false);
        setProfessionId(0);
        setValue("name", "");
      }
    }
  };

  const handleUpdateProfession = (profession_id: number, profession_name: string) => () => {
    if (profession_id !== 0) {
      setProfessionId(profession_id);
      setValue("name", profession_name);
    }
  };

  const handleDeleteProfession = (profession_id: number) => async () => {
    setIsLoading(true);
    const { isComplete } = await deleteProfession(profession_id);
    if (isComplete) {
      setIsLoading(false);
      setProfessionId(0);
      setValue("name", "");
    }
  };

  const handleClearForm = () => {
    setProfessionId(0);
    setValue("name", "");
  };

  const rows = listProfessions.map((professions) => ({
    id: professions.id,
    name: professions.name,
  }));

  const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z/]+$/;

  if (professions) {
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
          handleSubmit={handleSubmit(handleAddProfession)}
          handleClearForm={handleClearForm}
          register={register}
          errors={errors}
          renderCell={({ row }: GridValueGetterParams) => {
            return (
              <Grid container spacing={0}>
                <Grid item xs={6} textAlign={"center"}>
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={handleUpdateProfession(row.id as number, row.name as string)}
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
                    onClick={handleDeleteProfession(row.id as number)}
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
          }}
          isLoading={isLoading}
          rows={rows}
          regex={ALPHA_NUMERIC_DASH_REGEX}
        />
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
