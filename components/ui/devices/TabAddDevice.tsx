import { useContext, useState } from "react";

import { useRouter } from "next/router";

import { Grid, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { Save } from "@mui/icons-material";

import { useForm } from "react-hook-form";

import { AuthContext, DeviceContext } from "../../../context";
import { CardForm, SelectFormId } from "../elements";

type FormData = {
  code: string;
  pet: number | null;
};

export const TabAddDevice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectPet, setSelectPet] = useState("");

  const { user } = useContext(AuthContext);
  const { addDevice } = useContext(DeviceContext);

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

  const handleAddDevice = async ({ code, pet }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await addDevice(code,user?.id!, pet!,handleClearForm);
    if (isComplete) {
      setIsLoading(false);
    }
  };

  const handleClearForm = () => {
    setValue("code", "");
    setSelectPet("");
    setValue("pet", null);
  };
  if (user?.pet.length! > 0) {
    return (
      <CardForm
        title={`Ingrese la información de su Dispositivo`}
        router={() => router.back()}
        submit={handleSubmit(handleAddDevice)}
        clearForm={handleClearForm}
        textLoadingButton={"Guardar"}
        startIcon={<Save />}
        isLoading={isLoading}
        leftContent={
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
        }
        rightContent={
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
        }
      />
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
