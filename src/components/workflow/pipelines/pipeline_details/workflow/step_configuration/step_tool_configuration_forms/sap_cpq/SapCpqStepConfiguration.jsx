import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SapCpqStepFormMetadata from "./sap-cpq-stepForm-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import SourceRepositoryTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sap_cpq/inputs/SourceRepositoryTypeSelectInput";
import SourceRepositoryToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sap_cpq/inputs/SourceRepositoryToolSelectInput";
import SourceRepositoryBitbucketWorkspaceSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sap_cpq/inputs/SourceRepositoryBitbucketWorkspaceSelectInput";
import SourceRepositorySelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sap_cpq/inputs/SourceRepositorySelectInput";
import SourceRepositoryPrimaryBranchSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sap_cpq/inputs/SourceRepositoryPrimaryBranchSelectInput";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function SapCpqStepConfiguration({
  pipelineId,
  stepTool,
  plan,
  stepId,
  closeEditorPanel,
  parentCallback,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);
  const [sapCpqStepConfigurationDto, setSapCpqStepConfigurationDataDto] =
    useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await loadFormData(stepTool);
    if (plan && stepId) {
      let pipelineSteps = pipelineHelpers.formatStepOptions(plan, stepId);
      setListOfSteps(pipelineSteps);
    }
    setIsLoading(false);
  };

  const loadFormData = async (step) => {
    let { configuration } = step;

    if (typeof configuration !== "undefined") {
      setSapCpqStepConfigurationDataDto(
        new Model(configuration, SapCpqStepFormMetadata, false),
      );
    } else {
      setSapCpqStepConfigurationDataDto(
        new Model(
          { ...SapCpqStepFormMetadata.newObjectFields },
          SapCpqStepFormMetadata,
          false,
        ),
      );
    }
  };

  const handleSaveStepConfig = async () => {
    await callbackFunction();
  };
  const callbackFunction = async () => {
    let newDataObject = sapCpqStepConfigurationDto;
    setSapCpqStepConfigurationDataDto({ ...newDataObject });
    const item = {
      configuration: sapCpqStepConfigurationDto.getPersistData(),
    };
    parentCallback(item);
  };

  const getSourceSelection = () => {
    return (
      <div>
        <SourceRepositoryTypeSelectInput
          model={sapCpqStepConfigurationDto}
          setModel={setSapCpqStepConfigurationDataDto}
        />
        <SourceRepositoryToolSelectInput
          model={sapCpqStepConfigurationDto}
          setModel={setSapCpqStepConfigurationDataDto}
          sourceRepositoryToolIdentifier={sapCpqStepConfigurationDto?.getData(
            "service",
          )}
        />
        <SourceRepositoryBitbucketWorkspaceSelectInput
          model={sapCpqStepConfigurationDto}
          setModel={setSapCpqStepConfigurationDataDto}
          accountId={sapCpqStepConfigurationDto?.getData("gitToolId")}
          visible={
            sapCpqStepConfigurationDto?.getData("service") === "bitbucket"
          }
        />
        <SourceRepositorySelectInput
          model={sapCpqStepConfigurationDto}
          setModel={setSapCpqStepConfigurationDataDto}
          service={sapCpqStepConfigurationDto?.getData("service")}
          accountId={sapCpqStepConfigurationDto?.getData("gitToolId")}
          workspace={sapCpqStepConfigurationDto?.getData("workspace")}
          visible={
            sapCpqStepConfigurationDto?.getData("service") != null &&
            sapCpqStepConfigurationDto?.getData("gitToolId") != null &&
            (sapCpqStepConfigurationDto?.getData("service" === "bitbucket")
              ? sapCpqStepConfigurationDto?.getData("workspace") != null &&
                sapCpqStepConfigurationDto?.getData("workspace").length > 0
              : true)
          }
        />
        <SourceRepositoryPrimaryBranchSelectInput
          model={sapCpqStepConfigurationDto}
          setModel={setSapCpqStepConfigurationDataDto}
        />
      </div>
    );
  };

  if (isLoading || sapCpqStepConfigurationDto == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={sapCpqStepConfigurationDto}
      persistRecord={handleSaveStepConfig}
      isLoading={isLoading}
    >
      <RoleRestrictedToolByIdentifierInputBase
        toolIdentifier={"sap-cpq"}
        toolFriendlyName={"SAP CPQ"}
        fieldName={"toolConfigId"}
        model={sapCpqStepConfigurationDto}
        setModel={setSapCpqStepConfigurationDataDto}
        placeholderText={"Select SAP CPQ Tool"}
      />
      {getSourceSelection()}
    </PipelineStepEditorPanelContainer>
  );
}

SapCpqStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
};

export default SapCpqStepConfiguration;
