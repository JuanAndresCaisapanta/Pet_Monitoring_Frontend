import { SyntheticEvent, useState, ReactElement } from "react";

import { Box, Card, styled } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import MuiTab, { TabProps } from "@mui/material/Tab";

import {
  HomeWorkOutlined,
  AddCircleOutlineOutlined,
} from "@mui/icons-material";

import { TabEstablishment, MainLayout } from "../../../../../../components";

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

const EstablishmentPage = () => {
  const [value, setValue] = useState<string>("establishments");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="establishments-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="establishments"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <HomeWorkOutlined />
                <TabName>Establecimientos</TabName>
              </Box>
            }
          />
          <Tab
            value="add-establishments"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AddCircleOutlineOutlined />
                <TabName>Agregar</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="establishments">
          <TabEstablishment />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="add-establishments"></TabPanel>
      </TabContext>
    </Card>
  );
};
EstablishmentPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Esblecimientos"}
      pageDescription={
        "Aqui se puede revisar los establecimientos de tu mascota"
      }
    >
      {page}
    </MainLayout>
  );
};
export default EstablishmentPage;
