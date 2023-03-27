import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PipelineSourceRepositoryWebhookInputPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryWebhookInputPanel";
import LoadingDialog from "components/common/status_notifications/loading";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import PipelineSourceRepositoryGitExportEnabledInput from "./PipelineSourceRepositoryGitExportEnabledInput";
import {pipelineTypeConstants} from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import PipelineSourceRepositoryDynamicSettingsBooleanToggleInput
  from "components/workflow/plan/source/PipelineSourceRepositoryDynamicSettingsBooleanToggleInput";
import {
  sourceRepositoryConfigurationMetadata
} from "components/workflow/plan/source/sourceRepositoryConfiguration.metadata";
import usePipelineSourceRepositoryActions from "components/workflow/plan/source/usePipelineSourceRepositoryActions";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineSourceRepositoryRepositoryInputPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryRepositoryInputPanel";

function PipelineSourceRepositoryConfiguration(
  {
    pipeline,
    reloadParentPipeline,
    handleCloseClick,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();
  const pipelineSourceRepositoryActions = usePipelineSourceRepositoryActions();

  const [isLoading, setIsLoading] = useState(false);
  const [sourceRepositoryModel, setSourceRepositoryModel] = useState(undefined);

  useEffect(() => {
    setSourceRepositoryModel(undefined);

    if (pipeline) {
      const parsedModel = modelHelpers.parseObjectIntoModel(pipeline?.workflow?.source, sourceRepositoryConfigurationMetadata);
      setSourceRepositoryModel(parsedModel);
    }
  }, []);

  // TODO: Make Node route that just accepts the source object and updates it
  const callbackFunction = async () => {
    if (sourceRepositoryModel && validateRequiredFields()) {
      const persistData = dataParsingHelper.parseObject(sourceRepositoryModel?.getPersistData());

      if (persistData == null) {
        return;
      }

      // TODO: Don't deconstruct like this.
      let {
        name,
        dynamicSettings,
        service,
        accountId,
        repository,
        branch,
        key,
        trigger_active,
        repoId,
        projectId,
        sshUrl,
        gitUrl,
        workspace,
        workspaceName,
        secondary_branches,
        gitExportEnabled,
        gitExportPath,
        isPushEvent,
        isPrEvent,
        prCreatedEvent,
        prApprovedEvent,
        allowDynamicSettingsInUi,
        enableBranchSwitch,
      } = persistData;

      const item = {
        name: name,
        service: service,
        accountId: accountId,
        workspace: workspace,
        workspaceName: workspaceName,
        repository: repository,
        repoId: repoId,
        projectId: projectId,
        gitUrl: gitUrl,
        sshUrl: sshUrl,
        branch: branch,
        secondary_branches: secondary_branches,
        key: key,
        trigger_active: trigger_active,
        isPushEvent: isPushEvent,
        isPrEvent: isPrEvent,
        prCreatedEvent: prCreatedEvent,
        prApprovedEvent: prApprovedEvent,
        gitExportEnabled: gitExportEnabled, 
        gitExportPath: gitExportPath,
        dynamicSettings: dynamicSettings,
        allowDynamicSettingsInUi: allowDynamicSettingsInUi,
        enableBranchSwitch: enableBranchSwitch,
      };
      // console.log("saving config: " + JSON.stringify(item));
      //console.log("saving getPersistData: " + JSON.stringify(sourceRepositoryModel?.getPersistData()));
      await pipelineSourceRepositoryActions.updatePipelineSourceRepository(
        pipeline?._id,
        item,
      );

      await reloadParentPipeline();
      handleCloseClick();
    }
  };

  //TODO: we will allow impartial settings to be saved, BUT we want to show a warning to users.
  const validateRequiredFields = () => {
    let { service, accountId, branch, trigger_active } = sourceRepositoryModel?.getPersistData();

    if (service.length === 0) {
      return false;
    }

    if (accountId.length === 0 && trigger_active) { //allows user to save just the webhook without a warning
      return true;
    }

    if (pipeline?.workflow?.source?.trigger_active && !trigger_active) { //allows user to disable trigger
      toastContext.showSystemWarningBanner("WARNING! You are disabling the event triggering for this pipeline.  This pipeline will no longer start on Git Webhook Events.");
      return true;
    }

    if (branch?.length === 0 || accountId?.length === 0) {
      toastContext.showSystemWarningBanner("WARNING! An incomplete configuration is being saved.  This step must be fully configured in order to use this feature.");
      return true;
    }

    return true; //all requests are allowed to save at this time.

  };

  if (sourceRepositoryModel == null) {
     return <LoadingDialog message={"Loading Data"} />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={handleCloseClick}
      recordDto={sourceRepositoryModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
      disableSaveButton={sourceRepositoryModel?.getData("service")?.length === 0}
    >
      <div className={"mb-2"}>
        {`Although individual pipeline steps can be configured with different Git repositories for individual operations,
        the top level Pipeline Git Repository settings are used to define webhook activity, dynamic settings controls and other pipeline level operations.
        It's advised that you always configure this for optimal access to pipeline settings.`}
      </div>
      <PipelineSourceRepositoryRepositoryInputPanel
        sourceRepositoryModel={sourceRepositoryModel}
        setSourceRepositoryModel={setSourceRepositoryModel}
        className={"mt-5"}
      />
      <PipelineSourceRepositoryWebhookInputPanel
        model={sourceRepositoryModel}
        setModel={setSourceRepositoryModel}
        pipeline={pipeline}
        savePipelineFunction={callbackFunction}
        className={"mt-5"}
      />
      {/*<hr />
      <div className="text-muted h5 mt-3">Dynamic Controls</div>
      <div className={"text-muted  mb-3"}>Enable YAML based pipeline settings to control variable
        branches for pipeline runs.</div>

      <div className={"p-3"} >COMING SOON</div>
      
        <hr />*/}
      <PipelineSourceRepositoryGitExportEnabledInput
        fieldName={"gitExportEnabled"}
        model={sourceRepositoryModel}
        setModel={setSourceRepositoryModel}
        disabled={sourceRepositoryModel.getData("service") !== "gitlab" && sourceRepositoryModel.getData("service") !== "github"}
        className={"mt-5"}
      />
      <PipelineSourceRepositoryDynamicSettingsBooleanToggleInput
        model={sourceRepositoryModel}
        setModel={setSourceRepositoryModel}
        pipelineType={pipelineTypeConstants.getTypeForTypesArray(pipeline?.type, false)}
        className={"mt-5"}
      />
    </PipelineStepEditorPanelContainer>
  );
}

PipelineSourceRepositoryConfiguration.propTypes = {
  pipeline: PropTypes.object,
  reloadParentPipeline: PropTypes.func,
  handleCloseClick: PropTypes.func,
};

export default PipelineSourceRepositoryConfiguration;