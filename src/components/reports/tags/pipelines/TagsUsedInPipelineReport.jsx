import React, { useState } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import tagsUsedInPipelineMetadata from "components/reports/tags/pipelines/tags-used-in-pipeline-metadata";
import TagArrayUsedInPipelinesField from "components/common/fields/tags/TagArrayUsedInPipelinesField";
import TagManager from "components/common/inputs/tags/TagManager";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function TagsUsedInPipelineReport() {
  const [tagsUsedInPipelineDto, setTagsUsedInPipelineDto] = useState(new Model(tagsUsedInPipelineMetadata.newObjectFields, tagsUsedInPipelineMetadata, true));
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

  if (!tagsUsedInPipelineDto) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"tagsUsedInPipelineReport"}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"tagReportViewer"} />}
      pageDescription={"View which Pipelines are in use by a specific Tag combination"}
    >
      <Row className={"mb-3 mx-0"}>
        <Col className={"mx-0"}>
          <TagManager type={"tags"} allowCreate={false} fieldName={"tags"} dataObject={tagsUsedInPipelineDto} setDataObject={setTagsUsedInPipelineDto}/>
        </Col>
      </Row>
      <Row className={"px-2"}>
        <Col>
          <TagArrayUsedInPipelinesField tags={tagsUsedInPipelineDto?.getData("tags")} showTable={true}/>
        </Col>
      </Row>
    </ScreenContainer>
  );
}

export default TagsUsedInPipelineReport;

