import { Box } from "@mui/material";
import React, { ReactNode } from "react";

type PropsType = {
  children?: ReactNode;
  value: string;
  tabsValue: string;
};

const TabPanel = ({ children, tabsValue, value }: PropsType) => {
  return (
    <div role="tabpanel" hidden={value !== tabsValue}>
      {value === tabsValue && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
