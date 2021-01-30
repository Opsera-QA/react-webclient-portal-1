import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import ProjectsTagTable from "./projects/ProjectTagsTable";
import UsersTagsTable from "./users/UsersTagsTable";
import { useHistory, useParams } from "react-router-dom";
import { faProjectDiagram, faUser } from "@fortawesome/pro-light-svg-icons";
import dataMappingActions from "./data-mapping-actions";
import { Button, Card } from "react-bootstrap";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import toolFilterMetadata from "components/inventory/tools/tool-filter-metadata";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import toolsActions from "components/inventory/tools/tools-actions";
import LoadingDialog from "components/common/status_notifications/loading";

function Tagging() {
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

  useEffect(() => {
    loadData();
  }, []);

  const handleTabClick = (tabSelection) => (e) => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const loadData = async () => {
    setIsLoading(true);
    await getRoles();
    if ((projectTags && projectTags.length === 0) || (`usersTags && usersTags.length === 0`) ) {
      await getToolRegistryList();
      await getProjectTags();
    } else {
      setOpseraProjectTags([{value : "Skipping onload of project Tags"}])
      setToolRegistryList([{value : "Skipping onload of tool registry info"}])
    }
    setIsLoading(false);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    setAccessRoleData(userRoleAccess);
    await fetchProjectTags();
    await fetchUserTags();
    if (!userRoleAccess) {
      setIsLoading(false)
      toastContext.showLoadingErrorDialog("Unable to fetch access privileges");
      return
    }
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

  const fetchProjectTags = async () => {
    try {
      const projectMappings = await dataMappingActions.getProjectMappings(getAccessToken);
      setProjectTags(projectMappings?.data);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const fetchUserTags = async () => {
    try {
      const userMappings = await dataMappingActions.getUserMappings(getAccessToken);
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
              Welcome to the OpsERA Analytics Data Mapping Manager! You must configure project tags before mapping
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
              Welcome to the OpsERA Analytics Data Mapping Manager! You must configure tools in the Opsera Tool Registry
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
        <div>
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
      <div>
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
        breadcrumbDestination={"mapping"}
        pageDescription={"Manage data mapping for the Opsera Analytics Engine."}
        isLoading={true}
      />
    );
  }

  if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return <AccessDeniedDialog roleData={accessRoleData} />;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"mapping"}
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

export default Tagging;
