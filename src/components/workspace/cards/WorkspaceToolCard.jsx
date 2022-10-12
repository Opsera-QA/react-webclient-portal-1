import PropTypes from "prop-types";
import React from "react";
import modelHelpers from "components/common/model/modelHelpers";
import { useHistory } from "react-router-dom";
import ToolCardBase from "temp-library-components/cards/tools/ToolCardBase";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";

export default function WorkspaceToolCard(
  {
    tool,
  }) {
  const history = useHistory();

  const viewToolFunction = (toolId) => {
    history.push(`/inventory/tools/details/${toolId}/summary`);
  };

  return (
    <ToolCardBase
      toolModel={modelHelpers.parseObjectIntoModel(tool, registryToolMetadata)}
      onClickFunction={() => viewToolFunction(tool?._id)}
      tooltip={"Click to view Tool"}
    />
  );
}

WorkspaceToolCard.propTypes = {
  tool: PropTypes.object,
  toolMetadata: PropTypes.object,
};