import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InformaticaIdqStepFormMetadata from "./informatica-idq-stepForm-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import SourceRepositoryTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositoryTypeSelectInput";
import SourceRepositoryToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositoryToolSelectInput";
import SourceRepositoryBitbucketWorkspaceSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositoryBitbucketWorkspaceSelectInput";
import SourceRepositorySelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositorySelectInput";
import SourceRepositoryPrimaryBranchSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositoryPrimaryBranchSelectInput";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";
import InformaticaIdqConfigTypeSelectInput from "./inputs/InformaticaIdqConfigTypeSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function InformaticaIdqStepConfiguration({
  pipelineId,
  stepTool,
  plan,
  stepId,
  closeEditorPanel,
  parentCallback,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);
  const [
    informaticaIdqStepConfigurationDto,
    setInformaticaIdqStepConfigurationDataDto,
  ] = useState(undefined);

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
      setInformaticaIdqStepConfigurationDataDto(
        new Model(configuration, InformaticaIdqStepFormMetadata, false),
      );
    } else {
      setInformaticaIdqStepConfigurationDataDto(
        new Model(
          { ...InformaticaIdqStepFormMetadata.newObjectFields },
          InformaticaIdqStepFormMetadata,
          false,
        ),
      );
    }
  };

  const handleSaveStepConfig = async () => {
    await callbackFunction();
  };
  const callbackFunction = async () => {
    let newDataObject = informaticaIdqStepConfigurationDto;
    setInformaticaIdqStepConfigurationDataDto({ ...newDataObject });
    const item = {
      configuration: informaticaIdqStepConfigurationDto.getPersistData(),
    };
    parentCallback(item);
  };

  const getSourceSelection = () => {
    return (
      <div>
        <SourceRepositoryTypeSelectInput
          model={informaticaIdqStepConfigurationDto}
          setModel={setInformaticaIdqStepConfigurationDataDto}
        />
        <SourceRepositoryToolSelectInput
          model={informaticaIdqStepConfigurationDto}
          setModel={setInformaticaIdqStepConfigurationDataDto}
          sourceRepositoryToolIdentifier={informaticaIdqStepConfigurationDto?.getData(
            "service",
          )}
        />
        <SourceRepositoryBitbucketWorkspaceSelectInput
          model={informaticaIdqStepConfigurationDto}
          setModel={setInformaticaIdqStepConfigurationDataDto}
          accountId={informaticaIdqStepConfigurationDto?.getData("gitToolId")}
          visible={
            informaticaIdqStepConfigurationDto?.getData("service") ===
            "bitbucket"
          }
        />
        <SourceRepositorySelectInput
          model={informaticaIdqStepConfigurationDto}
          setModel={setInformaticaIdqStepConfigurationDataDto}
          service={informaticaIdqStepConfigurationDto?.getData("service")}
          accountId={informaticaIdqStepConfigurationDto?.getData("gitToolId")}
          workspace={informaticaIdqStepConfigurationDto?.getData("workspace")}
          visible={
            informaticaIdqStepConfigurationDto?.getData("service") != null &&
            informaticaIdqStepConfigurationDto?.getData("gitToolId") != null &&
            (informaticaIdqStepConfigurationDto?.getData(
              "service" === "bitbucket",
            )
              ? informaticaIdqStepConfigurationDto?.getData("workspace") !=
                  null &&
                informaticaIdqStepConfigurationDto?.getData("workspace")
                  .length > 0
              : true)
          }
        />
        <SourceRepositoryPrimaryBranchSelectInput
          model={informaticaIdqStepConfigurationDto}
          setModel={setInformaticaIdqStepConfigurationDataDto}
        />
      </div>
    );
  };

  const getDynamicFields = () => {
    switch (informaticaIdqStepConfigurationDto.getData("jobType")) {
      case "export":
        return (
          <div>
            {getSourceSelection()}
            <TextInputBase
              fieldName={"sourceProject"}
              dataObject={informaticaIdqStepConfigurationDto}
              setDataObject={setInformaticaIdqStepConfigurationDataDto}
            />
          </div>
        );
      case "import":
        return (
          <div>
            <SelectInputBase
              setDataObject={setInformaticaIdqStepConfigurationDataDto}
              textField={"name"}
              valueField={"_id"}
              dataObject={informaticaIdqStepConfigurationDto}
              filter={"contains"}
              selectOptions={listOfSteps ? listOfSteps : []}
              fieldName={"exportStepId"}
            />
            <TextInputBase
              fieldName={"targetProject"}
              dataObject={informaticaIdqStepConfigurationDto}
              setDataObject={setInformaticaIdqStepConfigurationDataDto}
            />
          </div>
        );
      case "deploy":
        return (
          <div>
            <SelectInputBase
              setDataObject={setInformaticaIdqStepConfigurationDataDto}
              textField={"name"}
              valueField={"_id"}
              dataObject={informaticaIdqStepConfigurationDto}
              filter={"contains"}
              selectOptions={listOfSteps ? listOfSteps : []}
              fieldName={"importStepId"}
            />
          </div>
        );
      default:
        return <></>;
    }
  };

  if (isLoading || informaticaIdqStepConfigurationDto == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={informaticaIdqStepConfigurationDto}
      persistRecord={handleSaveStepConfig}
      isLoading={isLoading}
    >
      <RoleRestrictedToolByIdentifierInputBase
        toolIdentifier={"informatica-idq"}
        toolFriendlyName={"informatica-idq"}
        fieldName={"toolConfigId"}
        model={informaticaIdqStepConfigurationDto}
        setModel={setInformaticaIdqStepConfigurationDataDto}
        placeholderText={"Select Source Informatica IDQ Tool"}
      />
      <InformaticaIdqConfigTypeSelectInput
        model={informaticaIdqStepConfigurationDto}
        setModel={setInformaticaIdqStepConfigurationDataDto}
        fieldName="jobType"
      />
      {getDynamicFields()}
    </PipelineStepEditorPanelContainer>
  );
}

InformaticaIdqStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
};

export default InformaticaIdqStepConfiguration;
