import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Grid, Typography, TextField, SelectChangeEvent } from "@mui/material";
import { Update } from "@mui/icons-material";

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
  profession: number;
};

export const TabProfileProfessional = () => {
  const router = useRouter();
  const { id } = router.query;
  const [listProfession, setListProfession] = useState("");
  const [professionalName, setProfessionalName] = useState("");
  const [professionalLastName, setProfessionalLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { professions, getProfessions, clearProfessions } = useContext(ProfessionContext);

  const { professional, getProfessional, clearProfessional, updateProfessional } = useContext(ProfessionalContext);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getProfessions();
    return () => {
      clearProfessions();
    };
  }, []);

  useEffect(() => {
    if (professional) {
      setProfessionalName(professional.name);
      setProfessionalLastName(professional.last_name);
    }
  }, [professional]);

  useEffect(() => {
    if (id !== undefined) {
      getProfessional(Number(id));
    }
    return () => {
      clearProfessional();
    };
  }, [id]);

  useEffect(() => {
    if (professional) {
      setValue("name", professional?.name);
      setValue("last_name", professional?.last_name);
      setValue("address", professional?.address);
      setValue("email", professional?.email);
      setValue("cell_phone", professional?.cell_phone);
      setValue("profession", professional?.profession.id);
      setListProfession(professional.profession.id.toString());
    }
  }, [professional]);

  const handleClearForm = () => {
    if (professional) {
      setValue("name", professional?.name);
      setValue("last_name", professional?.last_name);
      setValue("address", professional?.address);
      setValue("email", professional?.email);
      setValue("cell_phone", professional?.cell_phone);
      setValue("profession", professional?.profession.id);
      setListProfession(professional?.profession.id.toString());
    }
  };

  const handleUpdateProfessional = async ({
    name,
    last_name,
    address,
    email,
    cell_phone,
    profession,
  }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await updateProfessional(
      Number(id),
      name,
      last_name,
      address,
      email,
      cell_phone,
      profession,
    );
    if (isComplete) {
      setIsLoading(false);
    }
  };

  if (professions && professional) {
    return (
      <CardForm
        title={`Información de ${professionalName} ${professionalLastName}`}
        router={() => router.back()}
        submit={handleSubmit(handleUpdateProfessional)}
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
                value={listProfession}
                onChange={(event: SelectChangeEvent) => setListProfession(event.target.value)}
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
