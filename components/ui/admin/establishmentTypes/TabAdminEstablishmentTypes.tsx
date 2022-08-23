import { useContext, useState, useEffect } from "react";

import { get, useForm } from "react-hook-form";
import { NavigateBefore, Edit, Delete } from "@mui/icons-material";
import { Card, CardHeader, CircularProgress, Divider, Grid, IconButton, Typography, Button } from "@mui/material";
import { GridValueGetterParams } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";

import { IEstablishmentType} from "../../../../interfaces";
import { TabAdminType } from "../../elements";
import { EstablishmentTypeContext } from "../../../../context";

type FormData = {
  name: string;
};

export const TabAdminEstablishmentTypes = () => {
  const {
    establishmentType: establishmentTypes,
    getEstablishmentTypes: getEstablishmentType,
    addEstablishmentType,
    updateEstablishmentType,
    deleteEstablishmentType,
  } = useContext(EstablishmentTypeContext);
  const [listEstablishmentTypes, setListEstablishmentTypes] = useState<IEstablishmentType[]>([]);
  const [establishmentypeId, setEstablishmentTypeId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getEstablishmentType();
  }, []);

  useEffect(() => {
    if (establishmentTypes) {
      setListEstablishmentTypes(establishmentTypes as unknown as IEstablishmentType[]);
    }
  }, [establishmentTypes]);

  const handleAddProfession = async ({ name }: FormData) => {
    if (establishmentypeId === 0) {
      setIsLoading(true);
      const { isComplete } = await addEstablishmentType(name);
      if (isComplete) {
        setIsLoading(false);
        setEstablishmentTypeId(0);
        setValue("name", "");
      }
    } else {
      setIsLoading(true);
      const { isComplete } = await updateEstablishmentType(establishmentypeId, name);
      if (isComplete) {
        setIsLoading(false);
        setEstablishmentTypeId(0);
        setValue("name", "");
      }
    }
  };

  const handleUpdateEstablishmentType= (establishmentType_id: number, establishmentType_name: string) => () => {
    if (establishmentType_id !== 0) {
      setEstablishmentTypeId(establishmentType_id);
      setValue("name", establishmentType_name);
    }
  };

  const handleDeleteEstablishmentType = (establishmentType_id: number) => async () => {
    setIsLoading(true);
    const { isComplete } = await deleteEstablishmentType(establishmentType_id);
    if (isComplete) {
      setIsLoading(false);
      setEstablishmentTypeId(0);
      setValue("name", "");
    }
  };

  const handleClearForm = () => {
    setEstablishmentTypeId(0);
    setValue("name", "");
  };

  const rows = listEstablishmentTypes.map((establishmentTypes) => ({
    id: establishmentTypes.id,
    name: establishmentTypes.name,
  }));

  const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z\sÁÉÍÓÚáéíóúÑñ]+$/;

  if (establishmentTypes) {
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
                    onClick={handleUpdateEstablishmentType(row.id as number, row.name as string)}
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
                    onClick={handleDeleteEstablishmentType(row.id as number)}
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
