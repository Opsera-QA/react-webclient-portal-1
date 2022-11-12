import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

export default function ToolConnectionSummaryContainer(
  {
    children,
  }) {
  return (
    <div className={"mt-3"}>
      <H5FieldSubHeader
        subheaderText={"Connection Account Details"}
      />
      {children}
    </div>
  );
}

ToolConnectionSummaryContainer.propTypes = {
  children: PropTypes.any,
};