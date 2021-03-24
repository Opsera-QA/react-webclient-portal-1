import React, { useContext, useState, useEffect } from "react";
import {AuthContext} from "../../../../contexts/AuthContext";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import toolUsedInPipelineMetadata from "./tool-used-in-pipeline-metadata";
import Model from "../../../../core/data_model/model";
import ToolSelectInput from "../../../common/list_of_values_input/inventory/ToolSelectInput";
import ToolUsedInPipelinesField from "../../../common/fields/inventory/ToolUsedInPipelinesField";
import DetailPanelContainer from "../../../common/panels/detail_panel_container/DetailPanelContainer";

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

  if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"toolsUsedInPipelineReport"}
      pageDescription={"View which pipelines are in use by a specific tool"}
      isLoading={isLoading}
    >
      <Row className={"mb-3"}>
        <Col>
          <ToolSelectInput fieldName={"_id"} dataObject={toolUsedInPipelineDto} setDataObject={setToolUsedInPipelineDto}/>
        </Col>
      </Row>
      <Row className={"px-2"}>
        <Col>
          <ToolUsedInPipelinesField dataObject={toolUsedInPipelineDto}/>
        </Col>
      </Row>
    </ScreenContainer>
  );
}

export default ToolsUsedInPipelineReport;

