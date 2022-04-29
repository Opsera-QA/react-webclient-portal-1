import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ApigeeStepFormMetadata from "./apigee-stepForm-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";
import ApigeeTypeSelectInput from "./inputs/ApigeeTypeSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import ApigeeEnvironmentSelectInput from "./inputs/ApigeeEnvironmentSelectInput";
import ApigeeExportStepIdSelectInput from "./inputs/ApigeeExportStepIdSelectInput";

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
  };

  const callbackFunction = async () => {
    let newDataObject = apigeeStepConfigurationDto;
    setApigeeStepConfigurationDataDto({ ...newDataObject });
    const item = {
      configuration: apigeeStepConfigurationDto.getPersistData(),
    };
    parentCallback(item);
  };

  const getDynamicFields = () => {
    switch (apigeeStepConfigurationDto.getData("type")) {
      case "export":
        return (
          <div>
            <BooleanToggleInput
              fieldName={"includeDependantKvm"}
              dataObject={apigeeStepConfigurationDto}
              setDataObject={setApigeeStepConfigurationDataDto}
            />
          </div>
        );
      case "import":
        return (
          <ApigeeExportStepIdSelectInput 
            dataObject={apigeeStepConfigurationDto}
            setDataObject={setApigeeStepConfigurationDataDto}
            plan={plan}
            stepId={stepId}
          />
        );
      case "deploy":
        return (
          <>
            <ApigeeEnvironmentSelectInput 
              dataObject={apigeeStepConfigurationDto}
              setDataObject={setApigeeStepConfigurationDataDto}
            />
            <TextInputBase
              dataObject={apigeeStepConfigurationDto}
              setDataObject={setApigeeStepConfigurationDataDto}
              fieldName={"delayTime"}
            />
            <BooleanToggleInput
              fieldName={"overrideVersion"}
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
      <RoleRestrictedToolByIdentifierInputBase
        toolIdentifier={toolIdentifierConstants.TOOL_IDENTIFIERS.APIGEE}
        toolFriendlyName={toolIdentifierConstants.TOOL_IDENTIFIERS.APIGEE}
        fieldName={"toolConfigId"}
        model={apigeeStepConfigurationDto}
        setModel={setApigeeStepConfigurationDataDto}
        placeholderText={"Select Source Apigee Tool"}
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
