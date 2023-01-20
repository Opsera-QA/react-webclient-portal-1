import React from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import { hasStringValue } from "components/common/helpers/string-helpers";

export const CREATE_WORKFLOW_WIZARD_REGISTER_TOOL_TYPES = {
  SOURCE: "source",
  DESTINATION: "destination",
};

export default function CreateWorkflowWizardRegisterToolHeaderText(
  {
    toolName,
    className,
    toolType,
  }) {
  if (hasStringValue(toolName) !== true) {
    return null;
  }

  if (toolType === CREATE_WORKFLOW_WIZARD_REGISTER_TOOL_TYPES.SOURCE) {
    return (
      <div className={className}>
        <h4>Source {toolName} Account</h4>
        <H5FieldSubHeader
          subheaderText={`Enter the ${toolName} Account to use as the source for this workflow`}
        />
      </div>
    );
  }

  if (toolType === CREATE_WORKFLOW_WIZARD_REGISTER_TOOL_TYPES.DESTINATION) {
    return (
      <div className={className}>
        <h4>Destination {toolName} Account</h4>
        <H5FieldSubHeader
          subheaderText={`Enter the ${toolName} Account to use as the target destination for this workflow`}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <h4>{toolName} Account</h4>
      <H5FieldSubHeader
        subheaderText={`Enter the ${toolName} Account to use for this workflow`}
      />
    </div>
  );
}

CreateWorkflowWizardRegisterToolHeaderText.propTypes = {
  className: PropTypes.string,
  toolName: PropTypes.string,
  toolType: PropTypes.string,
};
