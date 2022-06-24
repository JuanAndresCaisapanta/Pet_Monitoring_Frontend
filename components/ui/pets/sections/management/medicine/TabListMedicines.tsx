import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { NavigateBefore, Search } from "@mui/icons-material";

import { PetContext } from "../../../../../../context";

import { CardMedicine } from "./CardMedicine";

export const TabListMedicines = () => {
  const [searchWord, setSearchWord] = useState("");
  const { pet, getPet, isLoaded, petChange } = useContext(PetContext);
  const router = useRouter();

  const { id: pet_id } = router.query;

  useEffect(() => {
    getPet(pet_id);
    return () => {
      petChange();
    };
  }, [pet_id]);

  const filteredOptions = pet?.medicine!.filter(
    (medicine) => medicine.name.toLowerCase().includes(searchWord.toLowerCase()) || !searchWord,
  );

  if (isLoaded && pet?.name) {
    return (
      <Card>
        <CardHeader
          sx={{ paddingTop: "4px", paddingBottom: "4px" }}
          title={`Lista de las medicinas de ${pet?.name}`}
          titleTypographyProps={{ variant: "body1" }}
          action={
            <IconButton aria-label="close" onClick={() => router.back()} style={{ color: "#9E69FD" }}>
              <NavigateBefore />
            </IconButton>
          }
        />
        <Divider sx={{ margin: 0 }} />
        <CardContent>
          <Grid container spacing={2} justifyContent={"center"}>
            <Grid container sx={{ mt: 2 }} direction="column" alignItems={"center"}>
              <Grid item>
                <TextField
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 4 } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(event) => setSearchWord(event.target.value)}
                  placeholder={"Buscar"}
                />
              </Grid>
            </Grid>
            {filteredOptions!.length > 0 ? (
              filteredOptions!
                .sort((a: any, b: any) => {
                  if (a.name < b.name) {
                    return -1;
                  }
                  if (a.name < b.name) {
                    return 1;
                  }
                  return 0;
                })
                .map((medicine) => (
                  <Grid item xs={12} sm={6} key={medicine.id}>
                    <CardMedicine
                      pet_id={Number(pet_id)}
                      medicine_id={medicine.id}
                      name={medicine.name}
                      image={medicine.image}
                      manufacturer={medicine.manufacturer}
                      application_date={medicine.application_date}
                      applicator={medicine.applicator}
                      typeMedicine={medicine.typeMedicine.name}
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
