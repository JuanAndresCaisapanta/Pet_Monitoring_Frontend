import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import {
  CardContent,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Swal from "sweetalert2";

import { PetContext, ProfessionalContext } from "../../../../../../context";
import { CardProfessional } from "./CardProfessional";

export const TabListProfessionals = () => {
  const [searchWord, setSearchWord] = useState("");
  const { pet, getPet, isLoaded, petChange } = useContext(PetContext);
  const { deleteProfessional } = useContext(ProfessionalContext);
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getPet(id);
    return () => {
      petChange();
    };
  }, [id]);

  const professionals = pet?.professional;

  const filteredOptions = professionals?.filter(
    (professional) =>
      professional.name.toLowerCase().includes(searchWord.toLowerCase()) ||
      !searchWord,
  );

  if (isLoaded) {
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
              .map((professional) => (
                <Grid item xs={12} sm={4} key={professional.id}>
                  <CardProfessional
                    id={professional.id}
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
