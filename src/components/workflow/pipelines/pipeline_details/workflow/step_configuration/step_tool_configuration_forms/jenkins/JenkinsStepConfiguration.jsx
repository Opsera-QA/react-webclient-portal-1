import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import jenkinsPipelineStepConfigurationMetadata from "./jenkinsPipelineStepConfigurationMetadata";
import modelHelpers from "components/common/model/modelHelpers";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import JenkinsToolConfigIdSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsToolConfigIdSelectInput";
import JenkinsJobTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsJobTypeSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import JenkinsSfdcConfigurationPanel from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsSfdcConfigurationPanel";
import JenkinsGitCredentialsSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsGitCredentialsSelectInput";
import JenkinsWorkspaceProjectSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsWorkspaceProjectSelectInput";
import JenkinsRepositorySelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsRepositorySelectInput";
import JenkinsStepConfigurationBranchEditorPanel from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsStepConfigurationBranchEditorPanel";
import JenkinsXmlStepInfoSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsXmlStepInfoSelectInput";
import JenkinsStepConfigurationDockerEditorPanel from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsStepConfigurationDockerEditorPanel";
import JenkinsPythonPanel from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsStepConfigurationPythonEditorPanel";
import JenkinsGradleMavenScriptFilePathPanel from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsGradleMavenScriptFilePathPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import JenkinsToolJobIdSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/JenkinsToolJobIdSelectInput";
import JenkinsDependencyTypeInput from "./inputs/JenkinsDependencyTypeInput";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";

function JenkinsStepConfiguration({
  stepTool,
  plan,
  stepId,
  createJob,
  closeEditorPanel,
  pipelineId,
  parentCallback
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [jenkinsList, setJenkinsList] = useState([]);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [jenkinsStepConfigurationDto, setJenkinsStepConfigurationDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);


  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;


    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let { threshold, job_type } = stepTool;
      let jenkinsConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
        stepTool,
        jenkinsPipelineStepConfigurationMetadata
      );
      jenkinsConfigurationData.setData('job_type',job_type);

      setJenkinsStepConfigurationDto(jenkinsConfigurationData);

      if (threshold) {
        setThresholdType(threshold?.type);
        setThresholdValue(threshold?.value);
      }
    }
    catch (error) {
      console.error(error);
      toastContext.showErrorDialog(error);
    }
    finally {
      setIsLoading(false);
      await getJenkinsTools(cancelSource);
    }
  };

  // TODO: This is temporary to allow changes to the form without rewriting the whole thing.
  //  I need to rework the dropdowns that expect jenkinsList to be passed in.
  const getJenkinsTools = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolsByIdentifier(getAccessToken, cancelSource, "jenkins");
    const tools = response?.data?.data;

    if (Array.isArray(tools)) {
        const filteredTools = tools?.filter((tool) => {return tool.configuration != null && Object.entries(tool.configuration).length > 0; });
        setJenkinsList(filteredTools);
    }
  };


  const handleCreateAndSave = async () => {
    const toolId = jenkinsStepConfigurationDto.getData("toolConfigId");
    if (toolId) {
      // setLoading(true);

      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
        buildParams: {
          stepId: jenkinsStepConfigurationDto.getData("stepIdXML"),
        },
      };

      const toolConfiguration = {
        configuration: jenkinsStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: jenkinsStepConfigurationDto.getData("job_type"),
      };
      if(jenkinsStepConfigurationDto.getData("job_type") === "opsera-job"){
        await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
      } else {
        parentCallback(toolConfiguration);
      }
    }
  };

  if (isLoading || jenkinsStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  const loadSfdcConfigurationPanel = () => {
    const jobType = jenkinsStepConfigurationDto?.getData("job_type");
    const toolJobType = jenkinsStepConfigurationDto?.getData("toolJobType");
      if ((jobType  && (["sfdc-ant-profile", "sfdc-ant"]).some(item=>item === jobType ? jobType :"")) || 
          (toolJobType  && toolJobType.some(item=>item==="SFDC"))) {
      return (
        <JenkinsSfdcConfigurationPanel
          dataObject={jenkinsStepConfigurationDto}
          setDataObject={setJenkinsStepConfigurationDto}
        />
      );
    }
  };

  const getJobForm = () => {
    if (jenkinsStepConfigurationDto?.getData("job_type") === "job") {
      return (
        <div className={"mb-3"}>
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
          dataObject={jenkinsStepConfigurationDto}
          setDataObject={setJenkinsStepConfigurationDto}
          toolConfigId={jenkinsStepConfigurationDto?.getData("toolConfigId")}
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
        <JenkinsPythonPanel dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} plan={plan}  stepId={stepId} />
        <JenkinsGradleMavenScriptFilePathPanel  dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} />
      </div>
    );
  };

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={jenkinsStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <JenkinsToolConfigIdSelectInput
        model={jenkinsStepConfigurationDto}
        setModel={setJenkinsStepConfigurationDto}
      />
      <JenkinsJobTypeSelectInput
        dataObject={jenkinsStepConfigurationDto}
        setDataObject={setJenkinsStepConfigurationDto}   
      />
      {getJobForm()}
      <JenkinsDependencyTypeInput dataObject={jenkinsStepConfigurationDto} setDataObject={setJenkinsStepConfigurationDto} />
    </PipelineStepEditorPanelContainer>
  );
}

JenkinsStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  closeEditorPanel: PropTypes.func,
  pipelineId: PropTypes.string,
  parentCallback: PropTypes.func,
};

export default JenkinsStepConfiguration;
