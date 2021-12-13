import React, { useContext, useState, useEffect } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import toolUsedInPipelineMetadata from "components/reports/tools/pipelines/tool-used-in-pipeline-metadata";
import ToolSelectInput from "components/common/list_of_values_input/inventory/ToolSelectInput";
import ToolUsedInPipelinesField from "components/common/fields/inventory/ToolUsedInPipelinesField";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";

function ToolsUsedInPipelineReport() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [toolUsedInPipelineDto, setToolUsedInPipelineDto] = useState(undefined);
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
      setToolUsedInPipelineDto(new Model(toolUsedInPipelineMetadata.newObjectFields, toolUsedInPipelineMetadata, true));
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"toolsUsedInPipelineReport"}
      isLoading={isLoading}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
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

export default ToolsUsedInPipelineReport;

