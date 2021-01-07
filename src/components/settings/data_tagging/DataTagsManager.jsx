import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import ProjectsTagTable from "./projects/ProjectTagsTable";
import UsersTagsTable from "./users/UsersTagsTable";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import { useHistory, useParams } from "react-router-dom";
import CustomTab from "../../common/tabs/CustomTab";
import { faProjectDiagram, faUser } from "@fortawesome/pro-light-svg-icons";
import CustomTabContainer from "../../common/tabs/CustomTabContainer";
import ScreenContainer from "../../common/panels/general/ScreenContainer";
import dataMappingActions from "./data-mapping-actions";
import Model from "../../../core/data_model/model";
import tagFilterMetadata from "../tags/tag-filter-metadata";
import adminTagsActions from "../tags/admin-tags-actions";
import { Button, Card } from "react-bootstrap";
import toolsActions from "../../inventory/tools/tools-actions";
import toolFilterMetadata from "../../inventory/tools/tool-filter-metadata";
import { DialogToastContext } from "../../../contexts/DialogToastContext";

function Tagging() {
  const { tabKey } = useParams();
  const toastContext = useContext(DialogToastContext);
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [projectTags, setProjectTags] = useState([]);
  const [usersTags, setUsersTags] = useState([]);
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");
  const [tagFilterDto, setTagFilterDto] = useState(
    new Model({ ...tagFilterMetadata.newObjectFields }, tagFilterMetadata, false)
  );
  const [toolFilterDto, setToolFilterDto] = useState(
    new Model({ ...toolFilterMetadata.newObjectFields }, toolFilterMetadata, false)
  );
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
    if (tabKey === "users") {
      setActiveTab("users");
    }
    await getRoles();
    if ((projectTags && projectTags.length === 0) || (`usersTags && usersTags.length === 0`) ) {
      await getToolRegistryList(toolFilterDto);
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
    if (userRoleAccess && userRoleAccess.OpseraAdministrator) {
      setAccessRoleData(userRoleAccess);
      await fetchProjectTags();
      await fetchUserTags();
    }
  };

  const getProjectTags = async () => {
    try {
      let newFilterDto = tagFilterDto;
      newFilterDto.setData("pageSize", 50);
      newFilterDto.setData("currentPage", 1);
      newFilterDto.setData("sortOption", { value: "type" });
      newFilterDto.setData("type", { value: "project" });
      setTagFilterDto({ ...newFilterDto });
      const response = await adminTagsActions.getTags(tagFilterDto, getAccessToken);
      if (response && response.data && response.data.data && response.data.data.length > 0) {
        setOpseraProjectTags(response.data.data);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const getToolRegistryList = async (filterDto = toolFilterDto) => {
    try {
      const response = await toolsActions.getToolRegistryList(filterDto, getAccessToken);
      if (response && response.data && response.data.data && response.data.data.length > 0) {
        setToolRegistryList(response.data.data);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const fetchProjectTags = async () => {
    try {
      const projectMappings = await dataMappingActions.getProjectMappings(getAccessToken);
      setProjectTags(projectMappings.data);
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

  if (!accessRoleData) {
    return (
      <ScreenContainer
        breadcrumbDestination={"mapping"}
        pageDescription={"Manage data mapping for the Opsera Analytics Engine."}
        isLoading={true}
      ></ScreenContainer>
    );
  }

  if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return <AccessDeniedDialog roleData={accessRoleData} />;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"mapping"}
      pageDescription={"Manage data mapping for the Opsera Analytics Engine."}
      isLoading={isLoading}
    >
      {showToast && toast}
      {!opseraProjectTags && !isLoading && (
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
      )}
      {!toolRegistryList && !isLoading && (
        <Card className={"mt-2 mb-1"}>
          <Card.Header as="h5">Configure Tools</Card.Header>
          <Card.Body>
            <Card.Text>
              Welcome to the OpsERA Analytics Data Mapping Manager! You must configure tools in the Opsera Tool Registry
              tags before mapping incoming data. Click the button below in order to visit the Opsera Tool Registry to
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
      )}
      {opseraProjectTags && toolRegistryList && !isLoading && (
        <>
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
          <div className="content-block-collapse p-3">
            <ToolManagementTabView
              activeTab={activeTab}
              loadData={loadData}
              isLoading={isLoading}
              projectTags={projectTags}
              usersTags={usersTags}
            />
          </div>
        </>
      )}
    </ScreenContainer>
  );
}

function ToolManagementTabView({ activeTab, loadData, isLoading, projectTags, usersTags }) {
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
