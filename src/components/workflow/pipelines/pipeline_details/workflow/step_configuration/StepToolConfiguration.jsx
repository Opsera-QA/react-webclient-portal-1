import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PipelineActions from "../../../../pipeline-actions";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import JenkinsConfiguration from "./step_tool_configuration_forms/jenkins/JenkinsStepConfiguration";
import JUnitStepConfiguration from "./step_tool_configuration_forms/junit/JUnitStepConfiguration";
import XUnitStepConfiguration from "./step_tool_configuration_forms/xunit/XUnitStepConfiguration";
import SonarStepConfiguration from "./step_tool_configuration_forms/sonar/SonarStepConfiguration";
import NpmStepConfiguration from "./step_tool_configuration_forms/npm/NpmStepConfiguration";
import CommandLineStepConfiguration from "./step_tool_configuration_forms/command_line/CommandLineStepConfiguration";
import TeamCityStepConfiguration from "./step_tool_configuration_forms/team_city/TeamCityStepConfiguration";
import GcpDeployStepConfiguration from "./step_tool_configuration_forms/gcp/GcpDeployStepConfiguration";
import AwsDeployStepConfiguration from "./step_tool_configuration_forms/aws_deploy/AwsDeployStepConfiguration";
import JmeterStepConfiguration from "./step_tool_configuration_forms/jmeter/JmeterStepConfiguration";
import SeleniumStepConfiguration from "./step_tool_configuration_forms/selenium/SeleniumStepConfiguration";
import TwistlockStepConfiguration from "./step_tool_configuration_forms/twistlock/TwistlockStepConfiguration";
import S3StepConfiguration from "./step_tool_configuration_forms/s3/S3StepConfiguration";
import DatabricksNotebookStepConfiguration from "./step_tool_configuration_forms/databricks_notebook/DatabricksNotebookStepConfiguration";
import SshUploadDeployStepConfiguration from "./step_tool_configuration_forms/ssh_upload_deploy/SshUploadDeployStepConfiguration";
import ElasticBeanstalkDeployStepConfiguration from "./step_tool_configuration_forms/elastic_beanstalk_deploy/ElasticBeanstalkDeployStepConfiguration";
import SpinnakerStepConfiguration from "./step_tool_configuration_forms/spinnaker/SpinnakerStepConfiguration";
import ApprovalStepConfiguration from "./step_tool_configuration_forms/approval/ApprovalStepConfiguration";
import CypressStepConfiguration from "./step_tool_configuration_forms/cypress/CypressStepConfiguration";
import DockerPushStepConfiguration from "./step_tool_configuration_forms/docker_push/DockerPushStepConfiguration";
import AnchoreScanStepConfiguration from "./step_tool_configuration_forms/anchore_scan/AnchoreScanStepConfiguration";
import SFDCStepConfiguration from "./step_tool_configuration_forms/sfdc/SFDCStepConfiguration";
import NexusStepConfiguration from "./step_tool_configuration_forms/nexus/NexusStepConfiguration";
import ArgoCDStepConfiguration from "./step_tool_configuration_forms/argo_cd/ArgoCDStepConfiguration";
import TerraformStepConfiguration from "./step_tool_configuration_forms/terraform/TerraformStepConfiguration";
import OctopusStepConfiguration from "./step_tool_configuration_forms/octopus/OctopusStepConfiguration";
import EBSStepConfiguration from "./step_tool_configuration_forms/ebs/EBSStepConfiguration";
import {getErrorDialog} from "../../../../../common/toasts/toasts";
import pipelineActions from "../../../../pipeline-actions";
import ToastContext from "react-bootstrap/cjs/ToastContext";
import AnchoreIntegratorStepConfiguration
  from "./step_tool_configuration_forms/anchore_integrator/AnchoreIntegratorStepConfiguration";
import ChildPipelineStepConfiguration from "./step_tool_configuration_forms/child/ChildPipelineStepConfiguration";
import MockPipelineStepConfiguration from "./step_tool_configuration_forms/mock/MockPipelineStepConfiguration";
import ParallelProcessPipelineStepConfiguration
  from "./step_tool_configuration_forms/parallel_processor/ParallelProcessPipelineStepConfiguration";

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
  const [stepTool, setStepTool] = useState(undefined);
  const [stepName, setStepName] = useState(undefined);
  const [stepId, setStepId] = useState(undefined);
  const { getAccessToken } = contextType;
  const { toastContext } = useContext(ToastContext);

  useEffect(() => {
    loadData();
  }, [editItem, pipeline]);

  const loadData = async () => {
    let stepIndex = getStepIndex(editItem.step_id);
    setStepTool(plan[stepIndex].tool);
    setStepName(plan[stepIndex].name);
    setStepId(plan[stepIndex]._id);
  };

  const getStepIndex = (step_id) => {
    let stepArrayIndex = plan.findIndex((x) => x._id === step_id);
    return stepArrayIndex;
  };

  const callbackFunction = async (tool) => {
    let stepArrayIndex = getStepIndex(editItem.step_id);
    plan[stepArrayIndex].tool.configuration = tool.configuration;
    plan[stepArrayIndex].tool.threshold = tool.threshold;
    plan[stepArrayIndex].tool.job_type = tool.job_type;
    console.log("configuration: " + JSON.stringify(tool.configuration));
    console.log("plan: " + JSON.stringify(plan));
    await parentCallback(plan);
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
      const stepIndex = workflow.plan.findIndex((x) => x._id === stepId);

      workflow.plan[stepIndex].tool.configuration =
        toolConfiguration.configuration;
      workflow.plan[stepIndex].tool.threshold = toolConfiguration.threshold;
      workflow.plan[stepIndex].tool.job_type = toolConfiguration.job_type;

      await PipelineActions.updatePipeline(
        pipeline._id,
        { workflow: workflow },
        getAccessToken
      );


      // TODO: replace code below with this once all the different job types are registered in the new Node service
      //const createJobResponse = await pipelineActions.processStepJob(pipeline._id, stepId);

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

          await PipelineActions.updatePipeline(
            pipeline._id,
            { workflow: workflow },
            getAccessToken
          );
        }

        await reloadParentPipeline();

        closeEditorPanel();
      } else {

        const errorMsg = `Service Unavailable. Error reported by services creating the job for toolId: ${toolId}.  Please see browser logs for details.`;
        console.error(createJobResponse.data)

        let toast = getErrorDialog(errorMsg, setShowToast, "detailPanelTop");
        setToast(toast);
        setShowToast(true);
      }
    } catch (error) {

      const errorMsg = `Error Creating and Saving Job Configuration for toolId: ${toolId} on $pipeline: ${ pipeline._id }.  Please see browser logs for details.`;
      console.error(error);

      let toast = getErrorDialog(errorMsg, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
    }
  };

  const getToolsList = async (service) => {
    try {
      return await pipelineActions.getToolsList(service, getAccessToken);
    } catch (error) {
      toastContext.showErrorDialog(error);
    }
  };

  // TODO: Alphabetize, simplify props when refactoring each panel.
  //  just pass pipeline and pull id and plan inside instead of passing them individually,
  //  remove deprecated toasts and use toast contexts, wire up latest buttons,
  //  instead of passing in get tools list, use pipeline tool input etc..
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
            closeEditorPanel={closeEditorPanel}
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
            configurationData={stepTool}
            parentCallback={callbackFunction}
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
      // case "elastic-beanstalk":
      //   return (
      //     <ElasticBeanstalkDeployStepConfiguration
      //       pipelineId={pipeline._id}
      //       plan={pipeline.workflow.plan}
      //       stepId={stepId}
      //       stepTool={stepTool}
      //       parentCallback={callbackFunction}
      //       callbackSaveToVault={saveToVault}
      //       setToast={setToast}
      //       setShowToast={setShowToast}
      //     />
      //   );
      case "spinnaker":
        return (
          <SpinnakerStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            getToolsList={getToolsList}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "approval":
        return (
          <ApprovalStepConfiguration
            stepTool={stepTool}
            parentCallback={callbackFunction}
            closeEditorPanel={closeEditorPanel}
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
            getToolsList={getToolsList}
            setToast={setToast}
            setShowToast={setShowToast}
            closeEditorPanel={closeEditorPanel}
          />
        );
      case "anchore-scan":
        return (
          <AnchoreScanStepConfiguration
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
        return (
          <AnchoreIntegratorStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            getToolsList={getToolsList}
            setToast={setToast}
            setShowToast={setShowToast}
            closeEditorPanel={closeEditorPanel}
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
      case "nexus":
        return (
          <NexusStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            getToolsList={getToolsList}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "octopus":
        return (
          <OctopusStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            getToolsList={getToolsList}
            setToast={setToast}
            setShowToast={setShowToast}
            closeEditorPanel={closeEditorPanel}
          />
        );
      case "terraform": 
        return (
          <TerraformStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            getToolsList={getToolsList}
            setToast={setToast}
            setShowToast={setShowToast}
            closeEditorPanel={closeEditorPanel}
          />
        );
      case "elastic-beanstalk":
        return (
          <EBSStepConfiguration
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            getToolsList={getToolsList}
            setToast={setToast}
            setShowToast={setShowToast}
            closeEditorPanel={closeEditorPanel}
          />
        );
      case "child-pipeline":
        return (
          <ChildPipelineStepConfiguration
            pipelineId={pipeline._id}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            closeEditorPanel={closeEditorPanel}
          />
        );
      case "mock-step":
        return (
          <MockPipelineStepConfiguration
            stepTool={stepTool}
            parentCallback={callbackFunction}
            closeEditorPanel={closeEditorPanel}
          />
        );
      case "parallel-processor":
        return (
          <ParallelProcessPipelineStepConfiguration
            pipelineId={pipeline._id}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            closeEditorPanel={closeEditorPanel}
          />
        );
    }
  }

  return (
    <div>
      <div className="title-text-5 upper-case-first mb-3">
        {typeof stepName !== "undefined" ? stepName + ": " : null}
        {typeof stepTool !== "undefined" ? stepTool.tool_identifier : null}
      </div>

      {typeof stepTool !== "undefined" ? (
        getConfigurationTool(editItem.tool_name.toLowerCase())
      ) : null}

      <div className="text-muted small mt-2">Tools and Accounts can be saved in <Link to="/inventory/tools">Tool Registry</Link>.</div>
    </div>
  );
}

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
