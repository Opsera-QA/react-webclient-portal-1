import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import UsersTagsTable from "./users/UsersTagsTable";
import { useHistory, useParams } from "react-router-dom";
import { faProjectDiagram, faUser } from "@fortawesome/pro-light-svg-icons";
import { Button, Card } from "react-bootstrap";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import toolsActions from "components/inventory/tools/tools-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import PropTypes from "prop-types";
import axios from "axios";
import DataMappingManagementSubNavigationBar
  from "components/settings/data_mapping/DataMappingManagementSubNavigationBar";
import ProjectDataMappingManagement from "components/settings/data_mapping/projects/ProjectDataMappingManagement";
import UserDataMappingManagement from "components/settings/data_mapping/users/UserDataMappingManagement";

function DataMappingManagement() {
  const {tabKey} = useParams();
  const toastContext = useContext(DialogToastContext);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tabKey === "users" ? "users" : "projects");
  const [projectTagCount, setProjectTagCount] = useState(0);
  const [toolCount, setToolCount] = useState(0);
  const history = useHistory();
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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

  const handleTabClick = (tabSelection) => (e) => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const loadData = async (cancelSource = cancelTokenSource) => {

    try {
      setIsLoading(true);
      await getRoles(cancelSource);
      await getProjectTags(cancelSource);
      await getToolRegistryList(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (!userRoleAccess) {
      setIsLoading(false);
      toastContext.showLoadingErrorDialog("Unable to fetch access privileges");
      return;
    }
    setAccessRoleData(userRoleAccess);
  };

  const getProjectTags = async (cancelSource = cancelTokenSource) => {
    try {
      const response = await adminTagsActions.getEstimatedTagCountV2(getAccessToken, cancelSource, "project");
      const tagCount = response?.data?.count;

      if (tagCount && tagCount > 0) {
        setProjectTagCount(tagCount);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const getToolRegistryList = async (cancelSource = cancelTokenSource) => {
    try {
      const response = await toolsActions.getEstimatedToolRegistryCountV2(getAccessToken, cancelSource);
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

  const getTabContainer = () => {
    return (
      <CustomTabContainer styling="alternate-tabs">
        <CustomTab
          icon={faProjectDiagram}
          tabName={"projects"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Project Tags"}
        />
        <CustomTab
          icon={faUser}
          tabName={"users"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"User Tags"}
        />
      </CustomTabContainer>
    );
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
      <>
        <div className={"m-2"}>
          {getTabContainer()}
        </div>
        <TagsTabView
          activeTab={activeTab}
          loadData={loadData}
          isLoading={isLoading}
        />
      </>
    );
  };

  return (
    <ScreenContainer
      navigationTabContainer={<DataMappingManagementSubNavigationBar activeTab={"dataMappings"} />}
      breadcrumbDestination={"dataMappingManagement"}
      accessDenied={!accessRoleData?.PowerUser && !accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator &&  !accessRoleData?.SassPowerUser}
      pageDescription={"Manage data mapping for the Opsera Analytics Engine."}
      isLoading={isLoading}
    >
      {getBody()}
    </ScreenContainer>
  );
}

function TagsTabView({ activeTab }) {
  useEffect(() => {
  }, [activeTab]);

  if (activeTab) {
    switch (activeTab) {
      case "projects":
        return (
          <ProjectDataMappingManagement />
        );
      case "users":
        return (
          <UserDataMappingManagement />
        );
      default:
        return null;
    }
  }
}

TagsTabView.propTypes = {
  activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default DataMappingManagement;
