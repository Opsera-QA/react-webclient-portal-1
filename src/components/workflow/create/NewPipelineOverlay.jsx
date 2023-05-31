import React, {useState} from "react";
import PropTypes from "prop-types";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import pipelineMetadata from "@opsera/definitions/constants/pipelines/pipeline.metadata";
import DeployPlatformPipelineOverlay from "temp-library-components/cards/templates/pipelines/platform/deploy/DeployPlatformPipelineOverlay";
import DeployCustomerPipelineOverlay from "temp-library-components/cards/templates/pipelines/customer/deploy/DeployCustomerPipelineOverlay";
import PipelineTemplateSelectionScreen from "components/workflow/create/PipelineTemplateSelectionScreen";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import useGetCustomerPipelineTemplateModel from "hooks/workflow/catalog/customer/useGetCustomerPipelineTemplateModel";
import useGetPlatformPipelineTemplateModel from "hooks/workflow/catalog/platform/useGetPlatformPipelineTemplateModel";

export default function NewPipelineOverlay(
  {
    loadData,
    backButtonFunction,
  }) {
  const [selectedPlatformTemplate, setSelectedPlatformTemplate] = useState(undefined);
  const [selectedCustomerTemplate, setSelectedCustomerTemplate] = useState(undefined);
  const {getCustomerPipelineTemplateModel} = useGetCustomerPipelineTemplateModel();
  const {getPlatformPipelineTemplateModel} = useGetPlatformPipelineTemplateModel();

  const handleBackButton = () => {
    setSelectedPlatformTemplate(undefined);
    setSelectedCustomerTemplate(undefined);
  };

  const getBody = () => {
    return (
      <PipelineTemplateSelectionScreen
        setSelectedPlatformTemplate={(pipelineTemplate) => setSelectedPlatformTemplate(getCustomerPipelineTemplateModel(pipelineTemplate, false))}
        setSelectedCustomerTemplate={(pipelineTemplate) => setSelectedCustomerTemplate(getPlatformPipelineTemplateModel(pipelineTemplate, false))}
        className={"p-3"}
      />
    );
  };

  if (selectedPlatformTemplate != null) {
    return (
      <DeployPlatformPipelineOverlay
        platformPipelineTemplateModel={selectedPlatformTemplate}
        backButtonFunction={handleBackButton}
      />
    );
  }

  if (selectedCustomerTemplate != null) {
    return (
      <DeployCustomerPipelineOverlay
        customerPipelineTemplateModel={selectedCustomerTemplate}
        backButtonFunction={handleBackButton}
      />
    );
  }

  return (
    <CreateCenterPanel
      objectType={pipelineMetadata?.type}
      loadData={loadData}
      showCloseButton={false}
      buttonContainer={<OverlayWizardButtonContainerBase backButtonFunction={backButtonFunction} />}
    >
      {getBody()}
    </CreateCenterPanel>
  );
}

NewPipelineOverlay.propTypes = {
  loadData: PropTypes.func,
  backButtonFunction: PropTypes.func,
};
