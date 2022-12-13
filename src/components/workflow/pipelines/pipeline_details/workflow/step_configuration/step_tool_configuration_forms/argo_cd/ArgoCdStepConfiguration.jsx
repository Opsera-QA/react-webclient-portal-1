import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import { DialogToastContext } from "contexts/DialogToastContext";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import ArgoCdStepSourceControlManagementToolIdentifierSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/argo_cd/inputs/ArgoCdStepSourceControlManagementToolIdentifierSelectInput";
import {ArgoCdStepConfigurationMetadata}
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/argo_cd/argoCdStepConfiguration.metadata";
import ArgoCdStepSourceControlManagementToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/argo_cd/inputs/ArgoCdStepSourceControlManagementToolSelectInput";
import ArgoCdStepBitbucketWorkspaceInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/argo_cd/inputs/ArgoCdStepBitbucketWorkspaceInput";
import ArgoCdStepGitRepositorySelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/argo_cd/inputs/ArgoCdStepGitRepositorySelectInput";
import ArgoCdStepGitBranchSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/argo_cd/inputs/ArgoCdStepGitBranchSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import ArgoCdApplicationSelectInput
  from "components/common/list_of_values_input/tools/argo_cd/application/ArgoCdApplicationSelectInput";
import {hasStringValue} from "components/common/helpers/string-helpers";
import ArgoCdStepArgoToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/argo_cd/inputs/ArgoCdStepArgoToolSelectInput";
import ArgoCdStepPipelineStepSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/argo_cd/inputs/ArgoCdStepPipelineStepSelectInput";
import ArgoCdRepositoryTagSelectInput
  from "components/common/list_of_values_input/tools/argo_cd/tags/ArgoCdRepositoryTagSelectInput";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import ArgoBlueGreenDeploymentHelpDocumentation 
  from "components/common/help/documentation/pipelines/step_configuration/fields/ArgoBlueGreenDeploymentHelpDocumentation";
import ArgoCdStepKustomizeBooleanInput from "./inputs/ArgoCdStepKustomizeBooleanInput";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";
import ArgoClusterSelectInput from "components/common/list_of_values_input/tools/argo_cd/cluster/ArgoClusterSelectInput";

function ArgoCdStepConfiguration({ stepTool, plan, stepId, parentCallback, closeEditorPanel, pipelineId }) {
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [argoCdModel, setArgoCdModel] = useState(undefined);
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
      const parsedModel = modelHelpers.parseObjectIntoModel(stepTool?.configuration, ArgoCdStepConfigurationMetadata);
      setArgoCdModel(parsedModel);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const callbackFunction = async () => {
    const item = {
      configuration: argoCdModel.getPersistData(),
      threshold: {
        type: stepTool?.threshold?.type || "",
        value:  stepTool?.threshold?.value || "",
      },
    };
    parentCallback(item);
  };

  const getRollbackRepositorySelect = () => {
    if (argoCdModel?.getData("rollbackEnabled") === true) {
      return (
        <ArgoCdRepositoryTagSelectInput
          fieldName={"repositoryTag"}
          model={argoCdModel}
          setModel={setArgoCdModel}
          pipelineId={pipelineId}
          stepId={argoCdModel?.getData("dockerStepID")}
          toolIdentifier={pipelineHelpers.getToolIdentifierFromPlanForStepId(plan, argoCdModel?.getData("dockerStepID"))}
          valueField={"value"}
          plan={plan}
        />
      );
    }
  };

  const getRollbackInputs = () => {
    return (
      <>
        <BooleanToggleInput
          fieldName={"rollbackEnabled"}
          dataObject={argoCdModel}
          setDataObject={setArgoCdModel}
        />
        {getRollbackRepositorySelect()}
      </>
    );
  };

  const getAppVariablesInputFields = () => {
    return (
      <>
        <BooleanToggleInput
          fieldName={"dynamicVariables"}
          dataObject={argoCdModel}
          setDataObject={setArgoCdModel}
        />
        {getAppVariablesInput()}
      </>
    );
  };

  const getAppVariablesInput = () => {
    if (argoCdModel?.getData("dynamicVariables") === true) {
      return (
        <>
          <ArgoClusterSelectInput
            fieldName={"applicationCluster"}
            argoToolId={argoCdModel?.getData("toolConfigId")}
            dataObject={argoCdModel}
            setDataObject={setArgoCdModel}
            disabled={!argoCdModel?.getData("toolConfigId")}
          />
          <TextInputBase
            dataObject={argoCdModel}  
            setDataObject={setArgoCdModel}        
            fieldName={"yamlPath"}
          />
        </>
      );      
    }
  };

  const getCommandLineSpecificInput = () => {
    if(argoCdModel?.getData("dockerStepType") === "command-line") {
      return (
          <CustomParameterSelectInput
              model={argoCdModel}
              setModel={setArgoCdModel}
              fieldName={"customParameterId"}
          />
      );
    }
  };

  const getSCMInputs = () => {
    return (
      <>
        <ArgoCdStepSourceControlManagementToolIdentifierSelectInput
          model={argoCdModel}
          setModel={setArgoCdModel}
        />
        <ArgoCdStepSourceControlManagementToolSelectInput
          gitYamlTool={argoCdModel?.getData("type")}
          model={argoCdModel}
          setModel={setArgoCdModel}
        />
        <ArgoCdStepBitbucketWorkspaceInput
          gitToolId={argoCdModel?.getData("gitToolId")}
          model={argoCdModel}
          setModel={setArgoCdModel}
        />
        <ArgoCdStepGitRepositorySelectInput
          model={argoCdModel}
          setModel={setArgoCdModel}
        />
        <ArgoCdStepGitBranchSelectInput
          model={argoCdModel}
          setModel={setArgoCdModel}
        />
        <TextInputBase
          setDataObject={setArgoCdModel}
          dataObject={argoCdModel}
          fieldName={"gitFilePath"}
          disabled={
            hasStringValue(argoCdModel?.getData("defaultBranch")) !== true
          }
        />
      </>
    );
  };

const getKustomizationInputFields = () => {
  return (
      <>
        <ArgoCdStepKustomizeBooleanInput
            model={argoCdModel}
            setModel={setArgoCdModel}
        />
        { argoCdModel?.getData("kustomizeFlag") &&
            <TextInputBase
                setDataObject={setArgoCdModel}
                dataObject={argoCdModel}
                fieldName={"imageReference"}
            />
        }
      </>
  );
};

  if (isLoading || argoCdModel === undefined) {
    return <LoadingDialog size="sm"/>;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={argoCdModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <ArgoCdStepArgoToolSelectInput
        model={argoCdModel}
        setModel={setArgoCdModel}
      />
      <ArgoCdApplicationSelectInput
        model={argoCdModel}
        setModel={setArgoCdModel}
        argoToolId={argoCdModel.getData("toolConfigId")}
      />
      <ArgoCdStepPipelineStepSelectInput
        model={argoCdModel}
        setModel={setArgoCdModel}
        stepId={stepId}
        plan={plan}
        disabled={
          hasStringValue(argoCdModel?.getData("applicationName")) !== true
        }
      />
      {getCommandLineSpecificInput()}
      {getSCMInputs()}
      {getKustomizationInputFields()}
      {getAppVariablesInputFields()}
      {getRollbackInputs()}
      <BooleanToggleInput
        fieldName={"isBlueGreenDeployment"}
        dataObject={argoCdModel}
        setDataObject={setArgoCdModel}
        inputHelpOverlay={<ArgoBlueGreenDeploymentHelpDocumentation />}
      />
    </PipelineStepEditorPanelContainer>
  );
}

ArgoCdStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  closeEditorPanel: PropTypes.func,
  pipelineId: PropTypes.string,
};

export default ArgoCdStepConfiguration;
