import React from "react";
import PropTypes from "prop-types";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

export default function PipelineSourceWebhookTriggerDetailsPanel(
  {
    model,
    setModel,
    className,
  }) {
  const setDataFunction = (fieldName, newValue) => {
    const newModel = {...model};
    newModel?.setData("prCreatedEvent", !model?.getData("prCreatedEvent"));
    newModel?.setData("prApprovedEvent", !model?.getData("prApprovedEvent"));
    setModel({...newModel});
  };

  return (
    <div className={className}>
      <div className={"text-muted"}>Webhook Triggers</div>
      <BooleanToggleInput
        className={"mt-1"}
        fieldName={"isPushEvent"}
        dataObject={model}
        setDataObject={setModel}
      />
      <BooleanToggleInput
        className={"my-1"}
        fieldName={"isPrEvent"}
        dataObject={model}
        setDataObject={setModel}
      />
      <BooleanToggleInput
        className={"my-1"}
        fieldName={"prCreatedEvent"}
        dataObject={model}
        setDataObject={setModel}
        setDataFunction={setDataFunction}
        visible={model?.getData("isPrEvent") === true}
      />
      <BooleanToggleInput
        className={"mb-2"}
        fieldName={"prApprovedEvent"}
        dataObject={model}
        setDataObject={setModel}
        setDataFunction={setDataFunction}
        disabled={model.getData("service") === toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_DEVOPS}
        visible={model?.getData("isPrEvent") === true}
      />
        <BooleanToggleInput
        className={"my-1"}
        fieldName={"isMonitored"}
        dataObject={model}
        setDataObject={setModel}
        visible={model?.getData("isPrEvent") === true && model?.getData("isPushEvent") === false}
      />
    </div>
  );
}

PipelineSourceWebhookTriggerDetailsPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
};
