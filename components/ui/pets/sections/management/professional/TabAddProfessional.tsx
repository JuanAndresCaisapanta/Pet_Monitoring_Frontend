import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Grid, Typography, TextField, SelectChangeEvent } from "@mui/material";
import { Save } from "@mui/icons-material";

import { Controller, useForm } from "react-hook-form";

import MuiPhoneNumber from "material-ui-phone-number";

import { ProfessionalContext, ProfessionContext } from "../../../../../../context";
import { CardForm, SelectFormId } from "../../../../elements";

type FormData = {
  name: string;
  last_name: string;
  address: string;
  email: string;
  cell_phone: string;
  profession: number | null;
};

export const TabAddProfessional = () => {
  const [listProfessions, setListProfessions] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    professions,
    getProfessions,
    isLoaded: isLoadedProfessions,
    clearProfessions,
  } = useContext(ProfessionContext);
  const { addProfessional } = useContext(ProfessionalContext);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const { id: pet_id } = router.query;

  useEffect(() => {
    getProfessions();
    return () => {
      clearProfessions();
    };
  }, []);

  const handleClearForm = () => {
    setValue("name", "");
    setValue("last_name", "");
    setValue("address", "");
    setValue("email", "");
    setValue("cell_phone", "");
    setListProfessions("");
    setValue("profession", null);
  };

  const handleAddProfessional = async ({ name, last_name, address, email, cell_phone, profession }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await addProfessional(
      name,
      last_name,
      address,
      email,
      cell_phone,
      profession!,
      Number(pet_id),
      handleClearForm,
    );
    if (isComplete) {
      setIsLoading(false);
    }
  };

  if (isLoadedProfessions) {
    return (
      <CardForm
        title={`Ingrese la información del Profesional`}
        router={() => router.back()}
        submit={handleSubmit(handleAddProfessional)}
        clearForm={handleClearForm}
        textLoadingButton={"Guardar"}
        startIcon={<Save />}
        isLoading={isLoading}
        leftContent={
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                label="Nombre"
                placeholder="Nombre"
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                label="Apellido"
                placeholder="Apellido"
                {...register("last_name", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectFormId
                label="Profesión"
                name="profession"
                value={listProfessions}
                onChange={(event: SelectChangeEvent) => setListProfessions(event.target.value)}
                object={professions}
                register={register}
                error={!!errors.profession}
                helperText={errors.profession?.message}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="cell_phone"
                control={control}
                defaultValue=""
                rules={{
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <MuiPhoneNumber
                    fullWidth
                    countryCodeEditable={false}
                    variant="outlined"
                    defaultCountry={"ec"}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message}
                    disabled={isLoading}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="email"
                label="Correo Electrónico"
                placeholder="Correo Electrónico"
                {...register("email", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isLoading}
              />
            </Grid>
          </Grid>
        }
        rightContent={
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                type="text"
                label="Dirección"
                placeholder="Dirección"
                {...register("address", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
                disabled={isLoading}
              />
            </Grid>
          </Grid>
        }
      />
    );
  } else {
    return (
      <Grid container direction="column" alignItems={"center"}>
        <Grid item>
          <Typography color={"primary"} sx={{ mt: 1 }}>
            Cargando...
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
