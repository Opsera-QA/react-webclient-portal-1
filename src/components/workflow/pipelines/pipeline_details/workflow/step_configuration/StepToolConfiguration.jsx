import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PipelineActions from "../../../../pipeline-actions";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import JenkinsConfiguration from "./step_tool_configuration_forms/JenkinsStepConfiguration";
import JUnitStepConfiguration from "./step_tool_configuration_forms/JUnitStepConfiguration";
import XUnitStepConfiguration from "./step_tool_configuration_forms/XUnitStepConfiguration";
import SonarStepConfiguration from "./step_tool_configuration_forms/SonarStepConfiguration";
import NpmStepConfiguration from "./step_tool_configuration_forms/NpmStepConfiguration";
import CommandLineStepConfiguration from "./step_tool_configuration_forms/CommandLineStepConfiguration";
import TeamCityStepConfiguration from "./step_tool_configuration_forms/TeamCityStepConfiguration";
import GcpDeployStepConfiguration from "./step_tool_configuration_forms/GcpDeployStepConfiguration";
import AwsDeployStepConfiguration from "./step_tool_configuration_forms/AwsDeployStepConfiguration";
import JmeterStepConfiguration from "./step_tool_configuration_forms/JmeterStepConfiguration";
import SeleniumStepConfiguration from "./step_tool_configuration_forms/SeleniumStepConfiguration";
import TwistlockStepConfiguration from "./step_tool_configuration_forms/TwistlockStepConfiguration";
import S3StepConfiguration from "./step_tool_configuration_forms/S3StepConfiguration";
import DatabricksNotebookStepConfiguration from "./step_tool_configuration_forms/DatabricksNotebookStepConfiguration";
import SshUploadDeployStepConfiguration from "./step_tool_configuration_forms/SshUploadDeployStepConfiguration";
import ElasticBeanstalkDeployStepConfiguration from "./step_tool_configuration_forms/ElasticBeanstalkDeployStepConfiguration";
import SpinnakerStepConfiguration from "./step_tool_configuration_forms/SpinnakerStepConfiguration";
import ApprovalStepConfiguration from "./step_tool_configuration_forms/ApprovalStepConfiguration";
import CypressStepConfiguration from "./step_tool_configuration_forms/CypressStepConfiguration";
import DockerPushStepConfiguration from "./step_tool_configuration_forms/DockerPushStepConfiguration";
import ArgoCDStepConfiguration from "./step_tool_configuration_forms/ArgoCDStepConfiguration";
import AnchoreStepConfiguration from "./step_tool_configuration_forms/AnchoreStepConfiguration";
import AnchoreIntegratorStepConfiguration from "./step_tool_configuration_forms/AnchoreIntegratorStepConfiguration";
import SFDCStepConfiguration from "./step_tool_configuration_forms/SFDCStepConfiguration";
import {getErrorDialog} from "../../../../../common/toasts/toasts";

function StepToolConfiguration({
  pipeline,
  editItem,
  parentCallback,
  reloadParentPipeline,
  closeEditorPanel,
  setToast,
  setShowToast
}) {
  const contextType = useContext(AuthContext);
  const { plan } = pipeline.workflow;
  const [stepTool, setStepTool] = useState({});
  const [stepName, setStepName] = useState();
  const [stepId, setStepId] = useState("");
  const { getAccessToken } = contextType;

  useEffect(() => {
    let stepIndex = getStepIndex(editItem.step_id);
    setStepTool(plan[stepIndex].tool);
    setStepName(plan[stepIndex].name);
    setStepId(plan[stepIndex]._id);
  }, [editItem, pipeline]);

  const getStepIndex = (step_id) => {
    let stepArrayIndex = plan.findIndex((x) => x._id === step_id);
    return stepArrayIndex;
  };

  const callbackFunction = (tool) => {
    let stepArrayIndex = getStepIndex(editItem.step_id);
    plan[stepArrayIndex].tool.configuration = tool.configuration;
    plan[stepArrayIndex].tool.threshold = tool.threshold;
    plan[stepArrayIndex].tool.job_type = tool.job_type;
    parentCallback(plan);
    // setStepTool({});
  };

  const saveToVault = async (postBody) => {
    const response = await PipelineActions.saveToVault(
      postBody,
      getAccessToken
    );
    return response;
  };

  const createJob = async (
    toolId,
    toolConfiguration,
    stepId,
    createJobPostBody
  ) => {
    const { workflow } = pipeline;

    try {
      let pipelineResponse = {};
      const stepIndex = workflow.plan.findIndex((x) => x._id === stepId);
      workflow.plan[stepIndex].tool.configuration =
        toolConfiguration.configuration;
      workflow.plan[stepIndex].tool.threshold = toolConfiguration.threshold;
      workflow.plan[stepIndex].tool.job_type = toolConfiguration.job_type;
      pipelineResponse = await PipelineActions.updatePipeline(
        pipeline._id,
        { workflow: workflow },
        getAccessToken
      );
      const createJobResponse = await PipelineActions.createJob(
        toolId,
        createJobPostBody,
        getAccessToken
      );

      if (createJobResponse && createJobResponse.data.status === 200) {
        const { message } = createJobResponse.data;
        if (
          message &&
          typeof message.jobName === "string" &&
          message.jobName.length > 0
        ) {
          workflow.plan[stepIndex].tool.configuration.jobName = message.jobName;
          pipelineResponse = await PipelineActions.updatePipeline(
            pipeline._id,
            { workflow: workflow },
            getAccessToken
          );
        }

        await reloadParentPipeline();
        closeEditorPanel();
      } else {
        const errorMsg = `Service Unavailable. Error reported creating the job for toolId: ${toolId}.  Error returned: ${JSON.stringify(
          createJobResponse.data,
          null,
          2
        )}`;
        let toast = getErrorDialog(errorMsg, setShowToast, "detailPanelTop");
        setToast(toast);
        setShowToast(true);
      }
    } catch (error) {
      const errorMsg = `Error Creating and Saving Job Configuration for toolId: ${toolId} on $pipeline: ${
        pipeline._id
      }.  Error reported: ${JSON.stringify(error, null, 2)}`;
      let toast = getErrorDialog(errorMsg, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
    }
  };

  const getConfigurationTool = (toolName) => {
    switch (toolName) {
      case "jenkins":
        return (
          <JenkinsConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            createJob={createJob}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "junit":
        return (
          <JUnitStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            createJob={createJob}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "xunit":
        return (
          <XUnitStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            createJob={createJob}
            setShowToast={setShowToast}
            setToast={setToast}
          />
        );
      case "sonar":
        return (
          <SonarStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            createJob={createJob}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "command-line":
        return (
          <CommandLineStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            createJob={createJob}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "npm":
        return(
          <NpmStepConfiguration
            data={stepTool}
            parentCallback={callbackFunction}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "teamcity":
        return (
          <TeamCityStepConfiguration
            data={stepTool}
            parentCallback={callbackFunction}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "jmeter":
        return (
          <JmeterStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            createJob={createJob}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "selenium":
        return (
          <SeleniumStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            createJob={createJob}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "twistlock":
        return (
          <TwistlockStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            createJob={createJob}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "aws-deploy":
        return (
          <AwsDeployStepConfiguration
            data={stepTool}
            parentCallback={callbackFunction}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "gcp-deploy":
        return (
          <GcpDeployStepConfiguration
            data={stepTool}
            parentCallback={callbackFunction}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "s3":
        return (
          <S3StepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            createJob={createJob}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "databricks-notebook":
        return (
          <DatabricksNotebookStepConfiguration
            data={stepTool}
            parentCallback={callbackFunction}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "ssh-upload":
        return (
          <SshUploadDeployStepConfiguration
            pipelineId={pipeline._id}
            stepId={stepId}
            data={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "elastic-beanstalk":
        return (
          <ElasticBeanstalkDeployStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "spinnaker":
        return (
          <SpinnakerStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "approval":
        return (
          <ApprovalStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "cypress":
        return (
          <CypressStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            createJob={createJob}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "docker-push":
        return (
          <DockerPushStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            createJob={createJob}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "argo":
        return (
          <ArgoCDStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "anchore-scan":
        return (
          <AnchoreStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "anchore-integrator":
      {/*TODO: New Anchor step which is NOT setup yet.  This is related to OC-317/OC-391*/}
        return (
          <AnchoreIntegratorStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "sfdc-configurator":
        return (
          <SFDCStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            createJob={createJob}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
    }
  }

  return (
    <div>
      <h6 className="upper-case-first ml-1">
        {typeof stepName !== "undefined" ? stepName + ": " : null}
        {typeof stepTool !== "undefined" ? stepTool.tool_identifier : null}
      </h6>
      <div className="text-muted m-1">
        Select a tool and then configure settings for this step. To register
        additional tools, visit the <Link to="/inventory/tools">Tool Registry</Link>.
      </div>
      {typeof stepTool !== "undefined" ? (
        getConfigurationTool(editItem.tool_name.toLowerCase())
      ) : null}
    </div>
  );
}

//pipeline, editItem, parentCallback, reloadParentPipeline, closeEditorPanel
StepToolConfiguration.propTypes = {
  pipeline: PropTypes.object,
  editItem: PropTypes.object,
  parentCallback: PropTypes.func,
  reloadParentPipeline: PropTypes.func,
  closeEditorPanel: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func
};

export default StepToolConfiguration;
