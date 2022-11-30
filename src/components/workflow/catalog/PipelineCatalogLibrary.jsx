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

function PipelineCatalogLibrary() {
  const [activeTemplates, setActiveTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

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
      setIsLoading(true);
      await loadInUseIds();
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadInUseIds = async () => {
    const response = await pipelineActions.getInUseTemplatesV2(getAccessToken, cancelTokenSource);
    setActiveTemplates([...DataParsingHelper.parseArray(response?.data, [])]);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "all":
        return (
          <OpseraPipelineMarketplace
            activeTemplates={activeTemplates}
          />
        );
      case "customer":
        return (
          <CustomerPipelineTemplateCatalog
            activeTemplates={activeTemplates}
          />
        );
      default:
        return null;
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
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Shared Templates"}
          handleTabClick={handleTabClick}
          tabName={"customer"}
        />
      </CustomTabContainer>
    );
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"catalog"}
      navigationTabContainer={<WorkflowSubNavigationBar currentTab={"catalog"} />}
      helpComponent={<CatalogHelpDocumentation/>}
    >
      <div className={"px-3"}>
        <TabPanelContainer currentView={getCurrentView()} tabContainer={getTabContainer()} />
      </div>
    </ScreenContainer>
  );
}

PipelineCatalogLibrary.propTypes = {};

export default PipelineCatalogLibrary;
