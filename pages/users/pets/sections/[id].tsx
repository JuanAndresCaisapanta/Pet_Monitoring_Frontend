import { ReactElement, SyntheticEvent, useState } from "react";

import { useRouter } from "next/router";

import { Box, Card } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { styled } from "@mui/material/styles";
import MuiTab, { TabProps } from "@mui/material/Tab";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";

import { TabMonitoring } from "../../../../components/ui";
import { MainLayout } from "../../../../components/layout";

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
const SectionsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [value, setValue] = useState<string>("sections");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="sections-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="sections"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PetsOutlinedIcon />
                <TabName>Secciones</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="sections">
          <TabMonitoring id={id} />
        </TabPanel>
      </TabContext>
    </Card>
  );
};
SectionsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout
      title={"Secciones de tu mascota"}
      pageDescription={"En esta sección podras ver las opciones para monitorear a tu mascota"}
    >
      {page}
    </MainLayout>
  );
};
export default SectionsPage;
