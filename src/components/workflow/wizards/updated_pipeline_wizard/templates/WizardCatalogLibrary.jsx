import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetPolicyModelByName from "hooks/settings/organization_settings/policies/useGetPolicyModelByName";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import pipelineActions from "components/workflow/pipeline-actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import PipelineTemplateSelectionScreen from "components/workflow/create/PipelineTemplateSelectionScreen";
import DeployPlatformPipelineForm from "./deploy_template/DeployPlatformPipelineForm";
import DeployCustomerPipelineForm from "./deploy_template/DeployCustomerPipelineForm";
import OverlayWizardButtonContainerBase
  from "../../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";

export default function WizardCatalogLibrary({ loadData, backButtonFunction, setupMode, setButtonContainer }) {
  const [activeTemplates, setActiveTemplates] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPlatformTemplate, setSelectedPlatformTemplate] =
    useState(undefined);
  const [selectedCustomerTemplate, setSelectedCustomerTemplate] = useState(undefined);
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
    toastContext,
    userData,
  } = useComponentStateReference();
  const { policyModel, isLoading } = useGetPolicyModelByName(
    policyConstants.POLICY_NAMES.PLATFORM_PIPELINE_CATALOG_VISIBILITY,
  );

  const handleTabClick = (tabSelection) => (e) => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
          <OverlayWizardButtonContainerBase
              backButtonFunction={backButtonFunction}
          />,
      );
    }
    loadInUseIds().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadInUseIds = async () => {
    try {
      const response = await pipelineActions.getInUseTemplatesV2(
        getAccessToken,
        cancelTokenSource,
      );
      setActiveTemplates([
        ...DataParsingHelper.parseNestedArray(response, "data.data", []),
      ]);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  if (isLoading === true) {
    return <CenterLoadingIndicator type={"Catalog"} />;
  }

  if (selectedPlatformTemplate != null) {
    return (
        <DeployPlatformPipelineForm
            platformPipelineTemplateModel={selectedPlatformTemplate}
            backButtonFunction={() => {setSelectedPlatformTemplate(undefined);}}
            setButtonContainer={setButtonContainer}
        />
    );
  }

  if (selectedCustomerTemplate != null) {
    return (
        <DeployCustomerPipelineForm
            customerPipelineTemplateModel={selectedCustomerTemplate}
            backButtonFunction={() => {setSelectedCustomerTemplate(undefined);}}
            setButtonContainer={setButtonContainer}
        />
    );
  }

  return (
    <PipelineTemplateSelectionScreen
      setSelectedPlatformTemplate={setSelectedPlatformTemplate}
      setSelectedCustomerTemplate={setSelectedPlatformTemplate}
      className={"p-3"}
      setupMode={setupMode}
    />
  );
}

WizardCatalogLibrary.propTypes = {
  loadData: PropTypes.func,
  backButtonFunction: PropTypes.func,
  setupMode: PropTypes.string,
  setButtonContainer: PropTypes.func
};
