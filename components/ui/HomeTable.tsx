import {
  Box,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface RowType {
  age: number;
  name: string;
  date: string;
  email: string;
  salary: string;
  status: string;
  designation: string;
}

interface StatusObj {
  [key: string]: {
    color: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  };
}

const rows: RowType[] = [
  {
    age: 27,
    status: "Activo",
    date: "09/27/2018",
    name: "Boby",
    salary: "$19586.23",
    email: "eebsworth2m@sbwire.com",
    designation: "Human Resources Assistant",
  },
  {
    age: 61,
    date: "09/23/2016",
    salary: "$23896.35",
    status: "Activo",
    name: "Pelusa",
    email: "kocrevy0@thetimes.co.uk",
    designation: "Nuclear Power Engineer",
  },
  {
    age: 59,
    date: "10/15/2017",
    name: "Manchas",
    status: "Activo",
    salary: "$18991.67",
    email: "ediehn6@163.com",
    designation: "Environmental Specialist",
  },
  {
    age: 30,
    date: "06/12/2018",
    status: "Inactivo",
    salary: "$19252.12",
    name: "Canela",
    email: "dfalloona@ifeng.com",
    designation: "Sales Representative",
  },
  {
    age: 66,
    status: "Inactivo",
    date: "03/24/2018",
    salary: "$13076.28",
    name: "Toby",
    designation: "Operator",
    email: "sganderton2@tuttocitta.it",
  },
  {
    age: 33,
    date: "08/25/2017",
    salary: "$10909.52",
    name: "Maria",
    status: "Activo",
    email: "hnisius4@gnu.org",
    designation: "Senior Cost Accountant",
  },
  {
    age: 61,
    status: "Inactivo",
    date: "06/01/2017",
    salary: "$17803.80",
    name: "Princesa",
    designation: "Geologist",
    email: "ghoneywood5@narod.ru",
  },
  {
    age: 22,
    date: "12/03/2017",
    salary: "$12336.17",
    name: "Vikingo",
    status: "Activo",
    designation: "Cost Accountant",
    email: "dcrossman3@google.co.jp",
  },
];

const statusObj: StatusObj = {
  // applied: { color: "info" },
  // rejected: { color: "error" },
  // current: { color: "primary" },
  Inactivo: { color: "warning" },
  Activo: { color: "success" },
};

export const HomeTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth:300 }} size='medium' aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell >Mascota</TableCell>
              <TableCell >Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: RowType) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
              >
                <TableCell
                  sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}
                    >
                      {row.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell >
                  <Chip
                    label={row.status}
                    color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: "0.75rem",
                      textTransform: "capitalize",
                      "& .MuiChip-label": { fontWeight: 500 },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
