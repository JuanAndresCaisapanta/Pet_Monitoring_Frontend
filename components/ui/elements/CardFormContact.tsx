import { FC, FormEventHandler, ReactNode } from "react";

import { NavigateBefore } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton } from "@mui/material";

interface Props {
  title: string;
  submit: FormEventHandler<HTMLFormElement> | undefined;
  isLoading: boolean;
  startIcon: ReactNode;
  textLoadingButton: string;
  clearForm: () => void;
  router: () => void;
  leftContent: ReactNode;
  rightContent: ReactNode;
}
export const CardFormContact: FC<Props> = ({
  title,
  submit,
  isLoading,
  startIcon,
  textLoadingButton,
  clearForm,
  router,
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
      <form noValidate autoComplete="off" onSubmit={submit}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              {leftContent}
            </Grid>
            <Grid item xs={12} md={8}>
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
