import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "../../../../../../../common/inputs/text/TextInputBase";
import boomiMetadata from "./boomi.metadata";
import RoleRestrictedToolByIdentifierInputBase from "../../../../../../../common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";
import BoomiJobTypeSelectInput from "./inputs/BoomiJobTypeSelectInput";
import BoomiSCMToolTypeSelectInput from "./inputs/BoomiSCMToolTypeSelectInput";
import ProvarSourceControlManagementToolSelectInput from "./inputs/BoomiStepSourceControlManagementToolSelectInput";
import BoomiBitbucketWorkspaceInput from "./inputs/BoomiBitbucketWorkspaceInput";
import BoomiGitRepositoryInput from "./inputs/BoomiGitRepositoryInput";
import BoomiGitBranchInput from "./inputs/BoomiGitBranchInput";

function BoomiStepConfiguration({
  pipelineId,
  stepTool,
  stepId,
  createJob,
  closeEditorPanel,
  parentCallback,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [boomiStepConfigurationDto, setBoomiStepConfigurationDataDto] =
    useState(undefined);
  const [threshold, setThreshold] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    let boomiConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      boomiMetadata,
    );
    setBoomiStepConfigurationDataDto(boomiConfigurationData);
    setIsLoading(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: boomiStepConfigurationDto.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };
    parentCallback(item);
  };

  if (isLoading || boomiStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={boomiStepConfigurationDto}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <RoleRestrictedToolByIdentifierInputBase
        toolIdentifier={"boomi"}
        toolFriendlyName={"Boomi"}
        fieldName={"toolConfigId"}
        model={boomiStepConfigurationDto}
        setModel={setBoomiStepConfigurationDataDto}
      />
      <BoomiJobTypeSelectInput
        dataObject={boomiStepConfigurationDto}
        setDataObject={setBoomiStepConfigurationDataDto}
      />
      <BoomiSCMToolTypeSelectInput
        dataObject={boomiStepConfigurationDto}
        setDataObject={setBoomiStepConfigurationDataDto}
      />
      <ProvarSourceControlManagementToolSelectInput
        model={boomiStepConfigurationDto}
        setModel={setBoomiStepConfigurationDataDto}
        disabled={boomiStepConfigurationDto.getData("service").length === 0}
      />
      <BoomiBitbucketWorkspaceInput
        dataObject={boomiStepConfigurationDto}
        setDataObject={setBoomiStepConfigurationDataDto}
      />
      <BoomiGitRepositoryInput
        dataObject={boomiStepConfigurationDto}
        setDataObject={setBoomiStepConfigurationDataDto}
      />
      <BoomiGitBranchInput
        dataObject={boomiStepConfigurationDto}
        setDataObject={setBoomiStepConfigurationDataDto}
      />
      <TextInputBase
        dataObject={boomiStepConfigurationDto}
        setDataObject={setBoomiStepConfigurationDataDto}
        fieldName={"filePath"}
      />
      <TextInputBase
        dataObject={boomiStepConfigurationDto}
        setDataObject={setBoomiStepConfigurationDataDto}
        fieldName={"fileName"}
      />
    </PipelineStepEditorPanelContainer>
  );
}

BoomiStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  createJob: PropTypes.func,
};

export default BoomiStepConfiguration;
