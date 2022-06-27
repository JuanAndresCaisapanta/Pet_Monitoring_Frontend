import { FC, FormEventHandler, ReactNode } from "react";

import { NavigateBefore } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton } from "@mui/material";

interface Props {
  title: string;
  router: () => void;
  submit: FormEventHandler<HTMLFormElement> | undefined;
  clearForm: () => void;
  isLoading: boolean;
  encType?: string;
  textLoadingButton: string;
  startIcon: ReactNode;
  leftContent: ReactNode;
  rightContent: ReactNode;
}

export const CardForm: FC<Props> = ({
  title,
  router,
  submit,
  clearForm,
  isLoading,
  encType,
  startIcon,
  textLoadingButton,
  leftContent,
  rightContent,
}) => {
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
      <form noValidate autoComplete="off" onSubmit={submit} encType={encType}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {leftContent}
            </Grid>
            <Grid item xs={12} md={6}>
              {rightContent}
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions sx={{ padding: "16px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <LoadingButton
                variant="contained"
                color="primary"
                sx={{ marginRight: 2 }}
                disableElevation
                type="submit"
                startIcon={startIcon}
                loading={isLoading}
                loadingPosition="start"
              >
                {textLoadingButton}
              </LoadingButton>
              <Button
                disableElevation
                variant="outlined"
                color="secondary"
                onClick={clearForm}
                disabled={isLoading}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </form>
    </Card>
  );
};
