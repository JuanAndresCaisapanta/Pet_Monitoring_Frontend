import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { CircularProgress, Grid, Typography } from "@mui/material";

import { PetContext } from "../../../../../../context";
import { CardEstablishment } from "./CardEstablishment";
import { CardList } from "../../../../elements";

export const TabListEstablishments = () => {
  const [searchWord, setSearchWord] = useState("");

  const { pet, getPet, isLoaded, petChange } = useContext(PetContext);

  const router = useRouter();

  const { id: pet_id } = router.query;

  useEffect(() => {
    if(pet_id!==undefined) {
      getPet(Number(pet_id));
    }
    return () => {
      petChange();
    };
  }, [pet_id]);

  const establishments = pet?.establishment;

  const filteredOptions = establishments?.filter(
    (establishment) => establishment.name.toLowerCase().includes(searchWord.toLowerCase()) || !searchWord,
  );

  if (isLoaded) {
    return (
      <CardList
        title={`Lista de los establecimientos de ${pet?.name}`}
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
              .map((establishment) => (
                <Grid item xs={12} sm={4} key={establishment.id}>
                  <CardEstablishment
                    pet_id={Number(pet_id)}
                    establishment_id={establishment.id}
                    name={establishment.name}
                    type={establishment.establishmentType.name}
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
        <Grid item>
          <Typography color={"primary"} sx={{ mt: 1 }}>
            <CircularProgress color="secondary" />
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
