import {
  CardContent,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { PetContext } from "../../../../../../context/pet/PetContext";
import SearchIcon from "@mui/icons-material/Search";
import { CardMedicine } from "./CardMedicine";
import { useRouter } from "next/router";

export const TabMedicine = () => {
  const [searchWord, setSearchWord] = useState("");
  const { pet, getPet } = useContext(PetContext);
  const [petId, setPetId] = useState(pet?.id);
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getPet(id);
    setPetId(pet?.id);
  }, [id]);

  const filteredOptions = pet?.medicine!.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchWord.toLowerCase()) ||
      !searchWord,
  );

  if (petId !== pet?.id) {
    return (
      <CardContent>
        <Grid container spacing={2}>
          <Grid
            container
            sx={{ mt: 2 }}
            direction="column"
            alignItems={"center"}
          >
            <Grid item>
              <TextField
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 4 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearchWord(e.target.value)}
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
                    id={medicine.id}
                    name={medicine.name}
                    image={medicine.image}
                    manufacturer={medicine.manufacturer}
                    application_date={medicine.application_date}
                    production_date={medicine.production_date}
                    expiration_date={medicine.expiration_date}
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
