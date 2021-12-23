import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InformaticaStepFormMetadata from "./informatica-stepForm-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import SourceRepositoryTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositoryTypeSelectInput";
import SourceRepositoryToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositoryToolSelectInput";
import SourceRepositoryBitbucketWorkspaceSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositoryBitbucketWorkspaceSelectInput";
import SourceRepositorySelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositorySelectInput";
import SourceRepositoryPrimaryBranchSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositoryPrimaryBranchSelectInput";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";
import InformaticaConfigTypeSelectInput from "./inputs/InformaticaConfigTypeSelectInput";

  function InformaticaStepConfiguration({ pipelineId, stepTool, plan, stepId, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);
  const [informaticaStepConfigurationDto, setInformaticaStepConfigurationDataDto] = useState(undefined);

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
      setInformaticaStepConfigurationDataDto(new Model(configuration, InformaticaStepFormMetadata, false));
    } else {
      setInformaticaStepConfigurationDataDto(
        new Model({ ...InformaticaStepFormMetadata.newObjectFields }, InformaticaStepFormMetadata, false)
      );
    }
  };

  const handleSaveStepConfig = async () => {
      await callbackFunction();
  };
  const callbackFunction = async () => {
    let newDataObject = informaticaStepConfigurationDto;
    setInformaticaStepConfigurationDataDto({...newDataObject});
    const item = {
      configuration: informaticaStepConfigurationDto.getPersistData(),
    };
    parentCallback(item);
  };

  const getDynamicFields = () => {
    switch (informaticaStepConfigurationDto.getData("type")) {
      case "build":
        return (
          <div>
            <SourceRepositoryTypeSelectInput
              model={informaticaStepConfigurationDto}
              setModel={setInformaticaStepConfigurationDataDto}
            />
            <SourceRepositoryToolSelectInput
              model={informaticaStepConfigurationDto}
              setModel={setInformaticaStepConfigurationDataDto}
              sourceRepositoryToolIdentifier={informaticaStepConfigurationDto?.getData("service")}
            />
            <SourceRepositoryBitbucketWorkspaceSelectInput
              model={informaticaStepConfigurationDto}
              setModel={setInformaticaStepConfigurationDataDto}
              accountId={informaticaStepConfigurationDto?.getData("gitToolId")}
              visible={informaticaStepConfigurationDto?.getData("service") === "bitbucket"}
            />
            <SourceRepositorySelectInput
              model={informaticaStepConfigurationDto}
              setModel={setInformaticaStepConfigurationDataDto}
              service={informaticaStepConfigurationDto?.getData("service")}
              accountId={informaticaStepConfigurationDto?.getData("gitToolId")}
              workspace={informaticaStepConfigurationDto?.getData("workspace")}
              visible={
                informaticaStepConfigurationDto?.getData("service") != null
                && informaticaStepConfigurationDto?.getData("gitToolId") != null
                && (informaticaStepConfigurationDto?.getData("service" === "bitbucket") ? informaticaStepConfigurationDto?.getData("workspace") != null && informaticaStepConfigurationDto?.getData("workspace").length > 0 : true)}
            />
            <SourceRepositoryPrimaryBranchSelectInput
              model={informaticaStepConfigurationDto}
              setModel={setInformaticaStepConfigurationDataDto}
            />
          </div>
        );
      case "deploy":
        return (
          <SelectInputBase
            setDataObject={setInformaticaStepConfigurationDataDto}
            textField={"name"}
            valueField={"_id"}
            dataObject={informaticaStepConfigurationDto}
            filter={"contains"}
            selectOptions={listOfSteps ? listOfSteps : []}
            fieldName={"buildStepId"}
          />
        );
      default :
      return (
        <></>
      );
    }
  };

  if (isLoading || informaticaStepConfigurationDto == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={informaticaStepConfigurationDto}
      persistRecord={handleSaveStepConfig}
      isLoading={isLoading}
    >
      <RoleRestrictedToolByIdentifierInputBase
        toolIdentifier={"informatica"}
        toolFriendlyName={"informatica"}
        fieldName={"toolConfigId"}
        model={informaticaStepConfigurationDto}
        setModel={setInformaticaStepConfigurationDataDto}
        placeholderText={"Select a Tool"}
      />
      <InformaticaConfigTypeSelectInput
        model={informaticaStepConfigurationDto}
        setModel={setInformaticaStepConfigurationDataDto}
        fieldName="type"
      />
     {getDynamicFields()}
     </PipelineStepEditorPanelContainer>
  );
}

InformaticaStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
};

export default InformaticaStepConfiguration;
