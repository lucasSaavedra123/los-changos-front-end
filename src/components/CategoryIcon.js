import React from "react";
import * as Icons from "@mui/icons-material"


export default (props) => {
  const IconComponent = Icons[props.name];
  return <IconComponent style={{color: props.color}} sx={{fontSize: props.size}}/>;
};
