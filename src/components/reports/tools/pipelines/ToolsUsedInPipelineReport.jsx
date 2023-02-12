import React, { useState } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import toolUsedInPipelineMetadata from "components/reports/tools/pipelines/tool-used-in-pipeline-metadata";
import ToolSelectInput from "components/common/list_of_values_input/inventory/ToolSelectInput";
import ToolUsedInPipelinesField from "components/common/fields/inventory/ToolUsedInPipelinesField";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function ToolsUsedInPipelineReport() {
  const [toolUsedInPipelineDto, setToolUsedInPipelineDto] = useState(new Model(toolUsedInPipelineMetadata.newObjectFields, toolUsedInPipelineMetadata, true));
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

  return (
    <ScreenContainer
      breadcrumbDestination={"toolsUsedInPipelineReport"}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"toolReportViewer"} />}
      pageDescription={"View which Pipelines use a specific Tool"}
    >
      <Row className={"mb-3 mx-0"}>
        <Col className={"mx-0"}>
          <ToolSelectInput fieldName={"_id"} dataObject={toolUsedInPipelineDto} setDataObject={setToolUsedInPipelineDto}/>
        </Col>
      </Row>
      <Row className={"px-2"}>
        <Col>
          <ToolUsedInPipelinesField toolId={toolUsedInPipelineDto?.getData("_id")} showTable={true}/>
        </Col>
      </Row>
    </ScreenContainer>
  );
}

