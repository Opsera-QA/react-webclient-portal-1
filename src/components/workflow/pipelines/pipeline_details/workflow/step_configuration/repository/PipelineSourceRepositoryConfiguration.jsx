import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PipelineSourceRepositoryWebhookInputPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryWebhookInputPanel";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineSourceRepositoryGitExportEnabledInput from "./PipelineSourceRepositoryGitExportEnabledInput";
import {pipelineTypeConstants} from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import PipelineSourceRepositoryDynamicSettingsBooleanToggleInput
  from "components/workflow/plan/source/PipelineSourceRepositoryDynamicSettingsBooleanToggleInput";
import {
  sourceRepositoryConfigurationMetadata
} from "components/workflow/plan/source/sourceRepositoryConfiguration.metadata";
import usePipelineSourceRepositoryActions from "components/workflow/plan/source/usePipelineSourceRepositoryActions";
import PipelineSourceRepositoryRepositoryInputPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryRepositoryInputPanel";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import CustomTab from "components/common/tabs/CustomTab";
import {faChartNetwork, faDraftingCompass, faWrench} from "@fortawesome/pro-light-svg-icons";
import PipelineSourceRepositoryConfigurationTabPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryConfigurationTabPanel";

export default function PipelineSourceRepositoryConfiguration(
  {
    pipeline,
    reloadParentPipeline,
    handleCloseClick,
  }) {
  const [isLoading, setIsLoading] = useState(false);
  const [sourceRepositoryModel, setSourceRepositoryModel] = useState(undefined);
  const pipelineSourceRepositoryActions = usePipelineSourceRepositoryActions();
  const isPipelineWebhookActive = pipeline?.workflow?.source?.trigger_active === true;

  useEffect(() => {
    setSourceRepositoryModel(undefined);

    if (pipeline) {
      const parsedModel = modelHelpers.parseObjectIntoModel(pipeline?.workflow?.source, sourceRepositoryConfigurationMetadata);
      setSourceRepositoryModel(parsedModel);
    }
  }, []);

  const callbackFunction = async () => {
    const validatedData = sourceRepositoryModel?.getValidatedData();
    await pipelineSourceRepositoryActions.updatePipelineSourceRepository(
      pipeline?._id,
      validatedData,
    );

    await reloadParentPipeline();
    handleCloseClick();
  };

  const getIncompleteDataMessage = () => {
    const webhookIsEnabled = sourceRepositoryModel?.getData("trigger_active");
    const accountId = DataParsingHelper.parseString(sourceRepositoryModel?.getData("accountId"), "");
    const branch = DataParsingHelper.parseString(sourceRepositoryModel?.getData("branch"), "");

    if (accountId.length === 0 && webhookIsEnabled) {
      return;
    }

    if (isPipelineWebhookActive === true && webhookIsEnabled === false) {
      return "WARNING! You are disabling the event triggering for this pipeline.  This pipeline will no longer start on Git Webhook Events.";
    }

    if (branch?.length === 0 || accountId?.length === 0) {
      return "WARNING! An incomplete configuration is being saved.  This step must be fully configured in order to use this feature.";
    }
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
      customIncompleteDataMessage={getIncompleteDataMessage()}
      buttonContainerClassName={"ml-auto mr-3"}
    >
      <div className={"mb-2"}>
        {`Although individual pipeline steps can be configured with different Git repositories for individual operations,
        the top level Pipeline Git Repository settings are used to define webhook activity, dynamic settings controls and other pipeline level operations.
        It's advised that you always configure this for optimal access to pipeline settings.`}
      </div>
      <PipelineSourceRepositoryConfigurationTabPanel
        sourceRepositoryModel={sourceRepositoryModel}
        setSourceRepositoryModel={setSourceRepositoryModel}
        pipeline={pipeline}
        callbackFunction={callbackFunction}
      />
      {/*<PipelineSourceRepositoryRepositoryInputPanel*/}
      {/*  sourceRepositoryModel={sourceRepositoryModel}*/}
      {/*  setSourceRepositoryModel={setSourceRepositoryModel}*/}
      {/*  className={"mt-5"}*/}
      {/*/>*/}
      {/*<PipelineSourceRepositoryWebhookInputPanel*/}
      {/*  model={sourceRepositoryModel}*/}
      {/*  setModel={setSourceRepositoryModel}*/}
      {/*  pipeline={pipeline}*/}
      {/*  savePipelineFunction={callbackFunction}*/}
      {/*  className={"mt-5"}*/}
      {/*/>*/}
      {/*/!*<hr />*/}
      {/*<div className="text-muted h5 mt-3">Dynamic Controls</div>*/}
      {/*<div className={"text-muted  mb-3"}>Enable YAML based pipeline settings to control variable*/}
      {/*  branches for pipeline runs.</div>*/}

      {/*<div className={"p-3"} >COMING SOON</div>*/}
      
      {/*  <hr />*!/*/}
      {/*<PipelineSourceRepositoryGitExportEnabledInput*/}
      {/*  fieldName={"gitExportEnabled"}*/}
      {/*  model={sourceRepositoryModel}*/}
      {/*  setModel={setSourceRepositoryModel}*/}
      {/*  disabled={["gitlab", "github"].includes(sourceRepositoryModel.getData("service")) !== true}*/}
      {/*  className={"mt-5"}*/}
      {/*/>*/}
      {/*<PipelineSourceRepositoryDynamicSettingsBooleanToggleInput*/}
      {/*  model={sourceRepositoryModel}*/}
      {/*  setModel={setSourceRepositoryModel}*/}
      {/*  pipelineType={pipelineTypeConstants.getTypeForTypesArray(pipeline?.type, false)}*/}
      {/*  className={"mt-5"}*/}
      {/*/>*/}
    </PipelineStepEditorPanelContainer>
  );
}

PipelineSourceRepositoryConfiguration.propTypes = {
  pipeline: PropTypes.object,
  reloadParentPipeline: PropTypes.func,
  handleCloseClick: PropTypes.func,
};
