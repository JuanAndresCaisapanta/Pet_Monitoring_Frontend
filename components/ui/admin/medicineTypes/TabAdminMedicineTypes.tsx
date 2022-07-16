import { useContext, useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { NavigateBefore, Edit, Delete } from "@mui/icons-material";
import { Card, CardHeader, CircularProgress, Divider, Grid, IconButton, Typography, Button } from "@mui/material";
import { GridValueGetterParams } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";

import { IMedicineType } from "../../../../interfaces";
import { TabAdminType } from "../../elements";
import { MedicineTypeContext } from "../../../../context";

type FormData = {
  name: string;
};

export const TabAdminMedicineTypes = () => {
  const {
    medicineType: medicineTypes,
    getMedicineType,
    addMedicineType,
    updateMedicineType,
    deleteMedicineType,
  } = useContext(MedicineTypeContext);
  const [listMedicineTypes, setListMedicineTypes] = useState<IMedicineType[]>([]);
  const [medicineTypeId, setMedicineTypeId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getMedicineType();
  }, []);

  useEffect(() => {
    if (medicineTypes) {
      setListMedicineTypes(medicineTypes as unknown as IMedicineType[]);
    }
  }, [medicineTypes]);

  const handleAddProfession = async ({ name }: FormData) => {
    if (medicineTypeId === 0) {
      setIsLoading(true);
      const { isComplete } = await addMedicineType(name);
      if (isComplete) {
        setIsLoading(false);
        setMedicineTypeId(0);
        setValue("name", "");
      }
    } else {
      setIsLoading(true);
      const { isComplete } = await updateMedicineType(medicineTypeId, name);
      if (isComplete) {
        setIsLoading(false);
        setMedicineTypeId(0);
        setValue("name", "");
      }
    }
  };

  const handleUpdateMedicineType = (medicineType_id: number, medicineType_name: string) => () => {
    if (medicineType_id !== 0) {
      setMedicineTypeId(medicineType_id);
      setValue("name", medicineType_name);
    }
  };

  const handleDeleteMedicineType = (medicineType_id: number) => async () => {
    setIsLoading(true);
    const { isComplete } = await deleteMedicineType(medicineType_id);
    if (isComplete) {
      setIsLoading(false);
      setMedicineTypeId(0);
      setValue("name", "");
    }
  };

  const handleClearForm = () => {
    setMedicineTypeId(0);
    setValue("name", "");
  };

  const rows = listMedicineTypes.map((medicineTypes) => ({
    id: medicineTypes.id,
    name: medicineTypes.name,
  }));

  const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z]+$/;

  if (medicineTypes) {
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
                    onClick={handleUpdateMedicineType(row.id as number, row.name as string)}
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
                    onClick={handleDeleteMedicineType(row.id as number)}
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
