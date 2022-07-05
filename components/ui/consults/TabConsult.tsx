import { NavigateBefore, Search } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  AuthContext,
  MedicineContext,
  PetContext,
  ProfessionalContext,
  ProfessionContext,
  EstablishmentContext,
  EstablishmentTypeContext,
  MedicineTypeContext,
} from "../../../context";
import { sections } from "../../../data";
import { SelectFormI, SelectFormId } from "../elements";
import { CardPet } from "../pets";

type FormData = {
  section: number;
  full_name: string;
  types: number;
};

export const TabConsult = () => {
  const [listSection, setListSection] = useState<string | null>("");
  const [listFullName, setListFullName] = useState<string | undefined>("");
  const [listTypes, setListTypes] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { professions, getProfessions } = useContext(ProfessionContext);
  const { establishmentType, getEstablishmentType } = useContext(EstablishmentTypeContext);
  const { medicineType, getMedicineType } = useContext(MedicineTypeContext);
  const { pets, getPetsEstablishment, getPetsProfessional, getPetsMedicine, clearPets } = useContext(PetContext);
  const { professionalsFullName, getProfessionalsFullName } = useContext(ProfessionalContext);
  const { establishmentsFullName, getEstablishmentsFullName } = useContext(EstablishmentContext);
  const { medicinesFullName, getMedicinesFullName } = useContext(MedicineContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    clearPets();
  }, []);

  const handleConsultEstablishment = async ({ types, full_name }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await getPetsEstablishment(types, full_name, user?.id!);
    //setFullNames(full_name);
    if (isComplete) {
      setIsLoading(false);
    }
  };

  const handleConsultMedicine = async ({ types, full_name }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await getPetsMedicine(types, full_name, user?.id!);
    //setFullNames(full_name);
    if (isComplete) {
      setIsLoading(false);
    }
  };

  const handleConsultProfessional = async ({ types, full_name }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await getPetsProfessional(types, full_name, user?.id!);
    //setNameEstablishment(name);
    if (isComplete) {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader
        sx={{ paddingTop: "4px", paddingBottom: "4px" }}
        title={"Realice consultas sobre las secciones de administración"}
        titleTypographyProps={{ variant: "body1" }}
        action={
          <IconButton aria-label="close" onClick={() => {}} style={{ color: "#9E69FD" }}>
            <NavigateBefore />
          </IconButton>
        }
      />
      <Divider sx={{ margin: 0 }} />
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(
          listSection == "1"
            ? handleConsultEstablishment
            : listSection == "2"
            ? handleConsultMedicine
            : listSection == "3"
            ? handleConsultProfessional
            : () => {},
        )}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <SelectFormId
                label="Secciones"
                name="section"
                object={sections}
                value={listSection}
                onChange={(event: SelectChangeEvent) => {
                  setListSection(event.target.value);
                  setListTypes("");
                  setListFullName("");
                  if (event.target.value == "3") {
                    clearPets();
                    getProfessions();
                    getProfessionalsFullName(user?.id!);
                  }
                  if (event.target.value == "2") {
                    clearPets();
                    getMedicineType();
                    getMedicinesFullName(user?.id!);
                  }
                  if (event.target.value == "1") {
                    clearPets();
                    getEstablishmentType();
                    getEstablishmentsFullName(user?.id!);
                  }
                }}
                register={register}
                disabled={isLoading}
                error={!!errors.section}
                helperText={errors.section?.message}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <SelectFormI
                label="Nombres"
                name="full_name"
                object={
                  listSection == "3"
                    ? professionalsFullName
                    : listSection == "2"
                    ? medicinesFullName
                    : establishmentsFullName
                }
                value={listFullName}
                onChange={(event: SelectChangeEvent) => {
                  setListFullName(event.target.value);
                }}
                register={register}
                disabled={isLoading}
                error={!!errors.full_name}
                helperText={errors.full_name?.message}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <SelectFormId
                label="Tipos"
                name="types"
                object={listSection == "3" ? professions : listSection == "2" ? medicineType : establishmentType}
                value={listTypes}
                onChange={(event: SelectChangeEvent) => {
                  setListTypes(event.target.value);
                }}
                register={register}
                disabled={isLoading}
                error={!!errors.types}
                helperText={errors.types?.message}
              />
            </Grid>
            <Grid item textAlign={"center"} xs={12} md={3}>
              <LoadingButton
                variant="contained"
                color="primary"
                sx={{ marginRight: 2, marginTop: 1 }}
                disableElevation
                type="submit"
                startIcon={<Search />}
                loading={isLoading}
                loadingPosition="start"
              >
                Consultar
              </LoadingButton>
            </Grid>
          </Grid>
        </CardContent>
      </form>
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <Grid container spacing={2} justifyContent={"center"}>
          {pets?.length! > 0 ? (
            pets!
              .sort((a: any, b: any) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name < b.name) {
                  return 1;
                }
                return 0;
              })
              .map((pet) => (
                <Grid item xs={12} sm={6} key={pet.id}>
                  <CardPet
                    id={pet.id}
                    image={pet.image}
                    name={pet.name}
                    sex={pet.sex}
                    race={pet.breed.name}
                    species={pet.breed.species.name}
                    types={Number(listTypes)}
                    full_name={listFullName}
                    user_id={user?.id}
                  />
                </Grid>
              ))
          ) : (
            <Grid container direction="column" alignItems={"center"}>
              <Grid item>
                <Typography color={"primary"} sx={{ mt: 1 }}>
                  Sin Resultados.
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};
