import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import {
  CardContent,
  Grid,
  Typography,
  TextField,
  CardActions,
  Card,
  Button,
  CardHeader,
  Divider,
  SelectChangeEvent,
} from "@mui/material";
import { Update } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import MuiPhoneNumber from "material-ui-phone-number";

import {
  ProfessionalContext,
  ProfessionContext,
} from "../../../../../../context";
import { SelectFormId } from "../../../../elements";

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
  const [selectProfession, setSelectProfession] = useState(``);

  const {
    professions,
    getProfessions,
    isLoaded: isProfessionsLoaded,
    clearProfessions,
  } = useContext(ProfessionContext);

  const {
    professional,
    getProfessional,
    clearProfessional,
    updateProfessional,
    isLoaded: isProfessionalLoaded,
  } = useContext(ProfessionalContext);

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
      setSelectProfession(professional.profession.id.toString());
    }
  }, [professional]);

  const onAddMedicine = async ({
    name,
    last_name,
    address,
    email,
    cell_phone,
    profession,
  }: FormData) => {
    const { hasError, message } = await updateProfessional(
      Number(id),
      name,
      last_name,
      address,
      email,
      cell_phone,
      profession,
    );
    if (hasError) {
      // setShowError(true);
      // setErrorMessage(message!);
      // setTimeout(() => setShowError(false), 3000);
      return;
    }
  };

  if (isProfessionsLoaded && isProfessionalLoaded) {
    return (
      <Card>
        <CardHeader
          title={`Información de ${professional?.name} ${professional?.last_name}`}
          titleTypographyProps={{ variant: "body1", color: "#3A3541DE" }}
        />
        <Divider sx={{ margin: 0 }} />
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onAddMedicine)}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SelectFormId
                      label="Profesión"
                      name="profession"
                      value={selectProfession}
                      onChange={(event: SelectChangeEvent) =>
                        setSelectProfession(event.target.value)
                      }
                      object={professions}
                      register={register}
                      error={!!errors.profession}
                      helperText={errors.profession?.message}
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
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <MuiPhoneNumber
                          fullWidth
                          countryCodeEditable={false}
                          variant="outlined"
                          defaultCountry={"ec"}
                          value={value}
                          onChange={onChange}
                          error={!!error}
                          helperText={error?.message}
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
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} textAlign="center"></Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions sx={{ padding: "16px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: 2 }}
                  disableElevation
                  type="submit"
                  startIcon={<Update />}
                  //   onClick={() => navigateTo(`profile/${id}`)}
                >
                  Actualizar
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  //   startIcon={<Delete />}
                  //   onClick={onDelete}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </form>
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
      </Grid>
    );
  }
};