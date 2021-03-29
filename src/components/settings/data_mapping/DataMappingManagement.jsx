import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import ProjectsTagTable from "./projects/ProjectTagsTable";
import UsersTagsTable from "./users/UsersTagsTable";
import { useHistory, useParams } from "react-router-dom";
import { faProjectDiagram, faUser } from "@fortawesome/pro-light-svg-icons";
import dataMappingActions from "./data-mapping-actions";
import { Button, Card } from "react-bootstrap";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import toolsActions from "components/inventory/tools/tools-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";

function DataMappingManagement() {
  const { tabKey } = useParams();
  const toastContext = useContext(DialogToastContext);
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [projectTags, setProjectTags] = useState([]);
  const [usersTags, setUsersTags] = useState([]);
  const [activeTab, setActiveTab] = useState(tabKey === "users" ? "users" : "projects");
  const [opseraProjectTags, setOpseraProjectTags] = useState(undefined);
  const [toolRegistryList, setToolRegistryList] = useState(undefined);
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

      if ((projectTags && projectTags.length === 0) || (`usersTags && usersTags.length === 0`) ) {
        await getToolRegistryList();
        await getProjectTags();
      } else {
        setOpseraProjectTags([{value : "Skipping onload of project Tags"}]);
        setToolRegistryList([{value : "Skipping onload of tool registry info"}]);
      }

    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
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
    await fetchProjectTags(cancelSource);
    await fetchUserTags(cancelSource);
  };

  const getProjectTags = async () => {
    try {
      const response = await adminTagsActions.getProjectTags(getAccessToken);
      if (response?.data?.data?.length > 0) {
        setOpseraProjectTags(response.data.data);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const getToolRegistryList = async () => {
    try {
      const response = await toolsActions.getFullToolRegistryList(getAccessToken);
      if (response?.data?.data?.length > 0) {
        setToolRegistryList(response.data.data);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const fetchProjectTags = async (cancelSource = cancelTokenSource) => {
    try {
      const projectMappings = await dataMappingActions.getProjectMappingsV2(getAccessToken, cancelSource);
      setProjectTags(projectMappings?.data);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const fetchUserTags = async (cancelSource = cancelTokenSource) => {
    try {
      const userMappings = await dataMappingActions.getUserMappingsV2(getAccessToken, cancelSource);
      setUsersTags(userMappings.data);
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
    if (!opseraProjectTags && !isLoading) {
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
    if (!toolRegistryList && !isLoading) {
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
    if (isLoading) {
      return <LoadingDialog message={"Loading Data"} size={"sm"} />;
    }

    if (toolRegistryList && opseraProjectTags) {
      return (
        <div className="px-2 pb-2">
          {getTabContainer()}
          <div className="p-3">
            <TagsTabView
              activeTab={activeTab}
              loadData={loadData}
              isLoading={isLoading}
              projectTags={projectTags}
              usersTags={usersTags}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="px-2 pb-2">
        {getNoTagsMessage()}
        {getNoToolsMessage()}
      </div>
    );
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer styling="alternate-tabs">
        <CustomTab
          icon={faProjectDiagram}
          tabName={"projects"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Projects"}
        />
        <CustomTab
          icon={faUser}
          tabName={"users"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Users"}
        />
      </CustomTabContainer>
    );
  };

  if (!accessRoleData) {
    return (
      <ScreenContainer
        breadcrumbDestination={"dataMappingManagement"}
        pageDescription={"Manage data mapping for the Opsera Analytics Engine."}
        isLoading={true}
      />
    );
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"dataMappingManagement"}
      accessDenied={!accessRoleData?.PowerUser && !accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator &&  !accessRoleData?.SassPowerUser}
      pageDescription={"Manage data mapping for the Opsera Analytics Engine."}
    >
      {getBody()}
    </ScreenContainer>
  );
}

function TagsTabView({ activeTab, loadData, isLoading, projectTags, usersTags }) {
  useEffect(() => {
  }, [activeTab]);

  if (activeTab) {
    switch (activeTab) {
      case "projects":
        return <ProjectsTagTable loadData={loadData} isLoading={isLoading} data={projectTags} />;
      case "users":
        return <UsersTagsTable loadData={loadData} isLoading={isLoading} data={usersTags} />;
      default:
        return null;
    }
  }
}

export default DataMappingManagement;
