import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RegisterSourceRepositoryHookButton from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/RegisterSourceRepositoryHookButton";
import FieldContainer from "components/common/fields/FieldContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import CopyToClipboardButton from "components/common/buttons/clipboard/CopyToClipboardButton";
import CheckboxInputBase from "../../../../../../common/inputs/boolean/CheckboxInputBase";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";

// TODO: Refactor
function EventBasedTriggerDetails({
  pipeline,
  model,
  setModel,
  savePipelineFunction,
}) {
  const apiUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
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
      <div className={"d-flex justify-content-between"}>
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
      if(model?.getData("isPrEvent") === true) {
          return (
              <div className={"d-flex justify-content-between"}>
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
                          disabled={model.getData("service") === toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_DEVOPS}
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
      <div className={"d-flex justify-content-between"}>
        <div className={"no-wrap-inline mt-auto"}>
          <h6 className={"mb-0"}>Webhook URL:</h6>
        </div>
      </div>
      <InfoText customMessage={triggerUrl} />
      <div className={"d-flex justify-content-end mt-2"}>
        <CopyToClipboardButton
          size={"sm"}
          copyString={triggerUrl}
          className={"mr-2"}
          showLabel={true}
        />
        <RegisterSourceRepositoryHookButton
          model={model}
          savePipelineFunction={savePipelineFunction}
          pipeline={pipeline}
        />
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
