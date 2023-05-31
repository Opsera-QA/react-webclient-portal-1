import React, {useState, useEffect} from "react";
import pipelineActions from "components/workflow/pipeline-actions";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import CatalogHelpDocumentation from "components/common/help/documentation/pipelines/catalog/CatalogHelpDocumentation";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import CustomTab from "components/common/tabs/CustomTab";
import CustomerPipelineTemplateCatalog from "components/workflow/catalog/private/CustomerPipelineTemplateCatalog";
import OpseraPipelineMarketplace from "components/workflow/catalog/platform/OpseraPlatformMarketplace";
import useGetPolicyModelByName from "hooks/settings/organization_settings/policies/useGetPolicyModelByName";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import {pipelineCatalogHelper} from "components/workflow/catalog/pipelineCatalog.helper";
import {useHistory} from "react-router-dom";

function PipelineCatalogLibrary() {
  const [activeTemplates, setActiveTemplates] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
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
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      await loadInUseIds();
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const loadInUseIds = async () => {
    const response = await pipelineActions.getInUseTemplatesV2(getAccessToken, cancelTokenSource);
    setActiveTemplates([...DataParsingHelper.parseNestedArray(response, "data.data", [])]);
  };

  const handleCustomerPipelineTemplateSelection = (templateId) => {
    history.push(pipelineCatalogHelper.getCustomerPipelineTemplateDetailViewLink(templateId));
  };

  const handlePlatformPipelineTemplateSelection = (templateId) => {
    history.push(pipelineCatalogHelper.getPlatformPipelineTemplateDetailViewLink(templateId));
  };

  const getCurrentView = () => {
    if (policyModel == null && activeTab === "all") {
      return (
        <OpseraPipelineMarketplace
          activeTemplates={activeTemplates}
          selectTemplateFunction={handlePlatformPipelineTemplateSelection}
          cardTooltip={"Click to View Pipeline Template Details"}
          showDeployPipelineIcon={true}
        />
      );
    }

    switch (activeTab) {
      case "customer":
      default:
        return (
          <CustomerPipelineTemplateCatalog
            activeTemplates={activeTemplates}
            selectTemplateFunction={handleCustomerPipelineTemplateSelection}
            cardTooltip={"Click to View Pipeline Template Details"}
            showDeployPipelineIcon={true}
          />
        );
    }
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
      <div className={"px-3"}>
        <TabPanelContainer currentView={getCurrentView()} tabContainer={getTabContainer()} />
      </div>
    );
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"catalog"}
      navigationTabContainer={<WorkflowSubNavigationBar currentTab={"catalog"} />}
      helpComponent={<CatalogHelpDocumentation/>}
    >
      {getBody()}
    </ScreenContainer>
  );
}

PipelineCatalogLibrary.propTypes = {};

export default PipelineCatalogLibrary;
