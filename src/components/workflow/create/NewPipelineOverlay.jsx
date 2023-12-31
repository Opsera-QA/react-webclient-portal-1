import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetPolicyModelByName from "hooks/settings/organization_settings/policies/useGetPolicyModelByName";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import pipelineActions from "components/workflow/pipeline-actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import OpseraPipelineMarketplace from "components/workflow/catalog/platform/OpseraPlatformMarketplace";
import CustomerPipelineTemplateCatalog from "components/workflow/catalog/private/CustomerPipelineTemplateCatalog";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import pipelineMetadata from "@opsera/definitions/constants/pipelines/pipeline.metadata";
import DeployPlatformPipelineOverlay from "components/workflow/catalog/platform/deploy/DeployPlatformPipelineOverlay";
import DeployCustomerPipelineOverlay from "components/workflow/catalog/private/deploy/DeployCustomerPipelineOverlay";
import PipelineTemplateSelectionScreen from "components/workflow/create/PipelineTemplateSelectionScreen";

export default function NewPipelineOverlay(
  {
    loadData,
    backButtonFunction,
  }) {
  const [activeTemplates, setActiveTemplates] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPlatformTemplate, setSelectedPlatformTemplate] = useState(undefined);
  const [selectedCustomerTemplate, setSelectedCustomerTemplate] = useState(undefined);
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
    toastContext,
    userData,
  } = useComponentStateReference();
  const {
    policyModel,
    isLoading,
  } = useGetPolicyModelByName(policyConstants.POLICY_NAMES.PLATFORM_PIPELINE_CATALOG_VISIBILITY);

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  useEffect(() => {
    loadInUseIds().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadInUseIds = async () => {
    try {
      const response = await pipelineActions.getInUseTemplatesV2(getAccessToken, cancelTokenSource);
      setActiveTemplates([...DataParsingHelper.parseNestedArray(response, "data.data", [])]);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const getCurrentView = () => {
    if (policyModel == null && activeTab === "all") {
      return (
        <OpseraPipelineMarketplace
          activeTemplates={activeTemplates}
          selectTemplateFunction={setSelectedPlatformTemplate}
        />
      );
    }

    switch (activeTab) {
      case "customer":
      default:
        return (
          <CustomerPipelineTemplateCatalog
            activeTemplates={activeTemplates}
            selectTemplateFunction={setSelectedCustomerTemplate}
          />
        );
    }
  };

  const handleBackButton = () => {
    setSelectedPlatformTemplate(undefined);
    setSelectedCustomerTemplate(undefined);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab
          activeTab={activeTab}
          tabText={"Pipeline Marketplace"}
          handleTabClick={handleTabClick}
          tabName={"all"}
          visible={policyModel == null}
        />
        <CustomTab
          activeTab={policyModel == null ? activeTab : "customer"}
          tabText={"Shared Templates"}
          handleTabClick={handleTabClick}
          tabName={"customer"}
        />
      </CustomTabContainer>
    );
  };

  const getBody = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          type={"Catalog"}
        />
      );
    }

    return (
      <PipelineTemplateSelectionScreen
        setSelectedPlatformTemplate={setSelectedPlatformTemplate}
        setSelectedCustomerTemplate={setSelectedPlatformTemplate}
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
      showCloseButton={true}
      backButtonFunction={backButtonFunction}
    >
      {getBody()}
    </CreateCenterPanel>
  );
}

NewPipelineOverlay.propTypes = {
  loadData: PropTypes.func,
  backButtonFunction: PropTypes.func,
};
