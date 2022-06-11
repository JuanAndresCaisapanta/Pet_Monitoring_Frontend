import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import {
  CardContent,
  Grid,
  Typography,
  TextField,
  CardActions,
  Card,
  Button,
  CardHeader,
  Divider,
  SelectChangeEvent,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { ProfessionalContext, AuthContext } from "../../../../../../context";
import { SelectFormId } from "../../../../elements";
import { contactProfessional } from "../../../../../../data";
import { EstablishmentContext } from '../../../../../../context/establishment/EstablishmentContext';

type FormData = {
  contact: number;
  message: string;
};

export const TabContactEstablishment = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectContact, setSelectContact] = useState(``);
  const { user } = useContext(AuthContext);

  const {
    establishment,
    getEstablishment,
    clearEstablishment,
    sendEmail,
    isLoaded: isEstablishmentLoaded,
  } = useContext(EstablishmentContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (id !== undefined) {
      getEstablishment(Number(id));
    }
    return () => {
      clearEstablishment();
    };
  }, [id]);

  const onSendEmail = async ({ message }: FormData) => {
    const { hasError, message: errorMessage } = await sendEmail(
      establishment?.email!,
      user?.email!,
      `Mensaje para ${establishment?.name}`,
      message,
    );
  };

  const onSendWhatsapp = async ({ message }: FormData) => {
    window.open(`https://wa.me/${establishment?.cell_phone}/?text=${message}`);
  };

  if (isEstablishmentLoaded) {
    return (
      <Card>
        <CardHeader
          title={`Contactar a ${establishment?.name}`}
          titleTypographyProps={{ variant: "body1", color: "#3A3541DE" }}
        />
        <Divider sx={{ margin: 0 }} />
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(
            selectContact == "1"
              ? onSendEmail
              : selectContact == "2"
              ? onSendWhatsapp
              : () => {},
          )}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <SelectFormId
                      label="Medio de contacto"
                      name="contact"
                      value={selectContact}
                      onChange={(event: SelectChangeEvent) =>
                        setSelectContact(event.target.value)
                      }
                      object={contactProfessional}
                      register={register}
                      error={!!errors.contact}
                      helperText={errors.contact?.message}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      multiline
                      defaultValue={` Saludos ${establishment?.name}\n Soy ${user?.name} ${
                        user?.last_name
                      } quisiera separar una cita para mi ${establishment?.pet.breed.species.name.toLowerCase()} ${
                        establishment?.pet.breed.name
                      } ${establishment?.pet.name},\n Mi número de celular es: ${
                        user?.phone
                      }\n Espero su respuesta excelente día.\n\n Mensaje enviado através de MonIOpeT.`}
                      rows={8}
                      type="text"
                      label="Mensaje"
                      placeholder="Mensaje"
                      {...register("message", {
                        required: "Este campo es requerido",
                        minLength: { value: 2, message: "Mínimo 2 caracteres" },
                      })}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions sx={{ padding: "16px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: 2 }}
                  disableElevation
                  type="submit"
                  startIcon={<Send />}
                >
                  Enviar
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => router.reload()}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </form>
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
