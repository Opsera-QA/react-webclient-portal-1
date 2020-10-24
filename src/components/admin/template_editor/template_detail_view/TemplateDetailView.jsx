import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import LoadingDialog from "../../../common/status_notifications/loading";
import AccessDeniedDialog from "../../../common/status_notifications/accessDeniedInfo";
import Model from "../../../../core/data_model/model";
import templateEditorMetadata from "../template-form-fields";
import templateActions from "../template-actions";
import TemplateSummaryPanel from "./TemplateSummaryPanel";
import TemplateDetailPanel from "./TemplateDetailPanel";
import {faStream} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import DetailViewContainer from "../../../common/panels/detail_view_container/DetailViewContainer";
import DataNotFoundContainer from "../../../common/panels/detail_view_container/DataNotFoundContainer";
import DataNotFoundDialog from "../../../common/status_notifications/data_not_found/DataNotFoundDialog";

function TemplateDetailView() {
  const {templateId} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [templateData, setTemplateData] = useState(undefined);
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
      if (!error.error.message.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getTemplate = async (templateId) => {
    const response = await templateActions.getTemplateById(templateId, getAccessToken);
    // TODO: remove grabbing first when it only sends object instead of array
    if (response.data != null && response.data.length > 0) {
      setTemplateData(new Model(response.data[0], templateEditorMetadata, false));
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess.OpseraAdministrator === true) {
        await getTemplate(templateId);
      }
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (accessRoleData.OpseraAdministrator === false) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  }

  if (!isLoading && templateData == null) {
    return (
      <DataNotFoundContainer type={"Pipeline Template"} breadcrumbDestination={"templateDetailView"}>
        <DataNotFoundDialog type={"Pipeline Template"} managementViewIcon={faStream} managementViewTitle={"Pipeline Template Management"} managementViewLink={"/admin/templates"} />
      </DataNotFoundContainer>
    )
  }

  return (
    <DetailViewContainer
      breadcrumbDestination={"templateDetailView"}
      title={templateData != null ? `Template Details [${templateData.getData("name")}]` : undefined}
      titleIcon={faStream}
      isLoading={isLoading}
      summaryPanel={<TemplateSummaryPanel templateData={templateData} opseraAdmin={accessRoleData.OpseraAdministrator === true}/>}
      detailPanel={<TemplateDetailPanel setTemplateData={setTemplateData} templateData={templateData}/>}
    />
  );
}

export default TemplateDetailView;