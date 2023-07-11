import PropTypes from "prop-types";
import React from "react";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import TaskCardFooter from "temp-library-components/cards/tasks/TaskCardFooter";
import PipelineCardFooter from "temp-library-components/cards/pipelines/PipelineCardFooter";
import useComponentStateReference from "hooks/useComponentStateReference";
import ToolCardFooter from "temp-library-components/cards/tools/ToolCardFooter";
import PipelineTemplateCardFooter from "../../../../../temp-library-components/cards/templates/pipelines/PipelineTemplateCardFooter";

export const WORKFLOW_OPTION_TYPES = {
  PIPELINE: "pipeline",
  PIPELINE_TEMPLATE: "pipeline_template",
  TASK: "task",
  TOOL: "tool",
};

export default function WorkflowOptionCardBase(
  {
    icon,
    iconColor,
    title,
    subTitle,
    description,
    onClickFunction,
    tooltip,
    selectedOption,
    option,
    workflowOptionType,
    disabled,
    warningMessage,
    children,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getTitleBar = () => {
    return (
      <IconTitleBar
        icon={icon}
        iconColor={iconColor}
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

  const getCardFooterForWorkflowOptionType = () => {
    switch (workflowOptionType) {
      case WORKFLOW_OPTION_TYPES.PIPELINE:
        return <PipelineCardFooter />;
      case WORKFLOW_OPTION_TYPES.PIPELINE_TEMPLATE:
        return <PipelineTemplateCardFooter />;
      case WORKFLOW_OPTION_TYPES.TASK:
        return <TaskCardFooter />;
      case WORKFLOW_OPTION_TYPES.TOOL:
        return <ToolCardFooter />;
    }
  };

  const getHighlightedBorderColorForWorkflowOptionType = () => {
    switch (workflowOptionType) {
      case WORKFLOW_OPTION_TYPES.TASK:
        return themeConstants.COLOR_PALETTE.SALESFORCE_BLUE;
      case WORKFLOW_OPTION_TYPES.PIPELINE:
        return themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE;
      case WORKFLOW_OPTION_TYPES.PIPELINE_TEMPLATE:
        return themeConstants.RESOURCE_COLORS.PIPELINES;
      case WORKFLOW_OPTION_TYPES.TOOL:
        return themeConstants.RESOURCE_COLORS.TOOLS;
    }
  };

  return (
    <SelectionIconCardBase
      cardFooter={getCardFooterForWorkflowOptionType()}
      selectedOption={selectedOption}
      option={option}
      titleBar={getTitleBar()}
      contentBody={getDescription()}
      onClickFunction={onClickFunction}
      disabled={disabled}
      tooltip={tooltip}
      warningMessage={warningMessage}
      highlightedBorderColor={getHighlightedBorderColorForWorkflowOptionType()}
    >
      {children}
    </SelectionIconCardBase>
  );
}

WorkflowOptionCardBase.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
  iconColor: PropTypes.string,
  selectedOption: PropTypes.any,
  option: PropTypes.any,
  workflowOptionType: PropTypes.string,
  warningMessage: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.any,
};