import React, { useState } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import tagsUsedInProjectsMetadata from "./tags-used-in-projects-metadata";
import TagArrayUsedInProjectsField from "components/common/fields/tags/TagArrayUsedInProjectsField";
import TagManager from "components/common/inputs/tags/TagManager";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import OrganizationMultiSelectInput from "components/common/list_of_values_input/settings/organizations/OrganizationMultiSelectInput";

function TagsUsedInProjectsReport() {
  const [tagsUsedInProjectsDto, setTagsUsedInProjectsDto] = useState(new Model(tagsUsedInProjectsMetadata.newObjectFields, tagsUsedInProjectsMetadata, true));
  const {
    isOpseraAdministrator,
    isSiteAdministrator,
    isSaasUser,
    isPowerUser,
    isSecurityManager,
    isAuditor,
  } = useComponentStateReference();

  if (
    isOpseraAdministrator !== true
    && isSiteAdministrator !== true
    && isSaasUser !== true
    && isPowerUser !== true
    && isSecurityManager !== true
    && isAuditor !== true
  ) {
    return null;
  }

  if (!tagsUsedInProjectsDto) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"tagsUsedInProjectsReport"}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"tagReportViewer"} />}
      pageDescription={"View which Projects are in use by a specific Tag combination"}
    >
      <Row className={"mb-3 mx-0"}>
        <Col className={"mx-0"}>
          <TagManager type={"tags"} allowCreate={false} fieldName={"tags"} dataObject={tagsUsedInProjectsDto} setDataObject={setTagsUsedInProjectsDto}/>
        </Col>
      </Row>
      <Row className={"mb-3 mx-0"}>
        <Col className={"mx-0"}>
          <OrganizationMultiSelectInput fieldName={"orgTags"} dataObject={tagsUsedInProjectsDto} setDataObject={setTagsUsedInProjectsDto} />
        </Col>
      </Row>
      <Row className={"px-2"}>
        <Col>
          <TagArrayUsedInProjectsField orgTags={tagsUsedInProjectsDto?.getData("orgTags")} tags={tagsUsedInProjectsDto?.getData("tags")} />
        </Col>
      </Row>
    </ScreenContainer>
  );
}

export default TagsUsedInProjectsReport;

