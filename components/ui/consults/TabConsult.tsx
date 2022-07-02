import { NavigateBefore, Search } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useContext, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext, PetContext } from "../../../context";
import { sections } from "../../../data";
import { SelectFormId } from "../elements";
import { CardPet } from "../pets";

type FormData = {
  section: number;
  name: string;
};

export const TabConsult = () => {
  const [listSection, setListSection] = useState<string | null>("");
  const [nameEstablishment, setNameEstablishment] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const {user}= useContext(AuthContext)
  const {pets,getPetsEstablishment,clearPetsEstablishment}= useContext(PetContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

useEffect(() => {
  clearPetsEstablishment();
}, []);

  const handleConsultEstablishment = async({name}:FormData) => {
    setIsLoading(true);
    const {isComplete} = await getPetsEstablishment(name, user?.id!);
    setNameEstablishment(name);
    if(isComplete){
      setIsLoading(false);
    }
  };

  const handleConsultMedicine = () => {};

  const handleConsultProfessional = () => {};

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
            : () => {}
        )}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <SelectFormId
                label="Secciones"
                name="section"
                object={sections}
                value={listSection}
                onChange={(event: SelectChangeEvent) => {
                  setListSection(event.target.value);
                }}
                register={register}
                disabled={isLoading}
                error={!!errors.section}
                helperText={errors.section?.message}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
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
            <Grid item textAlign={"center"} xs={12} md={4}>
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
                      name_establishment={nameEstablishment}
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
