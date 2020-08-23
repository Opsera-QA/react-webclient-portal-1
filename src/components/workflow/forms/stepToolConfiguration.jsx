import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PipelineActions from "../pipeline-actions";
import { AuthContext } from "../../../contexts/AuthContext";
import JenkinsConfiguration from "./jenkins";
import JunitStepConfiguration from "./junit";
import XunitStepConfiguration from "./xunit";
import SonarStepConfiguration from "./sonar";
import NPMStepConfiguration from "./npm";
import CommandLineStepConfiguration from "./commandLine";
import TeamCityStepConfiguration from "./teamCity";
import GcpDeployStepConfiguration from "./gcp-deploy";
import AwsDeployStepConfiguration from "./aws-deploy";
import JmeterStepConfiguration from "./jmeter";
import SeleniumStepConfiguration from "./selenium";
import TwistlockStepConfiguration from "./twistlock";
import S3StepConfiguration from "./S3";
import DatabricksNotebookConfiguration from "./databricks-notebook";
import SshUploadDeploy from "./ssh-upload";
import ElasticBeanstalkDeploy from "./elastic-beanstalk";
import SpinnakerStepConfiguration from "./spinnaker";
import ApprovalStepConfiguration from "./approval";
import CypressStepConfiguration from "./cypress";
import DockerPushStepConfiguration from "./docker-push";
import ArgoCDStepConfiguration from "./argocd";
import AnchoreStepConfiguration from "./anchore";
import AnchoreIntegratorStepConfiguration from "./anchore-integrator";
import SFDCStepConfiguration from "./sfdc";
import ErrorDialog from "components/common/status_notifications/error";

function StepToolConfiguration({
  pipeline,
  editItem,
  parentCallback,
  reloadParentPipeline,
  closeEditorPanel,
}) {
  const contextType = useContext(AuthContext);
  const { plan } = pipeline.workflow;
  const [error, setErrors] = useState(false);
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
    setStepTool({});
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
      pipelineResponse = await PipelineActions.save(
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
          pipelineResponse = await PipelineActions.save(
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
        setErrors(errorMsg);
      }
    } catch (error) {
      const errorMsg = `Error Creating and Saving Job Configuration for toolId: ${toolId} on $pipeline: ${
        pipeline._id
      }.  Error reported: ${JSON.stringify(error, null, 2)}`;
      setErrors(errorMsg);
    }
  };

  return (
    <div>
      <h6 className="upper-case-first ml-1">
        {typeof stepName !== "undefined" ? stepName + ": " : null}
        {typeof stepTool !== "undefined" ? stepTool.tool_identifier : null}
      </h6>
      <div className="text-muted m-1">
        Select a tool and then configure settings for this step. To register
        additional tools, visit the{" "}
        <Link to="/inventory/tools">Tool Registry</Link>.
      </div>

      {error && <ErrorDialog error={error} align={"top"} setError={setErrors}/>}


      {typeof stepTool !== "undefined" && !error ? (
        <div className="ml-1 mt-3">
          {editItem.tool_name.toLowerCase() === "jenkins" ? (
            <JenkinsConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
              createJob={createJob}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "junit" ? (
            <JunitStepConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
              createJob={createJob}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "xunit" ? (
            <XunitStepConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
              createJob={createJob}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "sonar" ? (
            <SonarStepConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
              createJob={createJob}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "command-line" ? (
            <CommandLineStepConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
              createJob={createJob}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "npm" ? (
            <NPMStepConfiguration
              data={stepTool}
              parentCallback={callbackFunction}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "teamcity" ? (
            <TeamCityStepConfiguration
              data={stepTool}
              parentCallback={callbackFunction}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "jmeter" ? (
            <JmeterStepConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
              createJob={createJob}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "selenium" ? (
            <SeleniumStepConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
              createJob={createJob}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "twistlock" ? (
            <TwistlockStepConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
              createJob={createJob}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "aws-deploy" ? (
            <AwsDeployStepConfiguration
              data={stepTool}
              parentCallback={callbackFunction}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "gcp-deploy" ? (
            <GcpDeployStepConfiguration
              data={stepTool}
              parentCallback={callbackFunction}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "s3" ? (
            <S3StepConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
              createJob={createJob}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "databricks-notebook" ? (
            <DatabricksNotebookConfiguration
              data={stepTool}
              parentCallback={callbackFunction}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "ssh-upload" ? (
            <SshUploadDeploy
              pipelineId={pipeline._id}
              stepId={stepId}
              data={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "elastic-beanstalk" ? (
            <ElasticBeanstalkDeploy
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "spinnaker" ? (
            <SpinnakerStepConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "approval" ? (
            <ApprovalStepConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "cypress" ? (
            <CypressStepConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
              createJob={createJob}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "docker-push" ? (
            <DockerPushStepConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
              createJob={createJob}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "argo" ? (
            <ArgoCDStepConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "anchore-scan" ? (
            <AnchoreStepConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
            />
          ) : null}

          {/*TODO: New Anchor step which is NOT setup yet.  This is related to OC-317/OC-391*/}
          {editItem.tool_name.toLowerCase() === "anchore-integrator" ? (
            <AnchoreIntegratorStepConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
            />
          ) : null}
          {editItem.tool_name.toLowerCase() === "sfdc-configurator" ? (
            <SFDCStepConfiguration
              pipelineId={pipeline._id}
              plan={pipeline.workflow.plan}
              stepId={stepId}
              stepTool={stepTool}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
              createJob={createJob}
            />
          ) : null}
        </div>
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
};

export default StepToolConfiguration;
