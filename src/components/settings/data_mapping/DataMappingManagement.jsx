import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import toolsActions from "components/inventory/tools/tools-actions";
import DataMappingManagementSubNavigationBar
  from "components/settings/data_mapping/DataMappingManagementSubNavigationBar";
import DataMappingManagementTabView from "components/settings/data_mapping/DataMappingManagementTabView";
import useComponentStateReference from "hooks/useComponentStateReference";
import AnalyticsProjectDataMappingRoleHelper
  from "@opsera/know-your-role/roles/settings/analytics_data_mappings/projects/analyticsProjectDataMappingRole.helper";

export default function DataMappingManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [projectTagCount, setProjectTagCount] = useState(0);
  const [toolCount, setToolCount] = useState(0);
  const history = useHistory();
  const {
    toastContext,
    getAccessToken,
    userData,
    isMounted,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      if (AnalyticsProjectDataMappingRoleHelper.canGetAnalyticsProjectDataMappingList(userData) !== true) {
        return;
      }

      setIsLoading(true);
      await getProjectTags();
      await getToolRegistryList();
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getProjectTags = async () => {
    try {
      const response = await adminTagsActions.getEstimatedTagCountV2(getAccessToken, cancelTokenSource, "project");
      const tagCount = response?.data?.count;

      if (tagCount && tagCount > 0) {
        setProjectTagCount(tagCount);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const getToolRegistryList = async () => {
    try {
      const response = await toolsActions.getEstimatedToolRegistryCountV2(getAccessToken, cancelTokenSource);
      const toolCount = response?.data?.count;

      if (toolCount && toolCount > 0) {
        setToolCount(toolCount);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const goToAnalytics = () => {
    history.push(`/settings/tags`);
  };

  const goToToolRegistry = () => {
    history.push(`/inventory/tools`);
  };

  const getNoTagsMessage = () => {
    if (projectTagCount === 0 && !isLoading) {
      return (
        <Card className={"mt-2 mb-1"}>
          <Card.Header as="h5">Configure Tagging</Card.Header>
          <Card.Body>
            <Card.Text>
              Welcome to the Opsera Analytics Data Mapping Manager! You must configure project tags before mapping
              incoming data. Click the button below in order to visit the Opsera Tags Manager to create new tags.
            </Card.Text>
            <Button
              onClick={() => {
                goToAnalytics();
              }}
              variant="primary"
            >
              Tags Manager
            </Button>
          </Card.Body>
        </Card>
      );
    }
  };

  const getNoToolsMessage = () => {
    if (toolCount === 0 && !isLoading) {
      return (
        <Card className={"mt-2 mb-1"}>
          <Card.Header as="h5">Configure Tools</Card.Header>
          <Card.Body>
            <Card.Text>
              Welcome to the Opsera Analytics Data Mapping Manager! You must configure tools in the Opsera Tool Registry
              before mapping incoming data. Click the button below in order to visit the Opsera Tool Registry to
              configure tools.
            </Card.Text>
            <Button
              onClick={() => {
                goToToolRegistry();
              }}
              variant="primary"
            >
              Tool Registry
            </Button>
          </Card.Body>
        </Card>
      );
    }
  };

  const getBody = () => {
    if (toolCount === 0 || projectTagCount === 0) {
      return (
        <div className="px-2 pb-2">
          {getNoTagsMessage()}
          {getNoToolsMessage()}
        </div>
      );
    }

    return (
      <DataMappingManagementTabView />
    );
  };

  if (AnalyticsProjectDataMappingRoleHelper.canGetAnalyticsProjectDataMappingList(userData) !== true) {
    return null;
  }

  return (
    <ScreenContainer
      navigationTabContainer={<DataMappingManagementSubNavigationBar activeTab={"dataMappingManagement"} />}
      breadcrumbDestination={"dataMappingManagement"}
      pageDescription={"Manage data mapping for the Opsera Analytics Engine."}
      isLoading={isLoading}
    >
      {getBody()}
    </ScreenContainer>
  );
}
