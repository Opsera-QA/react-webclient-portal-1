import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import jenkinsPipelineStepConfigurationMetadata from "./jenkinsPipelineStepConfigurationMetadata";
import modelHelpers from "components/common/model/modelHelpers";


import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import JenkinsToolConfigIdSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsToolConfigIdSelectInput";
import JenkinsJobTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsJobTypeSelectInput";
import Model from "core/data_model/model";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import JenkinsToolJobIdSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsToolJobIdSelectInput";
import JenkinsSfdcConfigurationPanel from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsSfdcConfigurationPanel";
import JenkinsGitCredentialsSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsGitCredentialsSelectInput";
import JenkinsWorkspaceProjectSelectInput from "./inputs/jenkinsWorkspaceProjectSelectInput";
import JenkinsRepositorySelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsRepositorySelectInput";
import JenkinsStepConfigurationBranchEditorPanel from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsStepConfigurationBranchEditorPanel";
import JenkinsXmlStepInfoSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsXmlStepInfoSelectInput";
import JenkinsStepConfigurationDockerEditorPanel from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsStepConfigurationDockerEditorPanel";
import JenkinsPythonPanel from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsStepConfigurationPythonEditorPanel";
import JenkinsGradleMavenScriptFilePathPanel from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsGradleMavenScriptFilePathPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";

function JenkinsStepConfiguration({
  stepTool,
  plan,
  stepId,
  parentCallback,
  closeEditorPanel,
}) {
  const toastContext = useContext(DialogToastContext);
  const [jenkinsList, setJenkinsList] = useState([]);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [jenkinsStepConfigurationDto, setJenkinsStepConfigurationDto] = useState(undefined);
  const [jenkinsJobTypeDto, setJenkinsJobTypeDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
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
      let { threshold, job_type } = stepTool;
      let jenkinsConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
        stepTool,
        jenkinsPipelineStepConfigurationMetadata
      );

      setJenkinsStepConfigurationDto(jenkinsConfigurationData);

      // TODO: This should be metadata
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
    }
    catch (error) {
      console.error(error);
      // todo add toas message
    }
    finally {

    }
  };

  const callbackFunction = async () => {
    setIsLoading(true);

    const item = {
      configuration: jenkinsStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
      job_type: jenkinsJobTypeDto.getData("job_type"),
    };
    setIsLoading(false);
    parentCallback(item);
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

  const getJobForm = () => {
    if (jenkinsJobTypeDto?.getData("job_type") === "job") {
      return (
        <div className={"mb-3"}>
          {jenkinsStepConfigurationDto.getData("jobName")}
          <TextInputBase
            fieldName={"jobName"}
            dataObject={jenkinsStepConfigurationDto}
            setDataObject={setJenkinsStepConfigurationDto}
          />
        </div>
      );
    }

    return (
      <div>
        <JenkinsToolJobIdSelectInput
          jenkinsList={jenkinsList}
          jobType={jenkinsJobTypeDto?.data.job_type}
          dataObject={jenkinsStepConfigurationDto}
          setDataObject={setJenkinsStepConfigurationDto}
        />
        {loadSfdcConfigurationPanel()}
        <JenkinsGitCredentialsSelectInput
          dataObject={jenkinsStepConfigurationDto}
          setDataObject={setJenkinsStepConfigurationDto}
          jenkinsList={jenkinsList}
          toolConfigId={jenkinsStepConfigurationDto?.getData("toolConfigId")}
        />
        <JenkinsWorkspaceProjectSelectInput
          dataObject={jenkinsStepConfigurationDto}
          setDataObject={setJenkinsStepConfigurationDto}
          service={jenkinsStepConfigurationDto.getData("service")}
          gitToolId={jenkinsStepConfigurationDto.getData("gitToolId")}
        />
        <JenkinsRepositorySelectInput
          dataObject={jenkinsStepConfigurationDto}
          setDataObject={setJenkinsStepConfigurationDto}
          service={jenkinsStepConfigurationDto.getData("service")}
          gitToolId={jenkinsStepConfigurationDto.getData("gitToolId")}
        />
        <JenkinsStepConfigurationBranchEditorPanel dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} jenkinsList={jenkinsList} />
        <JenkinsXmlStepInfoSelectInput dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} plan={plan} stepId={stepId} />
        <JenkinsStepConfigurationDockerEditorPanel dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} />
        <JenkinsPythonPanel dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} />
        <JenkinsGradleMavenScriptFilePathPanel  dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} />
      </div>
    );
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
      {getJobForm()}
    </PipelineStepEditorPanelContainer>
  );
}

JenkinsStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  closeEditorPanel: PropTypes.func,
};

export default JenkinsStepConfiguration;
