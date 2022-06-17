import { useContext, useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import {
  Button,
  CardContent,
  Grid,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { AuthContext, DeviceContext } from "../../../context";
import { AutocompleteForm, SelectFormId } from "../elements";

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
    control,
    formState: { errors },
  } = useForm<FormData>();

  const route = useRouter();

  const onSelectPet = (event: SelectChangeEvent) => {
    setSelectPet(event.target.value as string);
  };

  const onAddDevice = async ({ code, pet }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await addDevice(code, pet);
    if (isComplete) {
      setIsLoading(false);
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
        onSubmit={handleSubmit(onAddDevice)}
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
          <Grid item xs={12}>
            <Button
              disableElevation
              variant="contained"
              sx={{ marginRight: 3.5 }}
              type="submit"
              disabled={isLoading}
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
