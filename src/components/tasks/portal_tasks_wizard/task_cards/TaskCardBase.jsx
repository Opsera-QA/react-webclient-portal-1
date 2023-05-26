import React from "react";
import PropTypes from "prop-types";
import WorkflowOptionCardBase, {
  WORKFLOW_OPTION_TYPES,
} from "components/wizard/portal/workflows/flows/WorkflowOptionCardBase";
import { pipelineTemplateIdentifierConstants } from "components/admin/pipeline_templates/pipelineTemplateIdentifier.constants";
import useComponentStateReference from "hooks/useComponentStateReference";

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
  const { themeConstants } = useComponentStateReference();

  const onClickFunction = (selectedOption) => {
    handleFlowSelection(selectedOption);
  };

  return (
    <WorkflowOptionCardBase
      option={option}
      selectedOption={selectedFlow}
      title={title}
      subTitle={subtitle}
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
