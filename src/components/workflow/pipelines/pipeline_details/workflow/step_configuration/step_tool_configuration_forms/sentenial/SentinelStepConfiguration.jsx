import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import sentinelStepFormMetadata from "./sentinel-stepForm-metadata";
import SentinelScmToolTypeSelectInput from "./inputs/SentinelScmToolTypeSelectInput";
import SentinelScmToolSelectInput from "./inputs/SentinelScmToolSelectInput";
import SentinelBitbucketWorkspaceSelectInput from "./inputs/SentinelBitbucketWorkspaceSelectInput";
import SentinelGitRepositorySelectInput from "./inputs/SentinelGitRepositorySelectInput";
import SentinelGitBranchSelectInput from "./inputs/SentinelGitBranchSelectInput";
import TextAreaInput from "../../../../../../../common/inputs/text/TextAreaInput";
import ParameterSelectListInputBase
  from "../../../../../../../common/list_of_values_input/parameters/ParameterSelectListInputBase";
import { faHandshake } from "@fortawesome/pro-light-svg-icons";
import SentinelTagsSelectInput from "./inputs/SentinalTagsSelectInput";

function SentinelStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, parentCallback, plan }) {
  const [isLoading, setIsLoading] = useState(true);
  const [jobType, setJobType] = useState("");
  const [sentinelStepConfigurationModel, setSentinelStepConfigurationModel] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");


  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);

    let { threshold, job_type } = stepTool;
    let sentinelConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, sentinelStepFormMetadata);

    setSentinelStepConfigurationModel(sentinelConfigurationData);

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
      configuration: sentinelStepConfigurationModel?.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    await parentCallback(item);
  };


  if (isLoading || sentinelStepConfigurationModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={sentinelStepConfigurationModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <SentinelScmToolTypeSelectInput model={sentinelStepConfigurationModel} setModel={setSentinelStepConfigurationModel} />
      <SentinelScmToolSelectInput model={sentinelStepConfigurationModel} setModel={setSentinelStepConfigurationModel} />
      <SentinelBitbucketWorkspaceSelectInput model={sentinelStepConfigurationModel} setModel={setSentinelStepConfigurationModel} />
      <SentinelGitRepositorySelectInput model={sentinelStepConfigurationModel} setModel={setSentinelStepConfigurationModel} />
      <SentinelGitBranchSelectInput model={sentinelStepConfigurationModel} setModel={setSentinelStepConfigurationModel} />
      <TextAreaInput dataObject={sentinelStepConfigurationModel} fieldName={"commands"} setDataObject={setSentinelStepConfigurationModel}/>
      <ParameterSelectListInputBase
        titleIcon={faHandshake}
        dataObject={sentinelStepConfigurationModel}
        setDataObject={setSentinelStepConfigurationModel}
        fieldName={"customParameters"}
        allowIncompleteItems={true}
        type={"Parameter"}
        regexValidationRequired={false}
        titleText={"Parameter Selection"}
        plan={plan}
      />
      <SentinelTagsSelectInput
        dataObject={sentinelStepConfigurationModel}
        setDataObject={setSentinelStepConfigurationModel}
        />
    </PipelineStepEditorPanelContainer>
  );
}

SentinelStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
  plan: PropTypes.array
};

export default SentinelStepConfiguration;
