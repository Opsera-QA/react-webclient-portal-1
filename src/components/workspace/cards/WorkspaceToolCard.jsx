import PropTypes from "prop-types";
import React from "react";
import modelHelpers from "components/common/model/modelHelpers";
import { useHistory } from "react-router-dom";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";
import {workspaceHelper} from "components/workspace/workspace.helper";
import ToolCreationFlowSelectionCardBase
  from "../../../temp-library-components/cards/tools/ToolCreationFlowSelectionCardBase";

export default function WorkspaceToolCard(
  {
    tool,
  }) {
  const history = useHistory();

  const viewToolFunction = () => {
    history.push(workspaceHelper.getWorkspaceItemDetailLink(tool));
  };

  return (
    <ToolCreationFlowSelectionCardBase
      toolModel={modelHelpers.parseObjectIntoModel(tool, registryToolMetadata)}
      onClickFunction={() => viewToolFunction()}
      tooltip={"Click to view Tool"}
    />
  );
}

WorkspaceToolCard.propTypes = {
  tool: PropTypes.object,
};