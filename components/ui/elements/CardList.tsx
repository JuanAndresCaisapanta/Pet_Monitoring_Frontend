import { FC } from "react";

import { NavigateBefore, Search } from "@mui/icons-material";

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";


interface Props {
  title: string;
  router: () => void;
  onChange: (event: any) => any;
  filterCard: any;
}

export const CardList: FC<Props> = ({ title, router, onChange, filterCard }) => {
  return (
    <Card>
      <CardHeader
        sx={{ paddingTop: "4px", paddingBottom: "4px" }}
        title={title}
        titleTypographyProps={{ variant: "body1" }}
        action={
          <IconButton aria-label="close" onClick={router} style={{ color: "#9E69FD" }}>
            <NavigateBefore />
          </IconButton>
        }
      />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid container sx={{ mt: 2 }} direction="column" alignItems={"center"}>
            <Grid item>
              <TextField
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 4 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                onChange={onChange}
                placeholder={"Buscar"}
              />
            </Grid>
          </Grid>
          {filterCard}
        </Grid>
      </CardContent>
    </Card>
  );
};
