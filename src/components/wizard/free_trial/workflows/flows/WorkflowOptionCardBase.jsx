import PropTypes from "prop-types";
import React from "react";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import TaskCardFooter from "temp-library-components/cards/tasks/TaskCardFooter";
import PipelineCardFooter from "temp-library-components/cards/pipelines/PipelineCardFooter";
import useComponentStateReference from "hooks/useComponentStateReference";

export const WORKFLOW_OPTION_TYPES = {
  PIPELINE: "pipeline",
  TASK: "task",
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
  }) {
  const { themeConstants } = useComponentStateReference();

  const getTitleBar = () => {
    return (
      <IconTitleBar
        icon={icon}
        iconColor={iconColor}
        title={title}
        subTitle={subTitle}
      />
    );
  };

  const getDescription = () => {
    return (
      <div className={"mt-3"}>
        <div className={"small pl-1"}>
          {description}
        </div>
      </div>
    );
  };

  const getCardFooterForWorkflowOptionType = () => {
    switch (workflowOptionType) {
      case WORKFLOW_OPTION_TYPES.TASK:
        return <TaskCardFooter />;
      case WORKFLOW_OPTION_TYPES.PIPELINE:
        return <PipelineCardFooter />;
    }
  };

  const getHighlightedBorderColorForWorkflowOptionType = () => {
    switch (workflowOptionType) {
      case WORKFLOW_OPTION_TYPES.TASK:
        return themeConstants.COLOR_PALETTE.SALESFORCE_BLUE;
      case WORKFLOW_OPTION_TYPES.PIPELINE:
        return themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE;
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
      tooltip={tooltip}
      highlightedBorderColor={getHighlightedBorderColorForWorkflowOptionType()}
    />
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
};