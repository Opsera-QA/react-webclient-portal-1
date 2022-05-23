import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SnaplogicStepFormMetadata from "./snaplogic-stepForm-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import SnaplogicToolSelectInput from "./inputs/SnaplogicToolSelectInput";
import SnaplogicScmToolTypeSelectInput from "./inputs/SnaplogicScmToolTypeSelectInput";
import SnaplogicScmToolSelectInput from "./inputs/SnaplogicScmToolSelectInput";
import SnaplogicScmRepositorySelectInput from "./inputs/SnaplogicScmRepositorySelectInput";
import SnaplogicScmBranchSelectInput from "./inputs/SnaplogicScmBranchSelectInput";
import SnaplogicProjectSpaceSelectInput from "./inputs/SnaplogicProjectSpaceSelectInput";
import SnaplogicProjectSelectInput from "./inputs/SnaplogicProjectSelectInput";

function SnaplogicStepConfiguration({ pipelineId, stepTool, plan, stepId, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);
  const [snaplogicStepConfigurationDto, setSnaplogicStepConfigurationDataDto] = useState(undefined);

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
      setSnaplogicStepConfigurationDataDto(new Model(configuration, SnaplogicStepFormMetadata, false));
    } else {
      setSnaplogicStepConfigurationDataDto(
        new Model({ ...SnaplogicStepFormMetadata.newObjectFields }, SnaplogicStepFormMetadata, false)
      );
    }
  };

  const handleSaveStepConfig = async () => {
    await callbackFunction();
    closeEditorPanel();
  };

  const callbackFunction = async () => {
    let newDataObject = snaplogicStepConfigurationDto;
    setSnaplogicStepConfigurationDataDto({ ...newDataObject });
    const item = {
      configuration: snaplogicStepConfigurationDto.getPersistData(),
    };
    await parentCallback(item);
  };

  if (isLoading || snaplogicStepConfigurationDto == null) {
    return <LoadingDialog size="sm" />;
  }

  const getProjectFields = () => {

    if(snaplogicStepConfigurationDto.getData("toolConfigId") == null || 
        snaplogicStepConfigurationDto.getData("toolConfigId") == undefined || 
        snaplogicStepConfigurationDto.getData("toolConfigId") === "") {
      return null;
    }

    return (
      <>
        <SnaplogicProjectSpaceSelectInput
          model={snaplogicStepConfigurationDto}
          setModel={setSnaplogicStepConfigurationDataDto}
        />
        <SnaplogicProjectSelectInput
          model={snaplogicStepConfigurationDto}
          setModel={setSnaplogicStepConfigurationDataDto}
          toolConfigId={snaplogicStepConfigurationDto.getData("toolConfigId")}
          projectSpace={snaplogicStepConfigurationDto.getData("projectSpace")}
        />
      </>
    );
  };

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={snaplogicStepConfigurationDto}
      persistRecord={handleSaveStepConfig}
      isLoading={isLoading}
    >
      <SnaplogicToolSelectInput
        model={snaplogicStepConfigurationDto}
        setModel={setSnaplogicStepConfigurationDataDto}
      />
      <SnaplogicScmToolTypeSelectInput
        model={snaplogicStepConfigurationDto}
        setModel={setSnaplogicStepConfigurationDataDto}
      />
      <SnaplogicScmToolSelectInput
        model={snaplogicStepConfigurationDto}
        setModel={setSnaplogicStepConfigurationDataDto}
      />
      <SnaplogicScmRepositorySelectInput
        model={snaplogicStepConfigurationDto}
        setModel={setSnaplogicStepConfigurationDataDto}
      />
      <SnaplogicScmBranchSelectInput
        model={snaplogicStepConfigurationDto}
        setModel={setSnaplogicStepConfigurationDataDto}
      />
      { getProjectFields() }      
    </PipelineStepEditorPanelContainer>
  );
}

SnaplogicStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
};

export default SnaplogicStepConfiguration;
