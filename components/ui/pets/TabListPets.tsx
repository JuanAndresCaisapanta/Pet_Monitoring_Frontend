import { useContext, useState } from "react";

import {
  Grid,
  CardContent,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { CardPet } from "./CardPet";
import { AuthContext } from "../../../context";

export const TabListPets = () => {
  const [searchWord, setSearchWord] = useState("");
  const { user } = useContext(AuthContext);

  const filteredOptions = user?.pet!.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchWord.toLowerCase()) || !searchWord,
  );

  if (user?.pet) {
    return (
      <CardContent>
        <Grid container spacing={2} justifyContent={"center"}>
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
              .map((pet) => (
                <Grid item xs={12} sm={6} key={pet.id} >
                  <CardPet
                    id={pet.id}
                    image={pet.image}
                    name={pet.name}
                    sex={pet.sex}
                    race={pet.breed.name}
                    species={pet.breed.species.name}
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
          <Typography color={"primary"} sx={{ mt: 1 }}>Cargando...</Typography>
        </Grid>
      </Grid>
    );
  }
};
