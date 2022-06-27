import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Grid, Typography, TextField, SelectChangeEvent } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { ProfessionalContext, AuthContext } from "../../../../../../context";
import { CardFormContact, SelectFormId } from "../../../../elements";
import { contactProfessional } from "../../../../../../data";

type FormData = {
  contact: number | "";
  message: string;
};

export const TabContactProfessional = () => {
  const [professionalName, setProfessionalName] = useState("");
  const [professionalLastName, setProfessionalLastName] = useState("");
  const [messageDefault, setMessageDefault] = useState("");
  const [listContact, setListContact] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const router = useRouter();

  const { id: professional_id } = router.query;

  const {
    professional,
    getProfessional,
    clearProfessional,
    sendEmail,
    isLoaded: isProfessionalLoaded,
  } = useContext(ProfessionalContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const message = `Saludos ${professional?.name} ${professional?.last_name},\nSoy ${user?.name} ${
    user?.last_name
  } quisiera separar una cita para mi ${professional?.pet.breed.species.name.toLowerCase()} ${
    professional?.pet.breed.name
  } ${professional?.pet.name},\nMi número de celular es: ${user?.phone}\nEspero su respuesta excelente día.`;

  const moniopet = `Mensaje enviado através de MonIOpeT.`;

  useEffect(() => {
    if (professional_id !== undefined) {
      getProfessional(Number(professional_id));
    }
    return () => {
      clearProfessional();
    };
  }, [professional_id]);

  useEffect(() => {
    if (professional) {
      setProfessionalName(professional.name);
      setProfessionalLastName(professional.last_name);
      setMessageDefault(message);
      setValue("message", message);
    }
  }, [professional]);

  const handleSendEmail = async ({ message }: FormData) => {
    setIsLoading(true);
    const { isComplete } = await sendEmail(
      professional?.email!,
      user?.email!,
      `Mensaje para ${professional?.name} ${professional?.last_name}`,
      message + `\n\n ${moniopet}`,
    );
    if (isComplete) {
      setIsLoading(false);
    }
  };

  const handleSendWhatsapp = async ({ message }: FormData) => {
    window.open(`https://wa.me/${professional?.cell_phone}/?text=${message}`);
  };

  const handleClearForm = () => {
    setListContact("");
    setValue("contact", "");
    setMessageDefault(message);
    setValue("message", message);
  };

  if (isProfessionalLoaded && professional) {
    return (
      <CardFormContact
        title={`Contactar a ${professionalName} ${professionalLastName}`}
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
