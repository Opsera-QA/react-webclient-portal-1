import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BlackDuckStepFormMetadata from "./blackduck-stepForm-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import JsonInput from "components/common/inputs/object/JsonInput";
import BlackDuckToolSelectInput from "./inputs/BlackDuckToolSelectInput";
import BlackDuckTagSelectInput from "./inputs/BlackDuckTagSelectInput";
import BlackDuckProjectSelectInput from "./inputs/BlackDuckProjectSelectInput";
import {hasStringValue} from "components/common/helpers/string-helpers";
import BlackDuckScmToolTypeSelectInput from "./inputs/BlackDuckScmToolTypeSelectInput";
import BlackDuckScmToolSelectInput from "./inputs/BlackDuckScmToolSelectInput";
import BlackDuckBitbucketWorkspaceInput from "./inputs/BlackDuckBitbucketWorkspaceInput";
import BlackDuckGitRepositoryInput from "./inputs/BlackDuckGitRepositoryInput";
import BlackDuckGitBranchInput from "./inputs/BlackDuckGitBranchInput";
import ParameterMappingInputBase
  from "components/common/list_of_values_input/parameters/ParameterMappingInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function BlackDuckStepConfiguration({ pipelineId, stepTool, plan, stepId, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [blackDuckStepConfigurationDto, setBlackDuckStepConfigurationDataDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await loadFormData(stepTool);    
    setIsLoading(false);
  };

  const loadFormData = async (step) => {
    let { configuration } = step;

    if (typeof configuration !== "undefined") {
      setBlackDuckStepConfigurationDataDto(new Model(configuration, BlackDuckStepFormMetadata, false));
    } else {
      setBlackDuckStepConfigurationDataDto(
        new Model({ ...BlackDuckStepFormMetadata.newObjectFields }, BlackDuckStepFormMetadata, false)
      );
    }
  };

  const handleSaveStepConfig = async () => {
    await callbackFunction();
    closeEditorPanel();
  };

  const callbackFunction = async () => {
    let newDataObject = blackDuckStepConfigurationDto;
    setBlackDuckStepConfigurationDataDto({ ...newDataObject });
    const item = {
      configuration: blackDuckStepConfigurationDto.getPersistData(),
    };
    await parentCallback(item);
  };

  if (isLoading || blackDuckStepConfigurationDto == null) {
    return <LoadingDialog size="sm" />;
  }

  const getScmInputs = () => {
    if (blackDuckStepConfigurationDto?.getData("type") == undefined || blackDuckStepConfigurationDto?.getData("type") === "") {
      return null;
    }
    return (
      <>
        <BlackDuckScmToolSelectInput 
          model={blackDuckStepConfigurationDto}
          setModel={setBlackDuckStepConfigurationDataDto}
        />
        <BlackDuckBitbucketWorkspaceInput
          model={blackDuckStepConfigurationDto}
          setModel={setBlackDuckStepConfigurationDataDto}
          disabled={hasStringValue(blackDuckStepConfigurationDto?.getData("gitToolId")) !== true}
        />
        <BlackDuckGitRepositoryInput
          model={blackDuckStepConfigurationDto}
          setModel={setBlackDuckStepConfigurationDataDto}
          disabled={hasStringValue(blackDuckStepConfigurationDto?.getData("gitToolId")) !== true}
        />
        <BlackDuckGitBranchInput
          model={blackDuckStepConfigurationDto}
          setModel={setBlackDuckStepConfigurationDataDto}
          disabled={hasStringValue(blackDuckStepConfigurationDto?.getData("gitRepository")) !== true}
        />
        <TextInputBase
          dataObject={blackDuckStepConfigurationDto}
          setDataObject={setBlackDuckStepConfigurationDataDto}
          fieldName={"gitFilePath"}
          disabled={hasStringValue(blackDuckStepConfigurationDto?.getData("defaultBranch")) !== true}
        />
      </>
    );
  };

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={blackDuckStepConfigurationDto}
      persistRecord={handleSaveStepConfig}
      isLoading={isLoading}
    >
      <BlackDuckToolSelectInput
        model={blackDuckStepConfigurationDto}
        setModel={setBlackDuckStepConfigurationDataDto}
      />
      <BlackDuckScmToolTypeSelectInput 
        model={blackDuckStepConfigurationDto}
        setModel={setBlackDuckStepConfigurationDataDto}
      />
      {getScmInputs()}
      <BlackDuckTagSelectInput
        model={blackDuckStepConfigurationDto}
        setModel={setBlackDuckStepConfigurationDataDto}
      />
      <BlackDuckProjectSelectInput
        model={blackDuckStepConfigurationDto}
        setModel={setBlackDuckStepConfigurationDataDto}
        blackDuckToolId={blackDuckStepConfigurationDto?.getData("blackDuckToolId")}
      />
      <BooleanToggleInput
        fieldName={"runCountAsVersion"}
        dataObject={blackDuckStepConfigurationDto}
        setDataObject={setBlackDuckStepConfigurationDataDto}        
      />
      <JsonInput 
        fieldName={"environments"} 
        model={blackDuckStepConfigurationDto} 
        setModel={setBlackDuckStepConfigurationDataDto}
        className={"mb-4"}
      />      
      <ParameterMappingInputBase
        titleIcon={faHandshake}
        dataObject={blackDuckStepConfigurationDto}
        setDataObject={setBlackDuckStepConfigurationDataDto}
        fieldName={"runtimeVariables"}        
        type={"Runtime Variables"}
        titleText={"Runtime Variables"}
      />
    </PipelineStepEditorPanelContainer>
  );
}

BlackDuckStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
};

export default BlackDuckStepConfiguration;
