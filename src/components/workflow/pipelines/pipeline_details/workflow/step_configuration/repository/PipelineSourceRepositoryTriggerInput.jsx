import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import EventBasedTriggerDetails from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/EventBasedTriggerDetails";
import PipelineSourceRepositorySecretInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositorySecretInput";
import IconBase from "components/common/icons/IconBase";
import { faTriangleExclamation } from "@fortawesome/pro-light-svg-icons";

function PipelineSourceRepositoryEventBasedTriggerInput({
  className,
  model,
  setModel,
  disabled,
  pipeline,
  savePipelineFunction,
}) {
  const getDynamicText = () => {
    if (!model?.getData("dynamicSettings")) {
      return (
        <div className={"d-flex mb-4 warning-text-alt"}>
          <div>
            <IconBase
              icon={faTriangleExclamation}
              className={"mr-1"}
            />
          </div>
          {`Please enable Dynamic Settings on this pipeline to use this feature.`}
        </div>
      );
    }
  };

  const helpText = () => {
    return (
      <div>
        Please note, Dynamic Settings are required for this feature to work.
      </div>
    );
  };

  const getDynamicFields = () => {
    if (model?.getData("trigger_active") === true) {
      return (
        <>
          <EventBasedTriggerDetails
            pipeline={pipeline}
            savePipelineFunction={savePipelineFunction}
            model={model}
            setModel={setModel}
          />
          <BooleanToggleInput
            dataObject={model}
            setDataObject={setModel}
            fieldName={"enableBranchSwitch"}
            customInfoText={getDynamicText()}
            helpTooltip={helpText()}
            disabled={!model?.getData("dynamicSettings")}
          />
          {getDynamicText()}
          <PipelineSourceRepositorySecretInput
            model={model}
            setModel={setModel}
            visible={model.getData("service") !== "bitbucket"}
          />
        </>
      );
    }
  };

  const enableWebhookTrigger = (fieldName, newValue) => {
    const newModel = { ...model };
    newModel?.setData("trigger_active", newValue);
    newModel?.setData("isPushEvent", newValue === true ? true : false);
    newModel?.setData("isPrEvent", false);
    setModel({ ...newModel });
  };

  return (
    <div className={className}>
      <BooleanToggleInput
        dataObject={model}
        setDataFunction={enableWebhookTrigger}
        setDataObject={setModel}
        fieldName={"trigger_active"}
        disabled={disabled}
      />
      {getDynamicFields()}
    </div>
  );
}

PipelineSourceRepositoryEventBasedTriggerInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  savePipelineFunction: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  pipeline: PropTypes.object,
};

export default PipelineSourceRepositoryEventBasedTriggerInput;
