import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PipelineActions from "../../../../pipeline-actions";
import { AuthContext } from "../../../../../../contexts/AuthContext";
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
import ApprovalGateStepConfiguration from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/approval_gate/ApprovalGateStepConfiguration";
import LegacyCypressStepConfiguration from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/LegacyCypressStepConfiguration";
import DockerPushStepConfiguration from "./step_tool_configuration_forms/docker_push/DockerPushStepConfiguration";
import AnchoreScanStepConfiguration from "./step_tool_configuration_forms/anchore_scan/AnchoreScanStepConfiguration";
import SFDCStepConfiguration from "./step_tool_configuration_forms/sfdc/SFDCStepConfiguration";
import NexusStepConfiguration from "./step_tool_configuration_forms/nexus/NexusStepConfiguration";
import ArgoCdStepConfiguration from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/argo_cd/ArgoCdStepConfiguration";
import TerraformStepConfiguration from "./step_tool_configuration_forms/terraform/TerraformStepConfiguration";
import OctopusStepConfiguration from "./step_tool_configuration_forms/octopus/OctopusStepConfiguration";
import EBSStepConfiguration from "./step_tool_configuration_forms/ebs/EBSStepConfiguration";
import AnchoreIntegratorStepConfiguration
  from "./step_tool_configuration_forms/anchore_integrator/AnchoreIntegratorStepConfiguration";
import ChildPipelineStepConfiguration from "./step_tool_configuration_forms/child/ChildPipelineStepConfiguration";
import MockPipelineStepConfiguration from "./step_tool_configuration_forms/mock/MockPipelineStepConfiguration";
import ParallelProcessPipelineStepConfiguration
  from "./step_tool_configuration_forms/parallel_processor/ParallelProcessPipelineStepConfiguration";
import ConditionalOperationPipelineStepConfiguration
  from "./step_tool_configuration_forms/conditional_operation/ConditionalOperationPipelineStepConfiguration";
import PowershellStepConfiguration from "./step_tool_configuration_forms/powershell/PowershellStepConfiguration";
import DotNetStepConfiguration from "./step_tool_configuration_forms/dotnet/DotNetStepConfiguration";
import DotNetCliStepConfiguration from "./step_tool_configuration_forms/dotnetcli/DotNetCliStepConfiguration";
import {DialogToastContext} from "contexts/DialogToastContext";
import NUnitStepConfiguration from "./step_tool_configuration_forms/nunit/NUnitStepConfiguration";
import JFrogDockerStepConfiguration
  from "./step_tool_configuration_forms/jfrog_artifactory_docker/JFrogDockerStepConfiguration";
import TerrascanStepConfiguration from "./step_tool_configuration_forms/terrascan/TerrascanStepConfiguration";
import AzureDevopsStepConfiguration
  from "./step_tool_configuration_forms/azure_devops/AzureDevopsStepToolConfiguration";
import KafkaConnectStepConfiguration from "./step_tool_configuration_forms/kafka_connect/KafkaConnectStepConfiguration";
import AwsEcsDeployStepConfiguration
  from "./step_tool_configuration_forms/aws_ecs_deploy/AwsEcsDeployStepConfiguration";
import CoverityStepConfiguration from "./step_tool_configuration_forms/coverity/CoverityStepConfiguration";
import AzureAcrPushStepConfiguration from "./step_tool_configuration_forms/azure_acr_push/AzureAcrPushStepConfiguration";
import JFrogMavenStepConfiguration 
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jfrog_artifactory_maven/JFrogMavenStepConfiguration";
import AwsLambdaDeployStepConfiguration
  from "./step_tool_configuration_forms/aws_lambda_publish/AwsLambdaDeployStepConfiguration";
import MongodbRealmStepConfiguration from "./step_tool_configuration_forms/mongodb_realm/MongodbRealmStepConfiguration";
import AksServiceDeployStepConfiguration
  from "./step_tool_configuration_forms/aks_service_deploy/AksServiceDeployStepConfiguration";
import AzureFunctionsStepConfiguration from "./step_tool_configuration_forms/azure_functions/AzureFunctionsStepConfiguration";
import AnsibleStepConfiguration from "./step_tool_configuration_forms/ansible/AnsibleStepConfiguration";
import JenkinsStepConfiguration
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/JenkinsStepConfiguration";
import CypressStepConfiguration
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/CypressStepConfiguration";
import FlywayDatabaseStepConfiguration
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/FlywayDatabaseStepConfiguration";
import InformaticaStepConfiguration from "./step_tool_configuration_forms/informatica/InformaticaStepConfiguration";
import PmdScanStepConfiguration
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/pmd_scan/PmdScanStepConfiguration";
import AzureZipDeploymentStepConfiguration
  from "./step_tool_configuration_forms/azure_zip_deployment/AzureZipDeploymentStepConfiguration";
import {hasStringValue} from "components/common/helpers/string-helpers";
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
  const toastContext = useContext(DialogToastContext);

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
    // console.log("configuration: " + JSON.stringify(tool.configuration));
    // console.log("plan: " + JSON.stringify(plan));
    return await parentCallback(plan);
    // setStepTool({});
  };

  const saveToVault = async (postBody) => {
    const response = await PipelineActions.saveToVault(
      postBody,
      getAccessToken
    );
    return response;
  };

  const getFromVault = async (vaultId) => {
    const response = await PipelineActions.getFromVault(
      vaultId,
      getAccessToken
    );
    return response;
  };

  const deleteFromVaultUsingVaultKey = async (vaultId) => {
    const response = await PipelineActions.deleteFromVaultUsingVaultKey(
      vaultId,
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
        console.error(createJobResponse.data);
        toastContext.showCreateFailureResultDialog(errorMsg);
      }
    } catch (error) {

      const errorMsg = `Error Creating and Saving Job Configuration for toolId: ${toolId} on $pipeline: ${ pipeline._id }.  Please see browser logs for details.`;
      console.error(error);
      toastContext.showCreateFailureResultDialog(errorMsg);
    }
  };

  const createCoverityJob = async (
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

      const createJobResponse = await PipelineActions.createCoverityJob(
        toolId,
        createJobPostBody,
        getAccessToken,
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
        console.error(createJobResponse.data);
        toastContext.showCreateFailureResultDialog(errorMsg);
      }
    } catch (error) {

      const errorMsg = `Error Creating and Saving Job Configuration for toolId: ${toolId} on $pipeline: ${pipeline._id}.  Please see browser logs for details.`;
      console.error(error);
      toastContext.showCreateFailureResultDialog(errorMsg);
    }
  };

  const createTwistlockJob = async (
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

      const createJobResponse = await PipelineActions.createTwistlockJob(
        toolId,
        createJobPostBody,
        getAccessToken,
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
        console.error(createJobResponse.data);
        toastContext.showCreateFailureResultDialog(errorMsg);
      }
    } catch (error) {

      const errorMsg = `Error Creating and Saving Job Configuration for toolId: ${toolId} on $pipeline: ${pipeline._id}.  Please see browser logs for details.`;
      console.error(error);
      toastContext.showCreateFailureResultDialog(errorMsg);
    }
  };

  const createMongodbRealmJob = async (
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

      const createJobResponse = await PipelineActions.createMongodbRealmJob(
        toolId,
        createJobPostBody,
        getAccessToken,
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
        console.error(createJobResponse.data);
        toastContext.showCreateFailureResultDialog(errorMsg);
      }
    } catch (error) {

      const errorMsg = `Error Creating and Saving Job Configuration for toolId: ${toolId} on $pipeline: ${pipeline._id}.  Please see browser logs for details.`;
      console.error(error);
      toastContext.showCreateFailureResultDialog(errorMsg);
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
          <JenkinsStepConfiguration
            stepTool={stepTool}
            plan={pipeline?.workflow?.plan}
            stepId={stepId}            
            closeEditorPanel={closeEditorPanel}
            createJob={createJob}
            pipelineId={pipeline._id}
            parentCallback={callbackFunction}
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
            stepId={stepId}
            stepTool={stepTool}
            createJob={createJob}
            closeEditorPanel={closeEditorPanel}
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
            closeEditorPanel={closeEditorPanel}
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
            createJob={createTwistlockJob}
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
            plan={pipeline?.workflow?.plan}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            closeEditorPanel={closeEditorPanel}
            stepId={stepId}
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
            setToast={setToast}
            setShowToast={setShowToast}
          />
        );
      case "approval":
        return (
          <ApprovalGateStepConfiguration
            stepTool={stepTool}
            parentCallback={callbackFunction}
            closeEditorPanel={closeEditorPanel}
          />
        );
      case "cypress":
        return (
          // <CypressStepConfiguration
          //   pipelineId={pipeline._id}
          //   stepId={stepId}
          //   stepTool={stepTool}
          //   parentCallback={callbackFunction}
          //   createJob={createJob}
          //   closeEditorPanel={closeEditorPanel}
          // />

          <LegacyCypressStepConfiguration
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
          <ArgoCdStepConfiguration
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
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
            setToast={setToast}
            setShowToast={setShowToast}
            closeEditorPanel={closeEditorPanel}
          />
        );
        case "ansible":
          return (
            <AnsibleStepConfiguration
              stepTool={stepTool}
              stepId={stepId}
              parentCallback={callbackFunction}
              callbackSaveToVault={saveToVault}
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
            closeEditorPanel={closeEditorPanel}
            createJob={createJob}
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
      case "conditional-operator":
        return (
          <ConditionalOperationPipelineStepConfiguration
            pipelineId={pipeline._id}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            closeEditorPanel={closeEditorPanel}
          />
        );
      case "powershell":
        return (
          <PowershellStepConfiguration
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
      case "dotnet":
        return (
          <DotNetStepConfiguration
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
      case "dotnet-cli":
        return (
          <DotNetCliStepConfiguration
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
      case "nunit":
        return (
          <NUnitStepConfiguration
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
      case "jfrog_artifactory_docker":
        return (
          <JFrogDockerStepConfiguration
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
      case "jfrog_artifactory_maven":
        return (
          <JFrogMavenStepConfiguration
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
      case "terrascan":
        return (
          <TerrascanStepConfiguration
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
      case "azure-devops":
        return (
          <AzureDevopsStepConfiguration
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
      case "kafka_connect":
        return (
          <KafkaConnectStepConfiguration
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
      case "aws_ecs_deploy":
        return (
          <AwsEcsDeployStepConfiguration
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
      case "coverity":
        return (
          <CoverityStepConfiguration 
            pipelineId={pipeline._id}
            plan={pipeline.workflow.plan}
            stepId={stepId}
            stepTool={stepTool}
            parentCallback={callbackFunction}
            callbackSaveToVault={saveToVault}
            createJob={createCoverityJob}
            setToast={setToast}
            setShowToast={setShowToast}
            closeEditorPanel={closeEditorPanel}
          />
        );
      case "azure_acr_push":
        return(<AzureAcrPushStepConfiguration
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
    case "aws_lambda":
      return (
        <AwsLambdaDeployStepConfiguration
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
    case "mongodb_realm":
      return (
        <MongodbRealmStepConfiguration
          pipelineId={pipeline._id}
          plan={pipeline.workflow.plan}
          stepId={stepId}
          stepTool={stepTool}
          parentCallback={callbackFunction}
          callbackSaveToVault={saveToVault}
          createJob={createMongodbRealmJob}
          setToast={setToast}
          setShowToast={setShowToast}
        />
      );
    case "azure_aks_deploy":
      return (
        <AksServiceDeployStepConfiguration
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
    case "azure-functions":
      return (
        <AzureFunctionsStepConfiguration
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
    case "flyway-database-migrator":
      return (
        <FlywayDatabaseStepConfiguration
          pipelineId={pipeline._id}
          plan={pipeline.workflow.plan}
          stepId={stepId}
          stepTool={stepTool}
          parentCallback={callbackFunction}
          closeEditorPanel={closeEditorPanel}
        />
      );    
    case "informatica":
      return (
        <InformaticaStepConfiguration
          pipelineId={pipeline._id}
          plan={pipeline.workflow.plan}
          stepId={stepId}
          stepTool={stepTool}
          parentCallback={callbackFunction}
          closeEditorPanel={closeEditorPanel}
        />
      );
    case "pmd":
      return (
        <PmdScanStepConfiguration
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
      case "azure-zip-deployment":
        return (
          <AzureZipDeploymentStepConfiguration
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
    }
  };

  const getTitleText = () => {
    let titleText = "";

    if (hasStringValue(stepName) === true) {
      titleText += `${stepName}: `;
    }

    if (hasStringValue(stepTool?.tool_identifier)) {
      titleText += stepTool.tool_identifier;
    }

    return titleText;
  };

  return (
    <div>
      <div className="title-text-5 upper-case-first mb-3">
        {getTitleText()}
      </div>

      {typeof stepTool !== "undefined" ? (
        getConfigurationTool(editItem.tool_name.toLowerCase())
      ) : null}

      <div className="text-muted small my-2">Tools and Accounts can be saved in <Link to="/inventory/tools">Tool Registry</Link>.</div>
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
