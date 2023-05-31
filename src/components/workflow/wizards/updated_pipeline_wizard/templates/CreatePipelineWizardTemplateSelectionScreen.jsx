import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import PipelineTemplateSelectionScreen from "components/workflow/create/PipelineTemplateSelectionScreen";
import DeployPlatformPipelineForm from "./deploy_template/DeployPlatformPipelineForm";
import DeployCustomerPipelineForm from "./deploy_template/DeployCustomerPipelineForm";
import OverlayWizardButtonContainerBase
  from "../../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import useGetCustomerPipelineTemplateModel from "hooks/workflow/catalog/customer/useGetCustomerPipelineTemplateModel";
import useGetPlatformPipelineTemplateModel from "hooks/workflow/catalog/platform/useGetPlatformPipelineTemplateModel";

export default function CreatePipelineWizardTemplateSelectionScreen({loadData, backButtonFunction, setupMode, setButtonContainer}) {
  const [selectedPlatformTemplate, setSelectedPlatformTemplate] =
    useState(undefined);
  const [selectedCustomerTemplate, setSelectedCustomerTemplate] = useState(undefined);
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

  if (selectedPlatformTemplate != null) {
    return (
      <DeployPlatformPipelineForm
        platformPipelineTemplateModel={selectedPlatformTemplate}
        backButtonFunction={() => {
          setSelectedPlatformTemplate(undefined);
        }}
        setButtonContainer={setButtonContainer}
      />
    );
  }

  if (selectedCustomerTemplate != null) {
    return (
      <DeployCustomerPipelineForm
        customerPipelineTemplateModel={selectedCustomerTemplate}
        backButtonFunction={() => {
          setSelectedCustomerTemplate(undefined);
        }}
        setButtonContainer={setButtonContainer}
      />
    );
  }

  return (
    <PipelineTemplateSelectionScreen
      setSelectedPlatformTemplate={(pipelineTemplate) => setSelectedPlatformTemplate(getPlatformPipelineTemplateModel(pipelineTemplate, false))}
      setSelectedCustomerTemplate={(pipelineTemplate) => setSelectedCustomerTemplate(getCustomerPipelineTemplateModel(pipelineTemplate, false))}
      className={"p-3"}
      setupMode={setupMode}
    />
  );
}

CreatePipelineWizardTemplateSelectionScreen.propTypes = {
  loadData: PropTypes.func,
  backButtonFunction: PropTypes.func,
  setupMode: PropTypes.string,
  setButtonContainer: PropTypes.func
};
