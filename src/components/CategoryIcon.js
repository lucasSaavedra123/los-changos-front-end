import React from "react";
import * as Icons from "@mui/icons-material"


export default ({ name }) => {
  const IconComponent = Icons[name];
  return <h1><IconComponent /></h1>;
};
