import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import LoadingDialog from "../../../common/status_notifications/loading";
import AccessDeniedDialog from "../../../common/status_notifications/accessDeniedInfo";
import Model from "../../../../core/data_model/model";
import templateEditorMetadata from "../template-form-fields";
import templateActions from "../template-actions";
import TemplateSummaryPanel from "./TemplateSummaryPanel";
import TemplateDetailPanel from "./TemplateDetailPanel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStream} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";

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
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getTemplate = async (templateId) => {
    const response = await templateActions.getTemplateById(templateId, getAccessToken);
    console.log("response: " + JSON.stringify(response.data));
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

  return (
      <>
        <BreadcrumbTrail destination="templateDetailView"/>
        {templateData &&
        <div className="content-container content-card-1 max-content-width ml-2">
          <div className="pt-2 pl-2 content-block-header">
            <h5><FontAwesomeIcon icon={faStream} fixedWidth className="mr-1"/>Template Details [{templateData.getData("name")}]</h5></div>
          <div className="detail-view-body">
            <div>
              <TemplateSummaryPanel templateData={templateData} setTemplateData={setTemplateData}/>
            </div>
            <div>
              <TemplateDetailPanel setTemplateData={setTemplateData} templateData={templateData}/>
            </div>
          </div>
          <div className="content-block-footer"/>
        </div>
        }
      </>
    );
}

export default TemplateDetailView;