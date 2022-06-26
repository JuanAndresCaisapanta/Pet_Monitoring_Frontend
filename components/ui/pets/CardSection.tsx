import { FC } from "react";

import { useRouter } from "next/router";

import { Card, Button, CardMedia, Typography, CardContent, CardActions } from "@mui/material";

interface Props {
  image: string;
  section: string;
  description: string;
  link: string;
  button: string;
}

export const CardSection: FC<Props> = ({ image, section, description, button, link }) => {
  const router = useRouter();
  const navigateTo = (url: string) => {
    router.push(url);
  };
  return (
    <Card>
      <CardMedia sx={{ height: "7rem" }} image={image} />
      <CardContent sx={{ padding: (theme) => `${theme.spacing(1, 2, 1)} !important` }}>
        <Typography variant="h6">{section}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          disableElevation
          onClick={() => navigateTo(`${link}`)}
          sx={{
            width: "100%",
          }}
        >
          {button}
        </Button>
      </CardActions>
    </Card>
  );
};
