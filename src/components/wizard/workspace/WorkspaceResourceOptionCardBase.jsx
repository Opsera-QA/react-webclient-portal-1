import PropTypes from "prop-types";
import React from "react";
import SelectionIconCard from "components/common/card_containers/SelectionIconCard";
import TaskCardFooter from "temp-library-components/cards/tasks/TaskCardFooter";
import PipelineCardFooter from "temp-library-components/cards/pipelines/PipelineCardFooter";
import useComponentStateReference from "hooks/useComponentStateReference";
import CardIconTitleBar from "components/common/fields/title/CardIconTitleBar";
import ToolCardFooter from "temp-library-components/cards/tools/ToolCardFooter";
import {faDraftingCompass, faTasks, faTools} from "@fortawesome/pro-light-svg-icons";

export const WORKSPACE_RESOURCE_TYPES = {
  PIPELINE: "pipeline",
  TASK: "task",
  TOOL: "tool",
};

export const WORKSPACE_RESOURCE_TYPE_LABELS = {
  PIPELINE: "Pipeline",
  TASK: "Task",
  TOOL: "Tool Registry",
};

export default function WorkspaceResourceOptionCardBase(
  {
    title,
    subTitle,
    description,
    onClickFunction,
    tooltip,
    selectedOption,
    option,
    disabled,
    warningMessage,
    children,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getTitleBar = () => {
    return (
      <CardIconTitleBar
        icon={getIconForWorkspaceResourceType()}
        iconColor={getHighlightedBorderColorForWorkspaceResourceType()}
        title={title}
        subTitle={subTitle}
        titleClassName={"px-1 mx-auto"}
        subTitleClassName={"px-1 mx-auto"}
        iconSize={"4x"}
      />
    );
  };

  const getDescription = () => {
    if (description) {
      return (
        <div className={"my-3"}>
          <div className={"small pl-1"}>
            {description}
          </div>
        </div>
      );
    }
  };

  const getIconForWorkspaceResourceType = () => {
    switch (option) {
      case WORKSPACE_RESOURCE_TYPES.TASK:
        return faTasks;
      case WORKSPACE_RESOURCE_TYPES.PIPELINE:
        return faDraftingCompass;
      case WORKSPACE_RESOURCE_TYPES.TOOL:
        return faTools;
    }
  };

  const getCardFooterForWorkspaceResourceType = () => {
    switch (option) {
      case WORKSPACE_RESOURCE_TYPES.TASK:
        return <TaskCardFooter />;
      case WORKSPACE_RESOURCE_TYPES.PIPELINE:
        return <PipelineCardFooter />;
      case WORKSPACE_RESOURCE_TYPES.TOOL:
        return <ToolCardFooter />;
    }
  };

  const getHighlightedBorderColorForWorkspaceResourceType = () => {
    switch (option) {
      case WORKSPACE_RESOURCE_TYPES.TASK:
        return themeConstants.RESOURCE_COLORS.TASKS;
      case WORKSPACE_RESOURCE_TYPES.PIPELINE:
        return themeConstants.RESOURCE_COLORS.PIPELINES;
      case WORKSPACE_RESOURCE_TYPES.TOOL:
        return themeConstants.RESOURCE_COLORS.TOOLS;
    }
  };

  return (
    <SelectionIconCard
      cardFooter={getCardFooterForWorkspaceResourceType()}
      selectedOption={selectedOption}
      option={option}
      titleBar={getTitleBar()}
      contentBody={getDescription()}
      onClickFunction={onClickFunction}
      disabled={disabled}
      tooltip={tooltip}
      warningMessage={warningMessage}
      highlightedBorderColor={getHighlightedBorderColorForWorkspaceResourceType()}
    >
      {children}
    </SelectionIconCard>
  );
}

WorkspaceResourceOptionCardBase.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
  iconColor: PropTypes.string,
  selectedOption: PropTypes.any,
  option: PropTypes.any,
  warningMessage: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.any,
};