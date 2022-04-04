import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import NumberPickerInputBase from "../../../../../../../common/inputs/number/picker/base/NumberPickerInputBase";
import GitScraperLibrarySelectInput from "./inputs/GitScraperLibrarySelectInput";
import GitScraperScmToolTypeSelectInput from "./inputs/GitScraperScmToolTypeSelectInput";
import GitScraperScmToolSelectInput from "./inputs/GitScraperScmToolSelectInput";
import GitScraperBitbucketWorkspaceSelectInput from "./inputs/GitScraperBitbucketWorkspaceSelectInput";
import GitScraperGitRepositorySelectInput from "./inputs/GitScraperGitRepositorySelectInput";
import GitScraperGitBranchSelectInput from "./inputs/GitScraperGitBranchSelectInput";
import GitScraperStepFormMetadata from "./gitscraper-step-metadata";
import GitIgnoreToggleInput from "./inputs/GitIgnoreToggleInput";

function GitscraperStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(true);
  const [jobType, setJobType] = useState("");
  const [gitscraperStepConfigurationModel, setGitscraperStepConfigurationModel] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);

    let { threshold, job_type } = stepTool;
    let terraformConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      GitScraperStepFormMetadata
    );

    setGitscraperStepConfigurationModel(terraformConfigurationData);

    if (job_type) {
      setJobType(job_type);
    }

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: gitscraperStepConfigurationModel?.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    await parentCallback(item);
  };

  if (isLoading || gitscraperStepConfigurationModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={gitscraperStepConfigurationModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <GitScraperLibrarySelectInput
        dataObject={gitscraperStepConfigurationModel}
        setDataObject={setGitscraperStepConfigurationModel}
        disabled={false}
        fieldName={"type"}
      />
      <GitScraperScmToolTypeSelectInput
        model={gitscraperStepConfigurationModel}
        setModel={setGitscraperStepConfigurationModel}
      />
      <GitScraperScmToolSelectInput
        model={gitscraperStepConfigurationModel}
        setModel={setGitscraperStepConfigurationModel}
      />
      <GitScraperBitbucketWorkspaceSelectInput
        model={gitscraperStepConfigurationModel}
        setModel={setGitscraperStepConfigurationModel}
      />
      <GitScraperGitRepositorySelectInput
        model={gitscraperStepConfigurationModel}
        setModel={setGitscraperStepConfigurationModel}
      />
      <GitScraperGitBranchSelectInput
        model={gitscraperStepConfigurationModel}
        setModel={setGitscraperStepConfigurationModel}
      />
      {/*<NumberPickerInputBase*/}
      {/*  fieldName={"commits"}*/}
      {/*  dataObject={gitscraperStepConfigurationModel}*/}
      {/*  setDataObject={setGitscraperStepConfigurationModel}*/}
      {/*/>*/}
      <NumberPickerInputBase
        fieldName={"threshold"}
        dataObject={gitscraperStepConfigurationModel}
        setDataObject={setGitscraperStepConfigurationModel}
      />
      <GitIgnoreToggleInput
        model={gitscraperStepConfigurationModel}
        setModel={setGitscraperStepConfigurationModel}
        fieldName={"secretsException"}
        />
      <GitIgnoreToggleInput
        model={gitscraperStepConfigurationModel}
        setModel={setGitscraperStepConfigurationModel}
        fieldName={"filesException"}
        />
    </PipelineStepEditorPanelContainer>
  );
}

GitscraperStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
};

export default GitscraperStepConfiguration;
