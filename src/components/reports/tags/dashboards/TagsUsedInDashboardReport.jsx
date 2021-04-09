import React, { useContext, useState, useEffect } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import tagsUsedInDashboardMetadata from "components/reports/tags/dashboards/tags-used-in-dashboard-metadata";
import TagArrayUsedInDashboardsField from "components/common/fields/tags/TagArrayUsedInDashboardsField";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faAnalytics, faDraftingCompass, faTags, faTools} from "@fortawesome/pro-light-svg-icons";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import {useHistory} from "react-router-dom";
import TagManager from "components/common/inputs/tags/TagManager";

function TagsUsedInDashboardsReport() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [tagsUsedInDashboardDto, setTagsUsedInDashboardDto] = useState(undefined);
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      setTagsUsedInDashboardDto(new Model(tagsUsedInDashboardMetadata.newObjectFields, tagsUsedInDashboardMetadata, true));
    }
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    history.push(`/reports/${tabSelection}`);
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab activeTab={"tags"} tabText={"All Reports"} handleTabClick={handleTabClick} tabName={"all"} icon={faAnalytics} />
        <NavigationTab activeTab={"tags"} tabText={"Tool Reports"} handleTabClick={handleTabClick} tabName={"tools"} icon={faTools} />
        <NavigationTab activeTab={"tags"} tabText={"Tag Reports"} handleTabClick={handleTabClick} tabName={"tags"} icon={faTags} />
        <NavigationTab activeTab={"tags"} tabText={"Pipeline Reports"} handleTabClick={handleTabClick} tabName={"pipelines"} icon={faDraftingCompass} />
      </NavigationTabContainer>
    );
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"tagsUsedInDashboardsReport"}
      isLoading={isLoading}
      navigationTabContainer={getNavigationTabContainer()}
      roleRequirement={ROLE_LEVELS.POWER_USERS}
      accessRoleData={accessRoleData}
    >
      <div className={"ml-3 mt-3 mb-2"}>View dashboards by tags</div>
      <Row className={"mb-3 mx-0"}>
        <Col className={"mx-0"}>
          <TagManager placeholder={"select a tag to view tagged dashboards"} type={"tags"} allowCreate={false} fieldName={"tags"} dataObject={tagsUsedInDashboardDto} setDataObject={setTagsUsedInDashboardDto}/>
        </Col>
      </Row>
      <Row className={"px-2 mx-0"}>
        <Col>
          <TagArrayUsedInDashboardsField tags={tagsUsedInDashboardDto?.getData("tags")} showTable={true}/>
        </Col>
      </Row>
    </ScreenContainer>
  );
}

export default TagsUsedInDashboardsReport;
