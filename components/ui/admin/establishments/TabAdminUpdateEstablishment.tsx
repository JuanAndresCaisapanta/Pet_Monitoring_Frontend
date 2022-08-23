import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Grid, Typography, TextField, SelectChangeEvent, CircularProgress } from "@mui/material";
import { Delete, Update } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import MuiPhoneNumber from "material-ui-phone-number";

import { EstablishmentContext, EstablishmentTypeContext } from "../../../../context";
import { CardForm, SelectFormId } from "../../elements";
import { LoadingButton } from "@mui/lab";

type FormData = {
  name: string;
  address: string;
  email: string;
  cell_phone: string;
  phone: string;
  typeEstablishment: number;
  pet: string | null;
  user: string | null;
};

export const TabAdminUpdateEstablishment = () => {
  const [listTypeEstablishment, setListTypeEstablishment] = useState(``);
  const [establishmentName, setEstablishmentName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { establishmentType, getEstablishmentTypes: getEstablishmentType, clearEstablishmentType } = useContext(EstablishmentTypeContext);

  const { establishment, getEstablishment, clearEstablishment, updateEstablishment, deleteEstablishment } =
    useContext(EstablishmentContext);

  const router = useRouter();
  const { id: establishment_id } = router.query;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getEstablishmentType();
    return () => {
      clearEstablishmentType();
    };
  }, []);

  useEffect(() => {
    if (establishment) {
      setEstablishmentName(establishment.name);
    }
  }, [establishment]);

  useEffect(() => {
    if (establishment_id !== undefined) {
      getEstablishment(Number(establishment_id));
    }
    return () => {
      clearEstablishment();
    };
  }, [establishment_id]);

  useEffect(() => {
    if (establishment) {
      setValue("name", establishment?.name);
      setValue("address", establishment?.address);
      setValue("email", establishment?.email);
      setValue("cell_phone", establishment?.cell_phone);
      setValue("phone", establishment?.phone);
      setValue("typeEstablishment", establishment?.establishmentType.id);
      setListTypeEstablishment(establishment.establishmentType.id.toString());
      setValue("user", establishment.pet.users.email);
      setValue("pet", establishment.pet.name);
    }
  }, [establishment]);

  const handleClearForm = () => {
    if (establishment) {
      setValue("name", establishment?.name);
      setValue("address", establishment?.address);
      setValue("email", establishment?.email);
      setValue("cell_phone", establishment?.cell_phone);
      setValue("phone", establishment?.phone);
      setValue("typeEstablishment", establishment?.establishmentType.id);
      setListTypeEstablishment(establishment.establishmentType.id.toString());
      setValue("user", establishment.pet.users.email);
      setValue("pet", establishment.pet.name);
    }
  };

  const handleUpdateEstablishment = async ({
    name,
    address,
    email,
    cell_phone,
    phone,
    typeEstablishment,
  }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await updateEstablishment(
      Number(establishment_id),
      name,
      address,
      email,
      cell_phone,
      phone,
      typeEstablishment,
    );
    if (isComplete) {
      setIsLoading(false);
    }
  };

  const handleDeleteEstablishment = async () => {
    setIsLoading(true);
    const { isComplete } = await deleteEstablishment(undefined, Number(establishment_id), router);
    if (isComplete) {
      setIsLoading(false);
    }
  };

  const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z]+$/;

  if (establishmentType && establishment) {
    return (
      <CardForm
        title={`Información de ${establishmentName}`}
        router={() => router.back()}
        submit={handleSubmit(handleUpdateEstablishment)}
        clearForm={handleClearForm}
        startIcon={<Update />}
        textLoadingButton={"Actualizar"}
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
              <TextField
                fullWidth
                type="tel"
                inputProps={{ maxLength: 10 }}
                label="Celular"
                {...register("cell_phone", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Solo se permiten numeros",
                  },
                })}
                onKeyPress={(event) => {
                  if (
                    event?.key === "-" ||
                    event?.key === "+" ||
                    event?.key === "." ||
                    event?.key === "e" ||
                    event?.key === "," ||
                    ALPHA_NUMERIC_DASH_REGEX.test(event.key)
                  ) {
                    event.preventDefault();
                  }
                }}
                error={!!errors.cell_phone}
                helperText={errors.cell_phone?.message}
                disabled={isLoading}
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
                type="text"
                label="Usuario"
                placeholder="Usuario"
                {...register("user", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                disabled
                error={!!errors.user}
                helperText={errors.user?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="text"
                label="Mascota"
                placeholder="Mascota"
                {...register("pet", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                disabled
                error={!!errors.pet}
                helperText={errors.pet?.message}
              />
            </Grid>
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
        gridDelete={
          <Grid item xs={12} md={6} textAlign="right">
            <LoadingButton
              variant="outlined"
              color="secondary"
              disableElevation
              onClick={handleDeleteEstablishment}
              startIcon={<Delete />}
              loading={isLoading}
              loadingPosition="start"
            >
              Eliminar
            </LoadingButton>
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
        <Grid item>
          <Typography color={"primary"} sx={{ mt: 1 }}>
            <CircularProgress color="secondary" />
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
