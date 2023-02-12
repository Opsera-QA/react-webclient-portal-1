import React, { useContext, useState, useEffect } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import tagsUsedInPipelineMetadata from "components/reports/tags/pipelines/tags-used-in-pipeline-metadata";
import TagArrayUsedInToolsField from "components/common/fields/tags/TagArrayUsedInToolsField";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import TagManager from "components/common/inputs/tags/TagManager";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function TagsUsedInToolsReport() {
  const [tagsUsedInToolsDto, setTagsUsedInToolsDto] = useState(new Model(tagsUsedInPipelineMetadata.newObjectFields, tagsUsedInPipelineMetadata, true));
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

  if (!tagsUsedInToolsDto) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"tagsUsedInToolsReport"}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"tagReportViewer"} />}
      pageDescription={"View which Tools are in use by a specific Tag combination"}
    >
      <Row className={"mb-3 mx-0"}>
        <Col className={"mx-0"}>
          <TagManager type={"tags"} allowCreate={false} fieldName={"tags"} dataObject={tagsUsedInToolsDto} setDataObject={setTagsUsedInToolsDto}/>
        </Col>
      </Row>
      <Row className={"px-2"}>
        <Col>
          <TagArrayUsedInToolsField tags={tagsUsedInToolsDto?.getData("tags")} showTable={true}/>
        </Col>
      </Row>
    </ScreenContainer>
  );
}

export default TagsUsedInToolsReport;

