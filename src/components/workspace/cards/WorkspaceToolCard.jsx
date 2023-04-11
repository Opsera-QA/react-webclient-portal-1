import PropTypes from "prop-types";
import React from "react";
import modelHelpers from "components/common/model/modelHelpers";
import { useHistory } from "react-router-dom";
import ToolCardBase from "temp-library-components/cards/tools/ToolCardBase";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";
import {workspaceHelper} from "components/workspace/workspace.helper";

export default function WorkspaceToolCard(
  {
    tool,
  }) {
  const history = useHistory();

  const viewToolFunction = () => {
    history.push(workspaceHelper.getWorkspaceItemDetailLink(tool));
  };

  return (
    <ToolCardBase
      toolModel={modelHelpers.parseObjectIntoModel(tool, registryToolMetadata)}
      onClickFunction={() => viewToolFunction()}
      tooltip={"Click to view Tool"}
    />
  );
}

WorkspaceToolCard.propTypes = {
  tool: PropTypes.object,
};