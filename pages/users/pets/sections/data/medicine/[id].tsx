import { SyntheticEvent, useState, ReactElement } from "react";

import { Box, Card, styled } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import MuiTab, { TabProps } from "@mui/material/Tab";
import { AddCircleOutline, Vaccines } from "@mui/icons-material";

import { TabListMedicines, MainLayout, TabAddMedicine } from "../../../../../../components";

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 100,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 67,
  },
}));

const TabName = styled("span")(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: "0.8rem",
  marginLeft: theme.spacing(2.4),
}));

const MedicinePage = () => {
  const [value, setValue] = useState<string>("medicines");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="medicines-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="medicines"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Vaccines />
                <TabName>Medicinas</TabName>
              </Box>
            }
          />
          <Tab
            value="add-medicines"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AddCircleOutline />
                <TabName>Agregar</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="medicines">
          <TabListMedicines />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="add-medicines">
          <TabAddMedicine />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

MedicinePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title={"Medicinas"} pageDescription={"Aqui se puede revisar los medicamentos de tu mascota"}>
      {page}
    </MainLayout>
  );
};

export default MedicinePage;
