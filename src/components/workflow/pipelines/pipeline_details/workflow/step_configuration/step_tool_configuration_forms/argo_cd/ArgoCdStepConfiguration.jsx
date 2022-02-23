import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import { DialogToastContext } from "contexts/DialogToastContext";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import ArgoCdStepSourceControlManagementToolTypeSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/argo_cd/inputs/ArgoCdStepSourceControlManagementToolTypeSelectInput";
import ArgoCdPipelineToolSelectInput from "components/common/list_of_values_input/tools/argo_cd/ArgoCdPipelineToolSelectInput";
import ArgoCdApplicationSelectInput
  from "components/common/list_of_values_input/tools/argo_cd/application/ArgoCdApplicationSelectInput";
import PipelineStepSelectInput from "components/common/list_of_values_input/workflow/pipelines/PipelineStepSelectInput";
import {ArgoCdStepConfigurationMetadata}
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/argo_cd/argoCdStepConfiguration.metadata";
import ArgoCdScmToolSelectInput from "components/common/list_of_values_input/tools/argo_cd/ArgoCdScmToolSelectInput";
import ArgoCdBitbucketWorkspaceInput
  from "components/common/list_of_values_input/tools/argo_cd/ArgoCdBitbucketWorkspaceInput";
import ArgoCdGitRepositorySelectInput
  from "components/common/list_of_values_input/tools/argo_cd/ArgoCdGitRepositorySelectInput";
import ArgoCdGitBranchSelectInput
  from "components/common/list_of_values_input/tools/argo_cd/ArgoCdGitBranchSelectInput";
import modelHelpers from "components/common/model/modelHelpers";

function ArgoCdStepConfiguration({ stepTool, plan, stepId, parentCallback, closeEditorPanel }) {
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

  const getDynamicFields = () => {
    if (argoCdModel?.getData("type") === "bitbucket") {
      return (
        <TextInputBase
          setDataObject={setArgoCdModel}
          dataObject={argoCdModel}
          fieldName={"gitWorkspace"}
          disabled={argoCdModel && argoCdModel.getData("gitFilePath").length === 0}
        />
      );
    }
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
      <ArgoCdPipelineToolSelectInput
        model={argoCdModel}
        setModel={setArgoCdModel}
      />
      <ArgoCdApplicationSelectInput
        model={argoCdModel}
        setModel={setArgoCdModel}
        argoToolId={argoCdModel.getData("toolConfigId")}
      />
      <PipelineStepSelectInput
        model={argoCdModel}
        setModel={setArgoCdModel}
        stepId={stepId}
        plan={plan}
        fieldName={"dockerStepID"}
        disabled={argoCdModel?.getData("applicationName").length === 0}
      />
      <ArgoCdStepSourceControlManagementToolTypeSelectInput
        model={argoCdModel}
        setModel={setArgoCdModel}
        disabled={argoCdModel?.getData("dockerStepID").length === 0}
      />
      <ArgoCdScmToolSelectInput
        gitYamlTool={argoCdModel?.getData("type")}
        model={argoCdModel}
        setModel={setArgoCdModel}
      />
      <ArgoCdBitbucketWorkspaceInput
        gitToolId={argoCdModel?.getData("gitToolId")}
        model={argoCdModel}
        setModel={setArgoCdModel}
      />
      <ArgoCdGitRepositorySelectInput
        model={argoCdModel}
        setModel={setArgoCdModel}
      />
      <ArgoCdGitBranchSelectInput
        model={argoCdModel}
        setModel={setArgoCdModel}
      />
      <TextInputBase
        setDataObject={setArgoCdModel}
        dataObject={argoCdModel}
        fieldName={"gitFilePath"}
        disabled={argoCdModel?.getData("defaultBranch").length === 0}
      />
      {getDynamicFields()}
    </PipelineStepEditorPanelContainer>
  );
}

ArgoCdStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  closeEditorPanel: PropTypes.func
};

export default ArgoCdStepConfiguration;
