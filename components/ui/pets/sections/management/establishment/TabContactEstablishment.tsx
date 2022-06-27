import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Grid, Typography, TextField, SelectChangeEvent } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { AuthContext, EstablishmentContext } from "../../../../../../context";
import { CardFormContact, SelectFormId } from "../../../../elements";
import { contactProfessional } from "../../../../../../data";

type FormData = {
  contact: number | "";
  message: string;
};

export const TabContactEstablishment = () => {
  const [establishmentName, setEstablishmentName] = useState("");
  const [messageDefault, setMessageDefault] = useState("");
  const [listContact, setListContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const router = useRouter();

  const { id: establishment_id } = router.query;

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
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const message = `Saludos ${establishment?.name}, \nSoy ${user?.name} ${
    user?.last_name
  } quisiera separar una cita para mi ${establishment?.pet.breed.species.name.toLowerCase()} ${
    establishment?.pet.breed.name
  } ${establishment?.pet.name},\nMi número de celular es: ${user?.phone}\nEspero su respuesta excelente día.`;

  const moniopet = `Mensaje enviado através de MonIOpeT.`;

  useEffect(() => {
    if (establishment_id !== undefined) {
      getEstablishment(Number(establishment_id));
    }
    return () => {
      clearEstablishment();
    };
  }, [establishment_id]);

  useEffect(() => {
    if (establishment) {
      setEstablishmentName(establishment.name);
      setMessageDefault(message);
      setValue("message", message);
    }
  }, [establishment]);

  const handleSendEmail = async ({ message }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await sendEmail(
      establishment?.email!,
      user?.email!,
      `Mensaje para ${establishment?.name}}`,
      message + `\n\n ${moniopet}`,
    );
    if (isComplete) {
      setIsLoading(false);
    }
  };

  const handleSendWhatsapp = async ({ message }: FormData) => {
    window.open(`https://wa.me/${establishment?.cell_phone}/?text=${message}`);
  };

  const handleClearForm = () => {
    setListContact("");
    setValue("contact", "");
    setMessageDefault(message);
    setValue("message", message);
  };

  if (isEstablishmentLoaded && establishment) {
    return (
      <CardFormContact
        title={`Contactar a ${establishmentName} `}
        submit={handleSubmit(
          listContact == "1" ? handleSendEmail : listContact == "2" ? handleSendWhatsapp : () => {},
        )}
        router={() => router.back()}
        isLoading={isLoading}
        startIcon={<Send />}
        textLoadingButton={"Enviar"}
        clearForm={handleClearForm}
        leftContent={
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <SelectFormId
                label="Medio de contacto"
                name="contact"
                value={listContact}
                onChange={(event: SelectChangeEvent) => setListContact(event.target.value)}
                object={contactProfessional}
                register={register}
                error={!!errors.contact}
                helperText={errors.contact?.message}
                disabled={isLoading}
              />
            </Grid>
          </Grid>
        }
        rightContent={
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                multiline
                value={messageDefault}
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
                disabled={isLoading}
              />
            </Grid>
          </Grid>
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
