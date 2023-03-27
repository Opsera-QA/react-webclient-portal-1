import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RegisterSourceRepositoryHookButton from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/RegisterSourceRepositoryHookButton";
import FieldContainer from "components/common/fields/FieldContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import CheckboxInputBase from "../../../../../../common/inputs/boolean/CheckboxInputBase";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import { NODE_API_ORCHESTRATOR_SERVER_URL } from "config";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import CopyToClipboardIconBase from "components/common/icons/link/CopyToClipboardIconBase";
import FieldLabelBase from "components/common/fields/FieldLabelBase";

// TODO: Refactor
function EventBasedTriggerDetails({
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

  const EventTriggerOptions = () => {
    return (
      <div>
        <div>
          <CheckboxInputBase
            fieldName={"isPushEvent"}
            model={model}
            setModel={setModel}
            // disabled={disabled}
          />
        </div>
        <div>
          <CheckboxInputBase
            fieldName={"isPrEvent"}
            model={model}
            setModel={setModel}
            // disabled={disabled}
          />
        </div>
      </div>
    );
  };

  const PrEventOptions = () => {
    if (model?.getData("isPrEvent") === true) {
      return (
        <div>
          <div>
            <CheckboxInputBase
              fieldName={"prCreatedEvent"}
              model={model}
              setModel={setModel}
              setDataFunction={setDataFunction}
              // disabled={disabled}
            />
          </div>
          <div>
            <CheckboxInputBase
              fieldName={"prApprovedEvent"}
              model={model}
              setModel={setModel}
              setDataFunction={setDataFunction}
              disabled={
                model.getData("service") ===
                toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_DEVOPS
              }
            />
          </div>
        </div>
      );
    }
  };

  return (
    <FieldContainer>
      {EventTriggerOptions()}
      {PrEventOptions()}
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
    </FieldContainer>
  );
}

EventBasedTriggerDetails.propTypes = {
  pipeline: PropTypes.object,
  model: PropTypes.object,
  savePipelineFunction: PropTypes.func,
  setModel: PropTypes.func,
};

export default EventBasedTriggerDetails;
