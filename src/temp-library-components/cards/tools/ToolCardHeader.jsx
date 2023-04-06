import React from "react";
import CardHeaderBase from "temp-library-components/cards/CardHeaderBase";
import PropTypes from "prop-types";

export default function ToolCardHeader(
  {
    toolModel,
  }) {
  return (
    <CardHeaderBase>
      <div />
    </CardHeaderBase>
  );
}

ToolCardHeader.propTypes = {
  toolModel: PropTypes.object,
};