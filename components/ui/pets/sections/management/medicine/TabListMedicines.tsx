import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { CircularProgress, Grid, Typography } from "@mui/material";

import { PetContext } from "../../../../../../context";
import { CardMedicine } from "./CardMedicine";
import { CardList } from "../../../../elements";

export const TabListMedicines = () => {
  const [searchWord, setSearchWord] = useState("");
  const { pet, getPet, isLoaded, petChange } = useContext(PetContext);
  const router = useRouter();

  const { id: pet_id } = router.query;

  useEffect(() => {
    if (pet_id!==undefined) {
    getPet(Number(pet_id));
    }
    return () => {
      petChange();
    };
  }, [pet_id]);

  const filteredOptions = pet?.medicine!.filter(
    (medicine) => medicine.name.toLowerCase().includes(searchWord.toLowerCase()) || !searchWord,
  );

  if (isLoaded && pet?.name) {
    return (
      <CardList
        title={`Lista de las medicinas de ${pet?.name}`}
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
                    medicineType={medicine.medicineType?.name}
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
