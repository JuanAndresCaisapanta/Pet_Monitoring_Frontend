// ** MUI Imports
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  image: string;
  section: string;
  description: string;
  link: string;
}

export const CardSection: FC<Props> = ({
  image,
  section,
  description,
  link,
}) => {
  const router = useRouter();
  const navigateTo = (url: string) => {
    router.push(url);
  };
  return (
    <Card>
      <CardMedia sx={{ height: "9.375rem" }} image={image} />
      <CardContent
        sx={{ padding: (theme) => `${theme.spacing(3, 5.25, 4)} !important` }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {section}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <Button
        variant="contained"
        onClick={() => navigateTo(`${link}`)}
        sx={{
          py: 1,
          width: "100%",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        Visitar
      </Button>
    </Card>
  );
};
