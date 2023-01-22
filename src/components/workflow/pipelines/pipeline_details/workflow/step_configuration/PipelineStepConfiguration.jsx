import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faCog} from "@fortawesome/pro-light-svg-icons";
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
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineStepTagWarningOverlay
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/tag_warning/PipelineStepTagWarningOverlay";

function PipelineStepConfiguration(
  {
    plan,
    stepId,
    parentCallback,
    closeEditorPanel,
    step,
  }) {
  const [stepConfigurationModel, setStepConfigurationModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [lockTool, setLockTool] = useState(false);
  const {
    isMounted,
    cancelTokenSource,
    toastContext,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

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
        tags: step.tags,
        _id: step._id,
      };

      if (step?.tool?.tool_identifier?.length > 0) {
        setLockTool(true);
      }

      setStepConfigurationModel(new Model({...currentData}, stepConfigurationMetadata, false));
    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const savePipelineStepConfiguration = async (model = stepConfigurationModel) => {
    const stepArrayIndex = pipelineHelpers.getStepIndexFromPlan(plan, stepId);
    const stepConfigurationData = model.getPersistData();

    if (stepArrayIndex >= 0 && plan[stepArrayIndex] !== undefined) {
      plan[stepArrayIndex].name = stepConfigurationData.name;
      plan[stepArrayIndex].type[0] = stepConfigurationData.type;
      plan[stepArrayIndex].tool_category = stepConfigurationData.type;
      plan[stepArrayIndex].orchestration_type = "standard";
      plan[stepArrayIndex].tool = {
        ...plan[stepArrayIndex].tool,
        tool_identifier: stepConfigurationData.tool_identifier
      };
      plan[stepArrayIndex].active = stepConfigurationData.active;
      plan[stepArrayIndex].tags = stepConfigurationData.tags;
      await parentCallback(plan);
      closeEditorPanel();
    }
  };

  const handleTagsCheck = async () => {
    const tags = DataParsingHelper.parseArray(stepConfigurationModel?.getData("tags"), []);

    if (stepConfigurationModel?.getData("type") !== "deploy" && tags.length === 0) {
      toastContext.showOverlayPanel(
        <PipelineStepTagWarningOverlay
          stepConfigurationModel={stepConfigurationModel}
          setStepConfigurationModel={setStepConfigurationModel}
          savePipelineStepConfiguration={savePipelineStepConfiguration}
        />
      );
    } else {
      return await savePipelineStepConfiguration(stepConfigurationModel);
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
      // persistRecord={handleTagsCheck}
      // showSuccessToasts={stepConfigurationModel?.getData("type") !== "deploy" || stepConfigurationModel?.getArrayData("tags").length > 0}
      isLoading={isLoading}
      isStrict={true}
    >
      <div className="text-muted mt-1 mb-3">
        A pipeline step represents a tool and an operation. Each step requires a tool and a custom Step Name.
        After tool setup, navigate to Step Configuration by selecting the cog icon (<IconBase icon={faCog} className={"text-muted"}/>) to define
        operations. If the tool requires configuration information, jobs or accounts, configure them
        in the Tool Registry before Step Setup.
      </div>
      <div className="step-settings-body">
        <BooleanToggleInput
          dataObject={stepConfigurationModel}
          setDataObject={setStepConfigurationModel}
          fieldName={"active"}
        />
        <TextInputBase
          disabled={stepConfigurationModel?.getData("active") !== true}
          dataObject={stepConfigurationModel}
          setDataObject={setStepConfigurationModel}
          fieldName={"name"}
        />
        <StepConfigurationToolIdentifierSelectInput
          disabled={lockTool || stepConfigurationModel?.getData("active") !== true}
          model={stepConfigurationModel}
          setModel={setStepConfigurationModel}
        />
        <StepConfigurationTypeSelectInput
          setModel={setStepConfigurationModel}
          model={stepConfigurationModel}
        />
        <StepConfigurationTagsInput
          setStepConfigurationModel={setStepConfigurationModel}
          stepConfigurationModel={stepConfigurationModel}
        />
      </div>
    </PipelineStepEditorPanelContainer>
  );
}

PipelineStepConfiguration.propTypes = {
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  closeEditorPanel: PropTypes.func,
  step: PropTypes.object,
};

export default PipelineStepConfiguration;
