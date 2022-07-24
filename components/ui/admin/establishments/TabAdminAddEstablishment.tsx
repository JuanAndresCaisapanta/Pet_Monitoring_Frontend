import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import {
  Grid,
  Typography,
  TextField,
  SelectChangeEvent,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import MuiPhoneNumber from "material-ui-phone-number";

import { EstablishmentContext, EstablishmentTypeContext, PetContext, UserContext } from "../../../../context";
import { CardForm, SelectFormId } from "../../elements";

type FormData = {
  name: string;
  address: string;
  email: string;
  cell_phone: string;
  phone: string;
  typeEstablishment: number | null;
  pet: number | null;
  user: number | null;
};

export const TabAdminAddEstablishment = () => {
  const [listTypeEstablishment, setListTypeEstablishment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPet, setIsLoadingPet] = useState(false);
  const [listUsers, setListUsers] = useState<string>("");
  const [listPets, setListPets] = useState("");

  const { users, getUsers } = useContext(UserContext);
  const { pets, getPetsByUser, clearPets } = useContext(PetContext);
  const { establishmentType, getEstablishmentType, clearEstablishmentType } = useContext(EstablishmentTypeContext);
  const { addEstablishment } = useContext(EstablishmentContext);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  useEffect(() => {
    getUsers();
  }, [users]);

  useEffect(() => {
    if (pets) {
      setIsLoadingPet(false);
    }
  }, [pets]);

  useEffect(() => {
    getEstablishmentType();
    return () => {
      clearEstablishmentType();
    };
  }, []);

  const handleClearForm = () => {
    setValue("name", "");
    setValue("address", "");
    setValue("email", "");
    setValue("cell_phone", "");
    setValue("phone", "");
    setListTypeEstablishment("");
    setValue("typeEstablishment", null);
    setListUsers("");
    setValue("user", null);
    setListPets("");
    setValue("pet", null);
  };

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
  const handleAddEstablishment = async ({
    name,
    address,
    email,
    cell_phone,
    phone,
    typeEstablishment,
    pet,
  }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await addEstablishment(
      name,
      address,
      email,
      cell_phone,
      phone,
      typeEstablishment!,
      pet!,
      handleClearForm,
    );
    if (isComplete) {
      setIsLoading(false);
    }
  };

  if (establishmentType) {
    return (
      <CardForm
        title={`Ingrese la información del Establecimiento`}
        router={() => router.back()}
        submit={handleSubmit(handleAddEstablishment)}
        clearForm={handleClearForm}
        textLoadingButton={"Guardar"}
        startIcon={<Save />}
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
        <Grid item>
          <Typography color={"primary"} sx={{ mt: 1 }}>
            <CircularProgress color="secondary" />
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
