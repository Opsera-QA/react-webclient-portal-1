import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import PipelineTemplateSelectionScreen from "components/workflow/create/PipelineTemplateSelectionScreen";
import DeployPlatformPipelineForm from "./deploy_template/DeployPlatformPipelineForm";
import DeployCustomerPipelineForm from "./deploy_template/DeployCustomerPipelineForm";
import OverlayWizardButtonContainerBase
  from "../../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import useGetCustomerPipelineTemplateModel from "hooks/workflow/catalog/customer/useGetCustomerPipelineTemplateModel";
import useGetPlatformPipelineTemplateModel from "hooks/workflow/catalog/platform/useGetPlatformPipelineTemplateModel";

export default function CreatePipelineWizardTemplateSelectionScreen(
  {
    backButtonFunction,
    setupMode,
    setButtonContainer,
  }) {
  const [selectedPlatformTemplateModel, setSelectedPlatformTemplateModel] =
    useState(undefined);
  const [selectedCustomerTemplateModel, setSelectedCustomerTemplateModel] = useState(undefined);
  const {getCustomerPipelineTemplateModel} = useGetCustomerPipelineTemplateModel();
  const {getPlatformPipelineTemplateModel} = useGetPlatformPipelineTemplateModel();

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase
          backButtonFunction={backButtonFunction}
        />,
      );
    }
  }, []);

  if (selectedPlatformTemplateModel != null) {
    return (
      <DeployPlatformPipelineForm
        platformPipelineTemplateModel={selectedPlatformTemplateModel}
        backButtonFunction={() => {
          setSelectedPlatformTemplateModel(undefined);
        }}
        setButtonContainer={setButtonContainer}
      />
    );
  }

  if (selectedCustomerTemplateModel != null) {
    return (
      <DeployCustomerPipelineForm
        customerPipelineTemplateModel={selectedCustomerTemplateModel}
        backButtonFunction={() => {
          setSelectedCustomerTemplateModel(undefined);
        }}
        setButtonContainer={setButtonContainer}
      />
    );
  }

  return (
    <PipelineTemplateSelectionScreen
      setSelectedPlatformTemplate={(pipelineTemplate) => setSelectedPlatformTemplateModel(getPlatformPipelineTemplateModel(pipelineTemplate, false))}
      setSelectedCustomerTemplate={(pipelineTemplate) => setSelectedCustomerTemplateModel(getCustomerPipelineTemplateModel(pipelineTemplate, false))}
      className={"p-3"}
      setupMode={setupMode}
    />
  );
}

CreatePipelineWizardTemplateSelectionScreen.propTypes = {
  backButtonFunction: PropTypes.func,
  setupMode: PropTypes.string,
  setButtonContainer: PropTypes.func
};
