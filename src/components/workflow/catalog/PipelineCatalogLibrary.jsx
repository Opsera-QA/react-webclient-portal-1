import React, {useContext, useState, useEffect, useRef} from "react";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import pipelineActions from "components/workflow/pipeline-actions";
import axios from "axios";
import PipelineCatalog from "components/workflow/catalog/PipelineCatalog";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import PipelineCatalogCustomTab from "components/workflow/catalog/PipelineCatalogCustomTab";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import CatalogHelpDocumentation from "components/common/help/documentation/pipelines/catalog/CatalogHelpDocumentation";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";

function PipelineCatalogLibrary() {
  const { setAccessRoles, getAccessToken, getUserRecord } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [activeTemplates, setActiveTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accessRoleData, setAccessRoleData] = useState(null);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
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

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await loadInUseIds(cancelSource);
    }
  };

  const loadInUseIds = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineActions.getInUseTemplatesV2(getAccessToken, cancelSource);

    if (isMounted?.current === true && response?.data) {
      setActiveTemplates(response.data);
    }
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "all":
        return (
          <>
            <div className={"p-2"}>
              {`
                These are publicly available pipeline templates provided by Opsera. All users have access to them.
              `}
            </div>
            <PipelineCatalog source={undefined} activeTemplates={activeTemplates} />
          </>
        );
      case "customer":
        return (
          <>
            <div className={"p-2"}>
              {`
                This is your organization’s private catalog of pipeline templates. These are accessible to you and your organization only. To share a pipeline template with your organization, publish it to this catalog in Pipeline Summary.
              `}
            </div>
            <PipelineCatalog source={"customer"} activeTemplates={activeTemplates} />
          </>
        );
      default:
        return null;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <PipelineCatalogCustomTab
          activeTab={activeTab}
          tabText={"Pipeline Marketplace"}
          handleTabClick={handleTabClick}
          tabName={"all"}
        />
        <PipelineCatalogCustomTab
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
      pageDescription={"To begin building your pipeline, choose one of the pipeline templates provided in the Marketplace or Private Catalogs."}
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
