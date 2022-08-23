import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import sourceRepositoryConfigurationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/source-repository-configuration-metadata";
import PipelineSourceRepositoryToolIdentifierSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryToolIdentifierSelectInput";
import PipelineSourceRepositoryBitbucketWorkspaceSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryBitbucketWorkspaceSelectInput";
import PipelineSourceRepositorySelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositorySelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import axios from "axios";
import PipelineSourceRepositoryPrimaryBranchSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryPrimaryBranchSelectInput";
import PipelineSourceRepositoryEventBasedTriggerInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryTriggerInput";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineSourceRepositoryToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryToolSelectInput";
import PipelineSourceRepositorySecondaryBranchesMultiSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositorySecondaryBranchesMultiSelectInput";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import PipelineSourceRepositoryGitExportEnabledInput from "./PipelineSourceRepositoryGitExportEnabledInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function SourceRepositoryConfiguration({ pipeline, parentCallback, handleCloseClick }) {
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [sourceRepositoryModel, setSourceRepositoryModel] = useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(pipeline)]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const parsedModel = modelHelpers.parseObjectIntoModel(pipeline?.workflow?.source, sourceRepositoryConfigurationMetadata);
      setSourceRepositoryModel(parsedModel);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const callbackFunction = async () => {
    if (sourceRepositoryModel && validateRequiredFields()) {
      const persistData = dataParsingHelper.parseObject(sourceRepositoryModel?.getPersistData());

      if (persistData == null) {
        return;
      }

      // TODO: Don't deconstruct like this.
      let { name, service, accountId, username, password, repository, branch, key, trigger_active, repoId, sshUrl, gitUrl, workspace, workspaceName, secondary_branches, gitExportEnabled, gitExportPath  } = persistData;
      const item = {
        name: name,
        service: service,
        accountId: accountId,
        username: username,
        password: password,
        workspace: workspace,
        workspaceName: workspaceName,
        repository: repository,
        repoId: repoId,
        gitUrl: gitUrl,
        sshUrl: sshUrl,
        branch: branch,
        secondary_branches: secondary_branches,
        key: key,
        trigger_active: trigger_active,
        gitExportEnabled: gitExportEnabled, 
        gitExportPath: gitExportPath
      };
      //console.log("saving config: " + JSON.stringify(item));
      //console.log("saving getPersistData: " + JSON.stringify(sourceRepositoryModel?.getPersistData()));
      await parentCallback(item);
    }
  };

  //TODO: we will allow impartial settings to be saved, BUT we want to show a warning to users.
  const validateRequiredFields = () => {
    let { service, accountId, username, password, repository, branch, trigger_active } = sourceRepositoryModel?.getPersistData();

    if (service.length === 0) {
      return false;
    }

    if (accountId.length === 0 && trigger_active) { //allows user to save just the webhook without a warning
      return true;
    }

    if (pipeline?.workflow?.source?.trigger_active && !trigger_active) { //allows user to disable trigger
      toastContext.showWarningDialog("WARNING! You are disabling the event triggering for this pipeline.  This pipeline will no longer start on Git Webhook Events.");
      return true;
    }

    if (branch?.length === 0 || accountId?.length === 0 || username?.length === 0 ) {
      toastContext.showWarningDialog("WARNING! An incomplete configuration is being saved.  This step must be fully configured in order to use this feature.");
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


      <div className="text-muted h5 mt-2">Repository</div>
      <div className={"text-muted mb-2"}>
        Opsera uses the pipeline level Git Repository settings to define webhook activity{/*, where to read
        YAML settings from as well as for pipeline revision history*/}.  Configure
        the default repository settings below and then enable the additional Git functionality required.
        <div className={"small text-muted mb-3 mt-1"}>Please note, individual pipeline steps still have their own Git Repo settings based
          on the function of that step.  This value does NOT override those.</div>
      </div>
      <PipelineSourceRepositoryToolIdentifierSelectInput
        model={sourceRepositoryModel}
        setModel={setSourceRepositoryModel}
      />
      <PipelineSourceRepositoryToolSelectInput
        model={sourceRepositoryModel}
        setModel={setSourceRepositoryModel}
        sourceRepositoryToolIdentifier={sourceRepositoryModel?.getData("service")}
      />
      <PipelineSourceRepositoryBitbucketWorkspaceSelectInput
        model={sourceRepositoryModel}
        setModel={setSourceRepositoryModel}
        accountId={sourceRepositoryModel?.getData("accountId")}
        visible={sourceRepositoryModel?.getData("service") === "bitbucket"}
      />
      <PipelineSourceRepositorySelectInput
        model={sourceRepositoryModel}
        setModel={setSourceRepositoryModel}
        service={sourceRepositoryModel?.getData("service")}
        accountId={sourceRepositoryModel?.getData("accountId")}
        workspace={sourceRepositoryModel?.getData("workspace")}
        visible={
          sourceRepositoryModel?.getData("service") != null
          && sourceRepositoryModel?.getData("accountId") != null
          && (sourceRepositoryModel?.getData("service") === "bitbucket" ? sourceRepositoryModel?.getData("workspace") != null && sourceRepositoryModel?.getData("workspace").length > 0 : true)}
      />
      <PipelineSourceRepositoryPrimaryBranchSelectInput
        model={sourceRepositoryModel}
        setModel={setSourceRepositoryModel}
      />
      <PipelineSourceRepositorySecondaryBranchesMultiSelectInput
        model={sourceRepositoryModel}
        setModel={setSourceRepositoryModel}
        primaryBranch={sourceRepositoryModel?.getData("branch")}
      />

      <div className="text-muted h5 mt-3">Webhook</div>
      <PipelineSourceRepositoryEventBasedTriggerInput
        model={sourceRepositoryModel}
        setModel={setSourceRepositoryModel}
        pipeline={pipeline}
        savePipelineFunction={callbackFunction}
      />

      {/*<hr />
      <div className="text-muted h5 mt-3">Dynamic Controls</div>
      <div className={"text-muted  mb-3"}>Enable YAML based pipeline settings to control variable
        branches for pipeline runs.</div>

      <div className={"p-3"} >COMING SOON</div>
      
        <hr />*/}
      <div className="text-muted h5 mt-3">Pipeline Git Revisions</div>
        <PipelineSourceRepositoryGitExportEnabledInput
          fieldName={"gitExportEnabled"}
          model={sourceRepositoryModel}
          setModel={setSourceRepositoryModel}
          service={sourceRepositoryModel?.getData("service")}
        />
      {/* <div className={"p-3"} >COMING SOON</div> */}
    </PipelineStepEditorPanelContainer>
  );
}

SourceRepositoryConfiguration.propTypes = {
  pipeline: PropTypes.object,
  parentCallback: PropTypes.func,
  handleCloseClick: PropTypes.func,
};

export default SourceRepositoryConfiguration;