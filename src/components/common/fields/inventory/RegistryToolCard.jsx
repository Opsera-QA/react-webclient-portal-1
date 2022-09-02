import React from "react";
import PropTypes from "prop-types";
import ToolCardBase from "temp-library-components/cards/tools/ToolCardBase";
import { useHistory } from "react-router-dom";

export default function RegistryToolCard({ toolModel }) {
  const history = useHistory();

  const onClickFunction = (toolId) => {
    history.push(`/inventory/tools/details/${toolId}/summary`);
  };

  return (
    <ToolCardBase
      toolModel={toolModel}
      tooltip={"Click to view Tool"}
      onClickFunction={onClickFunction}
    />
  );
}

RegistryToolCard.propTypes = {
  toolModel: PropTypes.object,
};
