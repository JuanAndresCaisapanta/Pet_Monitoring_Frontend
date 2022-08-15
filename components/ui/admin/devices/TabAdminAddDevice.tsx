import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import {
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { DeviceContext, PetContext, UserContext } from "../../../../context";
import { CardForm, SelectFormId } from "../../elements";

type FormData = {
  code: string;
  pet: number | null;
  user: number | null;
};

export const TabAdminAddDevice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPet, setIsLoadingPet] = useState(false);
  const [listUsers, setListUsers] = useState<string>("");
  const [listPets, setListPets] = useState("");

  const { users, getUsers } = useContext(UserContext);
  const { pets, getPetsByUser, clearPets } = useContext(PetContext);
  const { addDevice } = useContext(DeviceContext);

  useEffect(() => {
    getUsers();
  }, [users]);

  useEffect(() => {
    if (pets) {
      setIsLoadingPet(false);
    }
  }, [pets]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const onChangeUsers = (event: SelectChangeEvent) => {
    clearPets();
    setListPets("");
    setListUsers(event.target.value);
    getPetsByUser(Number(event.target.value));
    setIsLoadingPet(true);
  };

  const onChangePets = (event: SelectChangeEvent) => {
    setListPets(event.target.value);
  };

  const handleAddDevice = async ({ code, user, pet }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await addDevice(code, user!, pet!,handleClearForm);
    if (isComplete) {
      setIsLoading(false);
    }
  };

  const handleClearForm = () => {
    setValue("code", "");
    setListPets("");
    setValue("pet", null);
    setListUsers("");
    setValue("user", null);
  };
  if (users) {
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
                inputProps={{ maxLength: 24 }}
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" error={!!errors.user}>
                  Usuario
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  disabled={isLoading}
                  value={listUsers}
                  label="Usuario"
                  {...register("user", {
                    onChange: onChangeUsers,
                    required: "Este campo es requerido",
                  })}
                  defaultValue={listUsers}
                  error={!!errors.user}
                >
                  {users?.map(({ id, email }: any, i: any) => (
                    <MenuItem key={i} value={id}>
                      {email}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={!!errors.user}>{errors.user?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              {pets ? (
                <SelectFormId
                  label="Mascota"
                  name="pet"
                  object={pets}
                  value={listPets}
                  onChange={onChangePets}
                  register={register}
                  error={!!errors.pet}
                  helperText={errors.pet?.message}
                  disabled={isLoading}
                />
              ) : (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {!isLoadingPet ? "Seleccione un usuario para ver sus mascotas" : "Cargando..."}
                  </InputLabel>
                  <Select disabled labelId="demo-simple-select-label" id="demo-simple-select" value={""}></Select>
                </FormControl>
              )}
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
        <Grid item>
          <Typography color={"primary"} sx={{ mt: 1 }}>
            <CircularProgress color="secondary" />
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
