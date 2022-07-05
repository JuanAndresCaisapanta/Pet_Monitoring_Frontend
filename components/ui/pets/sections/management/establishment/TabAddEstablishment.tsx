import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Grid, Typography, TextField, SelectChangeEvent } from "@mui/material";
import { Save } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import MuiPhoneNumber from "material-ui-phone-number";

import { EstablishmentContext, EstablishmentTypeContext } from "../../../../../../context";
import { CardForm, SelectFormId } from "../../../../elements";

type FormData = {
  name: string;
  address: string;
  email: string;
  cell_phone: string;
  phone: string;
  typeEstablishment: number | null;
};

export const TabAddEstablishment = () => {
  const [listTypeEstablishment, setListTypeEstablishment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { establishmentType, getEstablishmentType, clearEstablishmentType } = useContext(EstablishmentTypeContext);
  const { addEstablishment } = useContext(EstablishmentContext);

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
    getEstablishmentType();
    return () => {
      clearEstablishmentType();
    };
  }, []);

  const handleClearForm = () => {
    setValue("name", "");
    setValue("address", "");
    setValue("email", "");
    setValue("cell_phone", "");
    setValue("phone", "");
    setListTypeEstablishment("");
    setValue("typeEstablishment", null);
  };
  const handleAddEstablishment = async ({
    name,
    address,
    email,
    cell_phone,
    phone,
    typeEstablishment,
  }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await addEstablishment(
      name,
      address,
      email,
      cell_phone,
      phone,
      typeEstablishment!,
      Number(pet_id),
      handleClearForm,
    );
    if (isComplete) {
      setIsLoading(false);
    }
  };

  if (establishmentType) {
    return (
      <CardForm
        title={`Ingrese la información del Establecimiento`}
        router={() => router.back()}
        submit={handleSubmit(handleAddEstablishment)}
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
              <SelectFormId
                label="Tipo de Establecimiento"
                name="typeEstablishment"
                value={listTypeEstablishment}
                onChange={(event: SelectChangeEvent) => setListTypeEstablishment(event.target.value)}
                object={establishmentType}
                register={register}
                error={!!errors.typeEstablishment}
                helperText={errors.typeEstablishment?.message}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="tel"
                label="Teléfono"
                placeholder="Teléfono"
                {...register("phone", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
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
                    label="Celular"
                    placeholder="Celular"
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
