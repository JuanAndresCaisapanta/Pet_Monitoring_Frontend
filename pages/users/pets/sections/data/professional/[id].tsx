import { SyntheticEvent, useState, ReactElement } from "react";

import { Box, Card, styled } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import MuiTab, { TabProps } from "@mui/material/Tab";

import { HailOutlined, AddCircleOutlineOutlined } from "@mui/icons-material";

import { TabListProfessionals, MainLayout, TabAddProfessional } from "../../../../../../components";

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

const ProfessionalsPage = () => {
  const [value, setValue] = useState<string>("professionals");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="professionals-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="professionals"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <HailOutlined />
                <TabName>Profesionales</TabName>
              </Box>
            }
          />
          <Tab
            value="add-professionals"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AddCircleOutlineOutlined />
                <TabName>Agregar</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="professionals">
          <TabListProfessionals />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="add-professionals">
          <TabAddProfessional/>
        </TabPanel>
      </TabContext>
    </Card>
  );
};

ProfessionalsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Profesionales"}
      pageDescription={"Aqui se puede revisar los profesionales de tu mascota"}
    >
      {page}
    </MainLayout>
  );
};

export default ProfessionalsPage;
