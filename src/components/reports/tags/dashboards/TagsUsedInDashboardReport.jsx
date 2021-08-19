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
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import TagManager from "components/common/inputs/tags/TagManager";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";

function TagsUsedInDashboardsReport() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [tagsUsedInDashboardDto, setTagsUsedInDashboardDto] = useState(undefined);
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);

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

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"tagsUsedInDashboardsReport"}
      isLoading={isLoading}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      accessRoleData={accessRoleData}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"tagReportViewer"} />}
      pageDescription={"View which Dashboards are in use by a specific Tag combination"}
    >
      <Row className={"mb-3 mx-0"}>
        <Col className={"mx-0"}>
          <TagManager type={"tags"} allowCreate={false} fieldName={"tags"} dataObject={tagsUsedInDashboardDto} setDataObject={setTagsUsedInDashboardDto}/>
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
