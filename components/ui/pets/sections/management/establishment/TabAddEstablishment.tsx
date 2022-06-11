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
import { Save } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import MuiPhoneNumber from "material-ui-phone-number";

import {
  EstablishmentContext,
  TypeEstablishmentContext,
} from "../../../../../../context";
import { SelectFormId } from "../../../../elements";

type FormData = {
  name: string;
  address: string;
  email: string;
  cell_phone: string;
  phone: string;
  typeEstablishment: number;
};

export const TabAddEstablishment = () => {
  const [selectTypeEstablishment, setSelectTypeEstablishment] = useState(``);
  const {
    typeEstablishments,
    getTypeEstablishments,
    isLoaded,
    clearTypeEstablishments,
  } = useContext(TypeEstablishmentContext);
  const { addEstablishment } = useContext(EstablishmentContext);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getTypeEstablishments();
    return () => {
      clearTypeEstablishments();
    };
  }, []);

  const onAddEstablishment = async ({
    name,
    address,
    email,
    cell_phone,
    phone,
    typeEstablishment,
  }: FormData) => {
    const { hasError, message } = await addEstablishment(
      name,
      address,
      email,
      cell_phone,
      phone,
      typeEstablishment,
      Number(id),
    );
    if (hasError) {
      // setShowError(true);
      // setErrorMessage(message!);
      // setTimeout(() => setShowError(false), 3000);
      return;
    }
  };

  if (isLoaded) {
    return (
      <Card>
        <CardHeader
          title="Información del Establecimiento"
          titleTypographyProps={{ variant: "body1", color: "#3A3541DE" }}
        />
        <Divider sx={{ margin: 0 }} />
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onAddEstablishment)}
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
                    <SelectFormId
                      label="Tipo de Establecimiento"
                      name="typeEstablishment"
                      value={selectTypeEstablishment}
                      onChange={(event: SelectChangeEvent) =>
                        setSelectTypeEstablishment(event.target.value)
                      }
                      object={typeEstablishments}
                      register={register}
                      error={!!errors.typeEstablishment}
                      helperText={errors.typeEstablishment?.message}
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
                  startIcon={<Save />}
                  //   onClick={() => navigateTo(`profile/${id}`)}
                >
                  Guardar
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
