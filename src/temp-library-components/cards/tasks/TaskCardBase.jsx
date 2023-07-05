import PropTypes from "prop-types";
import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import WorkflowOptionCardBase from "../../../components/wizard/portal/workflows/flows/WorkflowOptionCardBase";
export default function TaskCardBase({
    selectedFlow,
    handleFlowSelection,
    option,
    title,
    subtitle,
    icon,
    description,
    workflowOptionType
  }) {
  const {themeConstants} = useComponentStateReference();

  const onClickFunction = (selectedOption) => {
    handleFlowSelection(selectedOption);
  };

  return (
    <WorkflowOptionCardBase
      option={option}
      selectedOption={selectedFlow}
      title={title}
      subtitle={subtitle}
      icon={icon}
      iconColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
      description={description}
      onClickFunction={onClickFunction}
      workflowOptionType={workflowOptionType}
    />
  );
}

TaskCardBase.propTypes = {
  selectedFlow: PropTypes.string,
  handleFlowSelection: PropTypes.func,
  option: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.object,
  description: PropTypes.string,
  workflowOptionType: PropTypes.string,
};