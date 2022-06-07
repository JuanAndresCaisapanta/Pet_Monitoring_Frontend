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

import { MedicineContext, PetContext } from "../../../../../../context";
import { CardMedicine } from "./CardMedicine";
import Swal from "sweetalert2";

export const TabMedicine = () => {
  const [searchWord, setSearchWord] = useState("");
  const { pet, getPet, isLoaded, petChange } = useContext(PetContext);
  const { deleteMedicine } = useContext(MedicineContext);
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getPet(id);
    return () => {
      petChange();
    };
  }, [id]);

  const filteredOptions = pet?.medicine!.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchWord.toLowerCase()) ||
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
                    onDelete={() =>
                      Swal.fire({
                        background: "#F4F5FA",
                        title: "¿Está seguro de borrar la Medicina?",
                        text: "No podrá revertir esta acción",
                        icon: "warning",
                        showCancelButton: true,
                        backdrop: false,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Si, Borrar",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteMedicine(medicine.id).then(() => {
                            Swal.fire({
                              background: "#F4F5FA",
                              title: "Listo",
                              text: "Medicina Borrada",
                              icon: "success",
                              confirmButtonText: "Ocultar",
                              backdrop: false,
                              timer: 1500,
                              timerProgressBar: true,
                              showConfirmButton: false,
                            });
                            getPet(id);
                          });
                        }
                      })
                    }
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
