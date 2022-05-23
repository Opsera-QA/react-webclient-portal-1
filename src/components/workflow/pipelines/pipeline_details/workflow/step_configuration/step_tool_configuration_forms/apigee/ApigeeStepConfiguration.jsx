import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ApigeeStepFormMetadata from "./apigee-stepForm-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import ApigeeTypeSelectInput from "./inputs/ApigeeTypeSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ApigeeEnvironmentSelectInput from "./inputs/ApigeeEnvironmentSelectInput";
import ApigeeToolSelectInput from "./inputs/ApigeeToolSelectInput";
import RoleRestrictedApigeeToolSelectInput from "components/common/list_of_values_input/tools/apigee/RoleRestrictedApigeeToolSelectInput";

function ApigeeStepConfiguration({ pipelineId, stepTool, plan, stepId, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);
  const [apigeeStepConfigurationDto, setApigeeStepConfigurationDataDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await loadFormData(stepTool);
    if (plan && stepId) {
      let pipelineSteps = pipelineHelpers.formatStepOptions(plan, stepId);
      setListOfSteps(pipelineSteps);
    }
    setIsLoading(false);
  };

  const loadFormData = async (step) => {
    let { configuration } = step;

    if (typeof configuration !== "undefined") {
      setApigeeStepConfigurationDataDto(new Model(configuration, ApigeeStepFormMetadata, false));
    } else {
      setApigeeStepConfigurationDataDto(
        new Model({ ...ApigeeStepFormMetadata.newObjectFields }, ApigeeStepFormMetadata, false)
      );
    }
  };

  const handleSaveStepConfig = async () => {
    await callbackFunction();
    closeEditorPanel();
  };

  const callbackFunction = async () => {
    let newDataObject = apigeeStepConfigurationDto;
    setApigeeStepConfigurationDataDto({ ...newDataObject });
    const item = {
      configuration: apigeeStepConfigurationDto.getPersistData(),
    };
    await parentCallback(item);
  };

  const getDynamicFields = () => {
    switch (apigeeStepConfigurationDto.getData("type")) {
      case "transfer":
        return (
          <>
            <BooleanToggleInput
              fieldName={"includeDependencies"}
              dataObject={apigeeStepConfigurationDto}
              setDataObject={setApigeeStepConfigurationDataDto}
            />
            <RoleRestrictedApigeeToolSelectInput 
              fieldName={"targetToolConfigId"}
              model={apigeeStepConfigurationDto}
              setModel={setApigeeStepConfigurationDataDto}              
            />            
          </>
        );      
      case "deploy":
        return (
          <>
            <ApigeeEnvironmentSelectInput 
              model={apigeeStepConfigurationDto}
              setModel={setApigeeStepConfigurationDataDto}
              toolConfigId={apigeeStepConfigurationDto.getData("toolConfigId")}
            />
            <TextInputBase
              dataObject={apigeeStepConfigurationDto}
              setDataObject={setApigeeStepConfigurationDataDto}
              fieldName={"delayTime"}
            />
            <BooleanToggleInput
              fieldName={"ovverride"}
              dataObject={apigeeStepConfigurationDto}
              setDataObject={setApigeeStepConfigurationDataDto}
            />
          </>
        );
      default:
        return (
          <></>
        );
    }
  };

  if (isLoading || apigeeStepConfigurationDto == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={apigeeStepConfigurationDto}
      persistRecord={handleSaveStepConfig}
      isLoading={isLoading}
    >
      <ApigeeToolSelectInput 
        model={apigeeStepConfigurationDto}
        setModel={setApigeeStepConfigurationDataDto}
      />
      <ApigeeTypeSelectInput
        model={apigeeStepConfigurationDto}
        setModel={setApigeeStepConfigurationDataDto}
        fieldName="type"
      />
      {getDynamicFields()}
    </PipelineStepEditorPanelContainer>
  );
}

ApigeeStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
};

export default ApigeeStepConfiguration;
