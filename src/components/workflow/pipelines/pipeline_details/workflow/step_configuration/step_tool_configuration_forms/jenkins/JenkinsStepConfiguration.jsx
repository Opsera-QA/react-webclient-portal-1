import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import jenkinsPipelineStepConfigurationMetadata from "./jenkinsPipelineStepConfigurationMetadata";
import modelHelpers from "components/common/model/modelHelpers";


import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
//modified today
import JenkinsToolConfigIdSelectInput from "./inputs/jenkinsToolConfigIdSelectInput";
import JenkinsJobTypeSelectInput from "./inputs/jenkinsJobTypeSelectInput";
import Model from "core/data_model/model";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import JenkinsToolJobIdSelectInput from "./inputs/jenkinsToolJobIdSelectInput";
import JenkinsSfdcConfigurationPanel from "./inputs/jenkinsSfdcConfigurationPanel";
import JenkinsGitCredeintailSelectInput from "./inputs/jenkinsGitCredeintailSelectInput";
import JenkinsWorkspaceProjectSelectInput from "./inputs/jenkinsWorkspaceProjectSelectInput";
import JenkinsRepositorySelectInput from "./inputs/jenkinsRepositorySelectInput";
import JenkinsBranchPanel from "./inputs/jenkinsBranchPanel";
import JenkinsXmlStepInfoSelectInput from "./inputs/jenkinsXmlStepInfoSelectInput";
import JenkinsDockerPanel from "./inputs/jenkinsDockerPanel";
import JenkinsPythonPanel from "./inputs/jenkinsPythonPanel";
import JenkinsGradleMavenScriptFilePathPanel from "./inputs/jenkinsGradleMavenScriptFilePathPanel";
//This must match the form below and the data object expected.  Each tools' data object is different


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function JenkinsStepConfiguration({
  stepTool,
  pipelineId,
  plan,
  stepId,
  parentCallback,
  callbackSaveToVault,
  callbackGetFromVault,
  callbackDeleteFromVault,
  createJob,
  setToast,
  setShowToast,
  closeEditorPanel,
}) {
  const [jenkinsList, setJenkinsList] = useState([]);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  

  const [jenkinsStepConfigurationDto, setJenkinsStepConfigurationDto] = useState(undefined);
  const [jenkinsJobTypeDto, setJenkinsJobTypeDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

 

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold, job_type } = stepTool;
    let jenkinsConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      jenkinsPipelineStepConfigurationMetadata
    );

    setJenkinsStepConfigurationDto(jenkinsConfigurationData);
    if (job_type) {
     
      setJenkinsJobTypeDto(
        new Model(
          { job_type: job_type },
          {
            fields: [
              {
                label: "Jenkins - Job Type",
                id: "job_type",
              },
            ],
          },
          true
        )
      );
    }
    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }
    setIsLoading(false);
  };

  const callbackFunction = async () => {
    //if (validateRequiredFields()) {
    setIsLoading(true);

    const item = {
      configuration: jenkinsStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
      job_type: jenkinsJobTypeDto.data.job_type,
    };
    setIsLoading(false);
    parentCallback(item);
    // }
  };

  if (isLoading || jenkinsStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  const loadSfdcConfigurationPanel = () => {
    const jobType = jenkinsJobTypeDto.data.job_type;
    const toolJobType = jenkinsStepConfigurationDto?.data.toolJobType;
    if (["sfdc-ant-profile", "sfdc-ant"].includes(jobType) || toolJobType.includes("SFDC")) {
      return (
        <JenkinsSfdcConfigurationPanel
          dataObject={jenkinsStepConfigurationDto}
          setDataObject={setJenkinsStepConfigurationDto}
        />
      );
    }
  };

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={jenkinsStepConfigurationDto}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <JenkinsToolConfigIdSelectInput
        dataObject={jenkinsStepConfigurationDto}
        setDataObject={setJenkinsStepConfigurationDto}
        jenkinsList={jenkinsList}
        setJenkinsList={setJenkinsList}
      />
      <JenkinsJobTypeSelectInput
        dataObject={jenkinsStepConfigurationDto}
        setDataObject={setJenkinsStepConfigurationDto}
        jobTypeObject={jenkinsJobTypeDto}
        setJobTypeObject={setJenkinsJobTypeDto}
      />
      {jenkinsJobTypeDto && jenkinsJobTypeDto.data.job_type === "job" ? (
        <div className={"mb-3"}>
          {jenkinsStepConfigurationDto.data.jobName}
          <TextInputBase
            fieldName={"jobName"}
            dataObject={jenkinsStepConfigurationDto}
            setDataObject={setJenkinsStepConfigurationDto}
          />
        </div>
      ) : (
        <>
          <JenkinsToolJobIdSelectInput
            jenkinsList={jenkinsList}
            jobType={jenkinsJobTypeDto?.data.job_type}
            dataObject={jenkinsStepConfigurationDto}
            setDataObject={setJenkinsStepConfigurationDto}
          />
          {loadSfdcConfigurationPanel()}
          <JenkinsGitCredeintailSelectInput dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} jenkinsList={jenkinsList} />
          <JenkinsWorkspaceProjectSelectInput dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} />
          <JenkinsRepositorySelectInput dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} />
          <JenkinsBranchPanel dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} jenkinsList={jenkinsList} />
          <JenkinsXmlStepInfoSelectInput dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} plan={plan} stepId={stepId} />
          <JenkinsDockerPanel dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} />
          <JenkinsPythonPanel dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} />
          <JenkinsGradleMavenScriptFilePathPanel  dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} />
        </>
      )}

     
    </PipelineStepEditorPanelContainer>
  );
}

JenkinsStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  pipelineId: PropTypes.string,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  createJob: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func,
  closeEditorPanel: PropTypes.func,
  callbackGetFromVault: PropTypes.func,
  callbackDeleteFromVault: PropTypes.func,
};

export default JenkinsStepConfiguration;
