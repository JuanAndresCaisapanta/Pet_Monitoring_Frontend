import { FC } from "react";

import { CardContent, Divider, Grid, TextField, Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";

interface Props {
  handleSubmit: any;
  handleClearForm: any;
  register: any;
  errors: any;
  renderCell: any;
  id: number;
  isLoading: boolean;
  rows: any;
}

export const TabAdminType: FC<Props> = ({
  handleSubmit,
  handleClearForm,
  register,
  errors,
  renderCell,
  id,
  isLoading,
  rows,
}) => {
  const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z]+$/;

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "name",
      headerName: "Nombre Completo",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 100,
      renderCell: renderCell,
    },
  ];

  return (
    <>
      <CardContent>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              {id !== 0 ? (
                <TextField fullWidth type="number" label="Id" placeholder="Id" disabled value={id} />
              ) : (
                <></>
              )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Nombre"
                placeholder="Nombre"
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Solo se permiten letras",
                  },
                })}
                onKeyDown={(event) => {
                  if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                InputLabelProps={{ shrink: true }}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={isLoading}
              />
            </Grid>
            <Grid item container direction="row" alignItems="center" justifyContent="center" xs={4}>
              <LoadingButton
                variant="contained"
                color="primary"
                disableElevation
                type="submit"
                sx={{ marginRight: 2 }}
                startIcon={<SaveIcon />}
                loading={isLoading}
                loadingPosition="start"
              >
                Guardar
              </LoadingButton>
              <Button
                disableElevation
                variant="outlined"
                color="secondary"
                onClick={handleClearForm}
                disabled={isLoading}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <Box
          sx={{
            width: "100%",
            "& .header": {
              backgroundColor: "#9E69FD",
              color: "#fff",
            },
          }}
        >
          <Grid container className="fadeIn">
            <Grid item xs={12} sx={{ width: "100%" }}>
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </>
  );
};
