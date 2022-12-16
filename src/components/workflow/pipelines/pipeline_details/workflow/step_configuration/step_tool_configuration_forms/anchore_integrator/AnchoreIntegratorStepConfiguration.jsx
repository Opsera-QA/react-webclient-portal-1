import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import PipelineStepSelectInput from "components/common/list_of_values_input/workflow/pipelines/PipelineStepSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import AnchoreIntegratorPipelineToolSelectInput
  from "components/common/list_of_values_input/tools/anchore_integrator/AnchoreIntegratorPipelineToolSelectInput";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import anchoreIntegratorStepConfigurationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/anchore_integrator/anchore-integrator-step-configuration-metadata";
import BooleanToggleInput from "../../../../../../../common/inputs/boolean/BooleanToggleInput";
import CoverityStepImpactThresholdInput from "../coverity/inputs/CoverityStepImpactThresholdInput";

function AnchoreIntegratorStepConfiguration({ stepTool, plan, stepId, parentCallback, closeEditorPanel }) {
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [anchoreIntegratorModel, setAnchoreIntegratorModel] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const parsedModel = modelHelpers.parseObjectIntoModel(stepTool?.configuration, anchoreIntegratorStepConfigurationMetadata);
      setAnchoreIntegratorModel(parsedModel);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const callbackFunction = async () => {
    const item = {
      configuration: anchoreIntegratorModel?.getPersistData(),
      threshold: {
        type: stepTool?.threshold?.type || "",
        value:  stepTool?.threshold?.value || "",
      },
    };
    parentCallback(item);
  };

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={anchoreIntegratorModel}
      persistRecord={callbackFunction}
      isLoading={isLoading || anchoreIntegratorModel == null}
    >
      <AnchoreIntegratorPipelineToolSelectInput
        model={anchoreIntegratorModel}
        setModel={setAnchoreIntegratorModel}
      />
      <PipelineStepSelectInput
        model={anchoreIntegratorModel}
        setModel={setAnchoreIntegratorModel}
        stepId={stepId}
        plan={plan}
        fieldName={"ecrPushStepId"}
        disabled={anchoreIntegratorModel?.getData("anchoreToolConfigId")?.length === 0}
      />
      <BooleanToggleInput
          dataObject={anchoreIntegratorModel}
          setDataObject={setAnchoreIntegratorModel}
          fieldName={"clientSideThreshold"}
      />
      <CoverityStepImpactThresholdInput
          model={anchoreIntegratorModel}
          setModel={setAnchoreIntegratorModel}
          fieldName={"thresholdCompliance"}
          visible={anchoreIntegratorModel?.getData("clientSideThreshold")}
      />
    </PipelineStepEditorPanelContainer>
  );
}

AnchoreIntegratorStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  closeEditorPanel: PropTypes.func
};

export default AnchoreIntegratorStepConfiguration;
