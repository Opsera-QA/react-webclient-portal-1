import React, { useState } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import tagsUsedInDashboardMetadata from "components/reports/tags/dashboards/tags-used-in-dashboard-metadata";
import TagArrayUsedInDashboardsField from "components/common/fields/tags/TagArrayUsedInDashboardsField";
import TagManager from "components/common/inputs/tags/TagManager";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function TagsUsedInDashboardsReport() {
  const [tagsUsedInDashboardDto, setTagsUsedInDashboardDto] = useState(new Model(tagsUsedInDashboardMetadata.newObjectFields, tagsUsedInDashboardMetadata, true));
  const {
    isOpseraAdministrator,
    isSiteAdministrator,
    isSassUser,
    isPowerUser,
    isSecurityManager,
    isAuditor,
  } = useComponentStateReference();

  if (
    isOpseraAdministrator !== true
    && isSiteAdministrator !== true
    && isSassUser !== true
    && isPowerUser !== true
    && isSecurityManager !== true
    && isAuditor !== true
  ) {
    return null;
  }

  if (!tagsUsedInDashboardDto) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"tagsUsedInDashboardsReport"}
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
