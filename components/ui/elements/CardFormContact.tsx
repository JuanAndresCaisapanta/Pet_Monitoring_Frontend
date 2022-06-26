import { LoadingButton } from "@mui/lab";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { FC, FormEventHandler, ReactNode } from "react";

interface Props {
  title: string;
  submit: FormEventHandler<HTMLFormElement> | undefined;
  isLoading: boolean;
  startIcon: ReactNode;
  textLoadingButton: string;
  clearForm: () => void;
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
  leftContent,
  rightContent,
}) => {
  return (
    <Card>
      <CardHeader title={title} titleTypographyProps={{ variant: "body1", color: "#3A3541DE" }} />
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
