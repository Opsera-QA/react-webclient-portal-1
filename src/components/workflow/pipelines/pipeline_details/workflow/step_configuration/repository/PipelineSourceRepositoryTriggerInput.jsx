import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import EventBasedTriggerDetails
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/EventBasedTriggerDetails";
import PipelineSourceRepositorySecretInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositorySecretInput";

function PipelineSourceRepositoryEventBasedTriggerInput({className, model, setModel, disabled, pipeline, savePipelineFunction}) {
  const getDynamicFields = () => {
    if (model?.getData("trigger_active") === true) {
      return (
        <>
          <EventBasedTriggerDetails
            pipeline={pipeline}
            savePipelineFunction={savePipelineFunction}
            model={model}
          />
          <PipelineSourceRepositorySecretInput
            model={model}
            setModel={setModel}
            visible={model.getData("service") !== "bitbucket"}
          />
        </>
      );
    }
  };

  return (
    <div className={className}>
      <BooleanToggleInput
        dataObject={model}
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