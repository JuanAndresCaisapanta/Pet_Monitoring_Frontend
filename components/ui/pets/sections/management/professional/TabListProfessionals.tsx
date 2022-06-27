import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Grid, Typography } from "@mui/material";

import { PetContext } from "../../../../../../context";
import { CardProfessional } from "./CardProfessional";
import { CardList } from "../../../../elements";

export const TabListProfessionals = () => {
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

  const professionals = pet?.professional;

  const filteredOptions = professionals?.filter(
    (professional) =>
      `${professional.name} ${professional.last_name}`.toLowerCase().includes(searchWord.toLowerCase()) ||
      !searchWord,
  );

  if (isLoaded && pet?.name) {
    return (
      <CardList
        title={`Lista de los profesionales de ${pet?.name}`}
        router={() => router.back()}
        onChange={(event) => setSearchWord(event.target.value)}
        filterCard={
          filteredOptions!.length > 0 ? (
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
              .map((professional) => (
                <Grid item xs={12} sm={3} key={professional.id}>
                  <CardProfessional
                    pet_id={Number(pet_id)}
                    professional_id={professional.id}
                    name={professional.name}
                    last_name={professional.last_name}
                    profession={professional.profession.name}
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
          )
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
      </Grid>
    );
  }
};
