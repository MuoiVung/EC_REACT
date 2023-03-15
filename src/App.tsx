import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { CommonForm, Cookies, TabPanel } from "./components";
import ReactHookForm from "./components/ReactHookForm";

import { TabsValueType } from "./types";

const TABS_VALUES = {
  COOKIE: "COOKIE",
  COMMON_FORM: "COMMON_FORM",
  REACT_HOOK_FORM: "REACT_HOOK_FORM",
};

export default function App() {
  const [tabsValue, setTabsValue] = useState<TabsValueType>(
    TABS_VALUES.COOKIE as TabsValueType
  );

  const handleTabChange = (event: SyntheticEvent, newValue: TabsValueType) => {
    setTabsValue(newValue);
  };

  return (
    <div className="App">
      <Box width="100%">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabsValue} onChange={handleTabChange}>
            <Tab value={TABS_VALUES.COOKIE} label="Cookie" />
            <Tab value={TABS_VALUES.COMMON_FORM} label="Common Form" />
            <Tab value={TABS_VALUES.REACT_HOOK_FORM} label="React Hook Form" />
          </Tabs>
        </Box>
        <TabPanel value={TABS_VALUES.COOKIE} tabsValue={tabsValue}>
          <Cookies />
        </TabPanel>
        <TabPanel value={TABS_VALUES.COMMON_FORM} tabsValue={tabsValue}>
          <CommonForm />
        </TabPanel>
        <TabPanel value={TABS_VALUES.REACT_HOOK_FORM} tabsValue={tabsValue}>
          <ReactHookForm />
        </TabPanel>
      </Box>
    </div>
  );
}
