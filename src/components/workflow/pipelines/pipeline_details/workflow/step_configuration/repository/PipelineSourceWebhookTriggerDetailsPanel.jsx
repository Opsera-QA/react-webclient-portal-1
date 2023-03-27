import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RegisterSourceRepositoryHookButton from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/RegisterSourceRepositoryHookButton";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import { NODE_API_ORCHESTRATOR_SERVER_URL } from "config";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import CopyToClipboardIconBase from "components/common/icons/link/CopyToClipboardIconBase";
import FieldLabelBase from "components/common/fields/FieldLabelBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function PipelineSourceWebhookTriggerDetailsPanel({
  pipeline,
  model,
  setModel,
  savePipelineFunction,
}) {
  const apiUrl = NODE_API_ORCHESTRATOR_SERVER_URL;
  const [triggerUrl, setTriggerUrl] = useState("");

  useEffect(() => {
    setTriggerUrl(`${apiUrl}/hooks/${pipeline?.owner}/${pipeline?._id}/source`);
  }, [JSON.stringify(pipeline)]);

  // console.log(model.getPersistData());

  const setDataFunction = (fieldName, newValue) => {
    const newModel = { ...model };
    newModel?.setData("prCreatedEvent", !model?.getData("prCreatedEvent"));
    newModel?.setData("prApprovedEvent", !model?.getData("prApprovedEvent"));
    setModel({ ...newModel });
  };

  return (
    <div>
      <BooleanToggleInput
        className={"mt-2"}
        fieldName={"isPushEvent"}
        model={model}
        setModel={setModel}
      />
      <BooleanToggleInput
        className={""}
        fieldName={"isPrEvent"}
        model={model}
        setModel={setModel}
      />
      <BooleanToggleInput
        className={""}
        fieldName={"prCreatedEvent"}
        model={model}
        setModel={setModel}
        setDataFunction={setDataFunction}
        visible={model?.getData("isPrEvent") === true}
      />
      <BooleanToggleInput
        className={"mb-2"}
        fieldName={"prApprovedEvent"}
        model={model}
        setModel={setModel}
        setDataFunction={setDataFunction}
        disabled={model.getData("service") === toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_DEVOPS}
        visible={model?.getData("isPrEvent") === true}
      />
      <div className={"d-flex"}>
        <div className={"d-flex my-auto"}>
          <FieldLabelBase
            label={"Webhook URL"}
          />
          <div>
            {triggerUrl}
          </div>
          <CopyToClipboardIconBase
            className={"ml-2"}
            copyString={triggerUrl}
            copyIcon={faClipboardList}
          />
        </div>
        <div>
          <RegisterSourceRepositoryHookButton
            model={model}
            savePipelineFunction={savePipelineFunction}
            pipeline={pipeline}
            className={"ml-2"}
          />
        </div>
      </div>
    </div>
  );
}

PipelineSourceWebhookTriggerDetailsPanel.propTypes = {
  pipeline: PropTypes.object,
  model: PropTypes.object,
  savePipelineFunction: PropTypes.func,
  setModel: PropTypes.func,
};

export default PipelineSourceWebhookTriggerDetailsPanel;
