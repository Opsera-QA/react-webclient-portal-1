import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import LoadingDialog from "../../../common/loading";
import AccessDeniedDialog from "../../../common/accessDeniedInfo";
import Model from "../../../../core/data_model/model";
import templateEditorMetadata from "../template-form-fields";
import templateActions from "../template-actions";
import TemplateSummaryPanel from "./TemplateSummaryPanel";
import TemplateDetailPanel from "./TemplateDetailPanel";

function TemplateDetailView() {
  const {templateId} = useParams();
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [templateData, setTemplateData] = useState(undefined);

  useEffect(() => {
    getRoles();
  }, []);

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
  } else if (accessRoleData.OpseraAdministrator === false) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  } else {
    return (
      <>
        <BreadcrumbTrail destination="templateDetailView"/>
        {templateData &&
        <div className="content-container content-card-1 max-content-width ml-2">
          <div className="pt-2 pl-2 content-block-header"><h5>Template Details
            [{templateData.getData("name")}]</h5></div>
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
}

export default TemplateDetailView;