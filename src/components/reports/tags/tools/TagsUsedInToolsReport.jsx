import React, { useContext, useState, useEffect } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import DtoTagManagerInput from "components/common/input/dto_input/dto-tag-manager-input";
import tagsUsedInPipelineMetadata from "components/reports/tags/pipelines/tags-used-in-pipeline-metadata";
import TagArrayUsedInToolsField from "components/common/fields/tags/TagArrayUsedInToolsField";

function TagsUsedInToolsReport() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [tagsUsedInPipelineDto, setTagsUsedInPipelineDto] = useState(undefined);
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
      setIsLoading(false)
    }
  }

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      setTagsUsedInPipelineDto(new Model(tagsUsedInPipelineMetadata.newObjectFields, tagsUsedInPipelineMetadata, true));
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
      breadcrumbDestination={"tagsUsedInToolsReport"}
      pageDescription={"View which tools are in use by a specific tag combination"}
      isLoading={isLoading}
    >
      <Row className={"mb-3"}>
        <Col>
          <DtoTagManagerInput type={"tags"} allowCreate={false} fieldName={"tags"} dataObject={tagsUsedInPipelineDto} setDataObject={setTagsUsedInPipelineDto}/>
        </Col>
      </Row>
      <Row className={"px-2"}>
        <Col>
          <TagArrayUsedInToolsField dataObject={tagsUsedInPipelineDto}/>
        </Col>
      </Row>
    </ScreenContainer>
  );
}

export default TagsUsedInToolsReport;

