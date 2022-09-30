import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FortifyStepFormMetadata from "./fortify-stepForm-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import { hasStringValue } from "components/common/helpers/string-helpers";
import FortifyToolSelectInput from "./inputs/FortifyToolSelectInput";
import FortifyStepApplicationSelectInput from "./inputs/FortifyStepApplicationSelectInput";
import FortifyStepReleaseSelectInput from "./inputs/FortifyStepReleaseSelectInput";
import FortifyStepAssessmentSelectInput from "./inputs/FortifyStepAssessmentSelectInput";
import FortifyStepEntitlementSelectInput from "./inputs/FortifyStepEntitlementSelectInput";
import FortifyStepTechnologyStackSelectInput from "./inputs/FortifyStepTechnologyStackSelectInput";
import FortifyStepLanguageLevelSelectInput from "./inputs/FortifyStepLanguageLevelSelectInput";
import FortifyStepAuditPreferenceSelectInput from "./inputs/FortifyStepAuditPreferenceSelectInput";
import FortifyStepThresholdInput from "./inputs/FortifyStepThresholdInput";
import FortifyScmToolTypeSelectInput from "./inputs/FortifyScmToolTypeSelectInput";
import FortifyScmToolSelectInput from "./inputs/FortifyScmToolSelectInput";
import FortifyBitbucketWorkspaceInput from "./inputs/FortifyBitbucketWorkspaceInput";
import FortifyGitRepositoryInput from "./inputs/FortifyGitRepositoryInput";
import FortifyGitBranchInput from "./inputs/FortifyGitBranchInput";

function FortifyStepConfiguration({ pipelineId, stepTool, plan, stepId, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [fortifyStepConfigurationDto, setFortifyConfigurationDataDto] = useState(undefined);

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
      setFortifyConfigurationDataDto(new Model(configuration, FortifyStepFormMetadata, false));
    } else {
      setFortifyConfigurationDataDto(
        new Model({ ...FortifyStepFormMetadata.newObjectFields }, FortifyStepFormMetadata, false)
      );
    }
  };

  const handleSaveStepConfig = async () => {
    await callbackFunction();
    closeEditorPanel();
  };

  const callbackFunction = async () => {
    let newDataObject = fortifyStepConfigurationDto;
    setFortifyConfigurationDataDto({ ...newDataObject });
    const item = {
      configuration: fortifyStepConfigurationDto.getPersistData(),
    };
    await parentCallback(item);
  };

  if (isLoading || fortifyStepConfigurationDto == null) {
    return <LoadingDialog size="sm" />;
  }

  const getScmInputs = () => {
    if (fortifyStepConfigurationDto?.getData("service") == undefined || fortifyStepConfigurationDto?.getData("service") === "") {
      return null;
    }
    return (
      <>
        <FortifyScmToolSelectInput
          model={fortifyStepConfigurationDto}
          setModel={setFortifyConfigurationDataDto}
        />
        <FortifyBitbucketWorkspaceInput
          model={fortifyStepConfigurationDto}
          setModel={setFortifyConfigurationDataDto}
          disabled={hasStringValue(fortifyStepConfigurationDto?.getData("gitToolId")) !== true}
        />
        <FortifyGitRepositoryInput
          model={fortifyStepConfigurationDto}
          setModel={setFortifyConfigurationDataDto}
          disabled={hasStringValue(fortifyStepConfigurationDto?.getData("gitToolId")) !== true}
        />
        <FortifyGitBranchInput
          model={fortifyStepConfigurationDto}
          setModel={setFortifyConfigurationDataDto}
          disabled={hasStringValue(fortifyStepConfigurationDto?.getData("gitRepository")) !== true}
        />
      </>
    );
  };

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={fortifyStepConfigurationDto}
      persistRecord={handleSaveStepConfig}
      isLoading={isLoading}
    >
      <FortifyToolSelectInput
        model={fortifyStepConfigurationDto}
        setModel={setFortifyConfigurationDataDto}
      />
      <FortifyStepApplicationSelectInput
        model={fortifyStepConfigurationDto}
        setModel={setFortifyConfigurationDataDto}
        disabled={hasStringValue(fortifyStepConfigurationDto?.getData("toolConfigId")) !== true}
        toolId={fortifyStepConfigurationDto?.getData("toolConfigId")}
      />
      <FortifyStepReleaseSelectInput
        model={fortifyStepConfigurationDto}
        setModel={setFortifyConfigurationDataDto}
        toolId={fortifyStepConfigurationDto?.getData("toolConfigId")}
        applicationId={fortifyStepConfigurationDto?.getData("applicationId")}
      />
      <FortifyStepAssessmentSelectInput 
        model={fortifyStepConfigurationDto}
        setModel={setFortifyConfigurationDataDto}
      />
      <FortifyStepEntitlementSelectInput 
        model={fortifyStepConfigurationDto}
        setModel={setFortifyConfigurationDataDto}
      />
      <FortifyStepTechnologyStackSelectInput 
        model={fortifyStepConfigurationDto}
        setModel={setFortifyConfigurationDataDto}
      />
      <FortifyStepLanguageLevelSelectInput 
        model={fortifyStepConfigurationDto}
        setModel={setFortifyConfigurationDataDto}
        disabled={hasStringValue(fortifyStepConfigurationDto?.getData("technologyStackId")) !== true}
        technology={fortifyStepConfigurationDto?.getData("technologyStackId")}
      />
      <FortifyStepAuditPreferenceSelectInput
        model={fortifyStepConfigurationDto}
        setModel={setFortifyConfigurationDataDto}
      />
      <FortifyStepThresholdInput 
        model={fortifyStepConfigurationDto}
        setModel={setFortifyConfigurationDataDto}
      />
      <FortifyScmToolTypeSelectInput
        model={fortifyStepConfigurationDto}
        setModel={setFortifyConfigurationDataDto}
      />
      {getScmInputs()}
    </PipelineStepEditorPanelContainer>
  );
}

FortifyStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
};

export default FortifyStepConfiguration;
