import { useContext } from "react";

import { Box, Card } from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";

import { AuthContext } from "../../../context";

const columns: GridColDef[] = [
  {
    field: "pet_name",
    headerName: "Mascota",
    headerClassName: "header",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "device_code",
    headerName: "Dispositivo",
    headerClassName: "header",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 250,
  },
];

export const HomeTable = () => {
  const { user } = useContext(AuthContext);
  const rows: any = [];
  const rowsData = user?.device?.map((data) =>
    data.masterData.map((masterdata) => ({
      id: masterdata?.id as number,
      pet_name: masterdata?.pet.name as string,
      device_code: data.code as string,
    })),
  );

  rowsData?.forEach((element) => rows.push(element[0]));
  return (
    <Card>
      <Box
        sx={{
          width: "100%",
          "& .header": {
            backgroundColor: "#9E69FD",
            color: "#fff",
          },
        }}
      >
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </Card>
  );
};
