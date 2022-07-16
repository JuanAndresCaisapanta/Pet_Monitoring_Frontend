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
  isLoading: boolean;
  rows: any;
  regex: any;
}

export const TabAdminType: FC<Props> = ({
  handleSubmit,
  handleClearForm,
  register,
  errors,
  renderCell,
  isLoading,
  rows,
  regex,
}) => {
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
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Nombre"
                placeholder="Nombre"
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  pattern: {
                    value: regex,
                    message: "Solo se permiten letras",
                  },
                })}
                onKeyDown={(event) => {
                  if (!regex.test(event.key)) {
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
