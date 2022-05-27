import { Button, CardContent, Grid, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext, DeviceContext } from "../../../context";
import { AutocompleteForm } from "../elements";
type FormData = {
  code: string;
  pet: number;
};
export const TabInfoDevice = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { user } = useContext(AuthContext);
  const { addCallback } = useContext(DeviceContext);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const route = useRouter();

  const onDeviceForm = async ({ code, pet }: FormData) => {
    setShowError(false);
    const { hasError, message } = await addCallback(code, pet);
    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
  };

  const onCancel = () => {
    route.reload();
  };
  return (
    <CardContent>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onDeviceForm)}
        encType={`multipart/form-data`}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Codigo Dispositivo"
                  {...register("code", {
                    required: "Este campo es requerido",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  })}
                  error={!!errors.code}
                  helperText={errors.code?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <AutocompleteForm
                  object={user?.pet}
                  label="Mascotas"
                  name="pet"
                  control={control}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              item
              xs={12}
              sm={12}
              direction="column"
              alignItems="center"
            >
              <Image
                style={{ borderRadius: "10px" }}
                src="/images/device/device-logo.png"
                width={125}
                height={125}
                alt="Imagen Perfil"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              disableElevation
              variant="contained"
              sx={{ marginRight: 3.5 }}
              type="submit"
            >
              Guardar
            </Button>
            <Button
              disableElevation
              variant="outlined"
              color="error"
              onClick={onCancel}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};
