import { useContext, useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { AuthContext, DeviceContext } from "../../../context";
import { AutocompleteForm, SelectFormId } from "../elements";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";

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

  const route = useRouter();

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
  if(user?.pet){
  return (
    <Card>
      <CardHeader
        title={`Información de su Dispositivo`}
        titleTypographyProps={{ variant: "body1", color: "#3A3541DE" }}
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
  )
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
