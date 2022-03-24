import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faCog} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import Model from "core/data_model/model";
import stepConfigurationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step-configuration-metadata";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import StepConfigurationToolIdentifierSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/StepConfigurationToolIdentifierSelectInput";
import StepConfigurationTagsInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/StepConfigurationTagsInput";
import IconBase from "components/common/icons/IconBase";
import StepConfigurationTypeSelectInput from "./StepConfigurationTypeSelectInput";

function StepConfiguration({ plan, stepId, parentCallback, closeEditorPanel }) {
  const toastContext = useContext(DialogToastContext);
  const [stepConfigurationModel, setStepConfigurationModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [lockTool, setLockTool] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [stepId, plan]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setLockTool(false);
      const stepIndex = pipelineHelpers.getStepIndexFromPlan(plan, stepId);

      if (stepIndex == null || stepIndex === -1) {
        setStepConfigurationModel(new Model({...stepConfigurationMetadata.newObjectFields}, stepConfigurationMetadata, true));
        return;
      }

      const step = plan[stepIndex];
      const currentData = {
        name: step.name,
        type: step.type[0],
        tool_identifier: step.tool && step.tool.tool_identifier ? step.tool.tool_identifier : "",
        active: step.active === true,
        tags: step.tags
      };

      if (step?.tool?.tool_identifier?.length > 0) {
        setLockTool(true);
      }

      setStepConfigurationModel(new Model({...currentData}, stepConfigurationMetadata, false));
    }
    catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const savePipelineStepConfiguration = async () => {
    const stepArrayIndex = pipelineHelpers.getStepIndexFromPlan(plan, stepId);
    const stepConfigurationData = stepConfigurationModel.getPersistData();

    if (stepArrayIndex >= 0 && plan[stepArrayIndex] !== undefined) {
      plan[stepArrayIndex].name = stepConfigurationData.name;
      plan[stepArrayIndex].type[0] = stepConfigurationData.type;
      plan[stepArrayIndex].tool_category = stepConfigurationData.type;
      plan[stepArrayIndex].orchestration_type = "standard";
      plan[stepArrayIndex].tool = { ...plan[stepArrayIndex].tool, tool_identifier: stepConfigurationData.tool_identifier };
      plan[stepArrayIndex].active = stepConfigurationData.active;
      plan[stepArrayIndex].tags = stepConfigurationData.tags;
      await parentCallback(plan);
    }
  };

  if (stepConfigurationModel == null) {
    return null;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={stepConfigurationModel}
      persistRecord={savePipelineStepConfiguration}
      isLoading={isLoading}
      isStrict={true}
    >
      <div className="text-muted mt-1 mb-3">
        A pipeline step represents a tool and an operation. Each step requires a tool and a custom Step Name. After tool setup, navigate to Step Configuration by selecting the cog icon (<IconBase icon={faCog} className={"text-muted"} />) to define operations. If the tool requires configuration information, jobs or accounts, configure them
        in the Tool Registry before Step Setup.
      </div>
      <div className="step-settings-body">
        <BooleanToggleInput dataObject={stepConfigurationModel} setDataObject={setStepConfigurationModel} fieldName={"active"}/>
        <TextInputBase disabled={stepConfigurationModel?.getData("active") !== true} dataObject={stepConfigurationModel} setDataObject={setStepConfigurationModel} fieldName={"name"} />
        <StepConfigurationToolIdentifierSelectInput disabled={lockTool || stepConfigurationModel?.getData("active") !== true} dataObject={stepConfigurationModel} setDataObject={setStepConfigurationModel} />
        <StepConfigurationTypeSelectInput setDataObject={setStepConfigurationModel} dataObject={stepConfigurationModel} />
        <StepConfigurationTagsInput setStepConfigurationModel={setStepConfigurationModel} stepConfigurationModel={stepConfigurationModel} />
      </div>
    </PipelineStepEditorPanelContainer>
  );
}

StepConfiguration.propTypes = {
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  closeEditorPanel: PropTypes.func,
};

export default StepConfiguration;
