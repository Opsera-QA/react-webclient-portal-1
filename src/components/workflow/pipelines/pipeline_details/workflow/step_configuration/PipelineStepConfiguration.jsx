import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faCog} from "@fortawesome/pro-light-svg-icons";
import Model from "core/data_model/model";
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
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";
import pipelineStepDefinitionMetadata
  from "@opsera/definitions/constants/pipelines/steps/definitions/pipelineStepDefinition.metadata";

function PipelineStepConfiguration(
  {
    plan,
    stepId,
    closeEditorPanel,
    pipelineId,
  }) {
  const [stepConfigurationModel, setStepConfigurationModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [lockTool, setLockTool] = useState(false);
  const {
    isMounted,
    toastContext,
  } = useComponentStateReference();
  const pipelineActions = usePipelineActions();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  // TODO: We should handle this better
  const loadData = async () => {
    try {
      setIsLoading(true);
      setLockTool(false);
      const stepIndex = pipelineHelpers.getStepIndexFromPlan(plan, stepId);

      if (stepIndex == null || stepIndex === -1) {
        // eslint-disable-next-line no-undef
        setStepConfigurationModel(new Model({...pipelineStepDefinitionMetadata.newObjectFields}, pipelineStepDefinitionMetadata, true));
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

      setStepConfigurationModel(new Model({...currentData}, pipelineStepDefinitionMetadata, false));
    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updatePipelineStepDefinition = async (model = stepConfigurationModel) => {
    const stepConfigurationData = model.getPersistData();
    await pipelineActions.updatePipelineStepDefinition(
      pipelineId,
      stepId,
      stepConfigurationData,
    );
    closeEditorPanel();
  };

  const handleTagsCheck = async () => {
    const tags = DataParsingHelper.parseArray(stepConfigurationModel?.getData("tags"), []);

    if (stepConfigurationModel?.getData("type") !== "deploy" && tags.length === 0) {
      toastContext.showOverlayPanel(
        <PipelineStepTagWarningOverlay
          stepConfigurationModel={stepConfigurationModel}
          setStepConfigurationModel={setStepConfigurationModel}
          savePipelineStepConfiguration={updatePipelineStepDefinition}
        />
      );
    } else {
      return await updatePipelineStepDefinition(stepConfigurationModel);
    }
  };

  if (stepConfigurationModel == null) {
    return null;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={stepConfigurationModel}
      persistRecord={handleTagsCheck}
      showSuccessToasts={stepConfigurationModel?.getData("type") === "deploy" || stepConfigurationModel?.getArrayData("tags").length > 0}
      isLoading={isLoading}
      isStrict={true}
      clearChangeMapAfterSave={false}
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
  closeEditorPanel: PropTypes.func,
  pipelineId: PropTypes.string,
};

export default PipelineStepConfiguration;
