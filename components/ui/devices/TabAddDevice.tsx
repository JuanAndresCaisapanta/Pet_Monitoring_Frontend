import { useContext, useState } from "react";

import { useRouter } from "next/router";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { NavigateBefore, Save } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { AuthContext, DeviceContext } from "../../../context";
import { SelectFormId } from "../elements";

type FormData = {
  code: string;
  pet: number;
};

export const TabAddDevice = () => {
  const { user } = useContext(AuthContext);
  const { addDevice } = useContext(DeviceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [selectPet, setSelectPet] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const onSelectPet = (event: SelectChangeEvent) => {
    setSelectPet(event.target.value);
  };

  const onAddDevice = async ({ code, pet }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await addDevice(code, pet);
    if (isComplete) {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    setValue("code", "");
    setSelectPet("");
    setValue("pet", 0);
  };
  if (user?.pet) {
    return (
      <Card>
        <CardHeader
          title={`Información de su Dispositivo`}
          titleTypographyProps={{ variant: "body1" }}
          action={
            <IconButton
              aria-label="close"
              onClick={() => router.back()}
              style={{ color: "#9E69FD" }}
            >
              <NavigateBefore />
            </IconButton>
          }
        />
        <Divider sx={{ margin: 0 }} />
        <form
          noValidate
          autoComplete="off"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onAddDevice)}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Código Dispositivo"
                      defaultValue=""
                      {...register("code", {
                        required: "Este campo es requerido",
                        minLength: { value: 2, message: "Mínimo 2 caracteres" },
                      })}
                      error={!!errors.code}
                      helperText={errors.code?.message}
                      disabled={isLoading}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <SelectFormId
                      label="Mascota"
                      name="pet"
                      object={user?.pet}
                      value={selectPet}
                      onChange={onSelectPet}
                      register={register}
                      error={!!errors.pet}
                      helperText={errors.pet?.message}
                      disabled={isLoading}
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
                <LoadingButton
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: 2 }}
                  disableElevation
                  type="submit"
                  startIcon={<Save />}
                  loading={isLoading}
                  loadingPosition="start"
                >
                  Guardar
                </LoadingButton>
                <Button
                  disableElevation
                  variant="outlined"
                  color="secondary"
                  onClick={onCancel}
                  disabled={isLoading}
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
            Sin Mascotas Agregadas
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
