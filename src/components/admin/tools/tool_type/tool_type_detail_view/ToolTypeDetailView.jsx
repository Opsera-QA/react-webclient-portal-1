import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingDialog from "../../../../common/status_notifications/loading";
import AccessDeniedDialog from "../../../../common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "../../../../common/navigation/breadcrumbTrail";
import {AuthContext} from "../../../../../contexts/AuthContext";
import ToolTypeSummaryPanel from "./ToolTypeSummaryPanel";
import toolTypeActions from "../../tool-management-actions";
import Model from "../../../../../core/data_model/model";
import toolTypeMetadata from "../tool-type-metadata";
import ToolTypeDetailPanel from "./ToolTypeDetailPanel";

function ToolTypeDetailView() {
  const {toolTypeId} = useParams();
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [toolTypeData, setToolTypeData] = useState(undefined);

  useEffect(() => {
    getRoles();
  }, []);

  const getToolType = async (toolTypeId) => {
    const response = await toolTypeActions.getToolTypeById(toolTypeId, getAccessToken);
    console.log("response: " + JSON.stringify(response.data));
    // // TODO: remove grabbing first when it only sends object instead of array
    if (response.data != null && response.data.length > 0) {
      setToolTypeData(new Model(response.data[0], toolTypeMetadata, false));
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess.OpseraAdministrator === true) {
        await getToolType(toolTypeId);
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
        <BreadcrumbTrail destination="toolTypeDetailView"/>
        {toolTypeData &&
        <div className="content-container content-card-1 max-content-width ml-2">
          <div className="pt-2 pl-2 content-block-header">
            <h5>Tool Type Details [{toolTypeData.getData("name")}]</h5>
          </div>
          <div className="detail-view-body">
            <div>
              <ToolTypeSummaryPanel toolTypeData={toolTypeData} setToolTypeData={setToolTypeData}/>
            </div>
            <div>
              <ToolTypeDetailPanel toolTypeData={toolTypeData} setToolTypeData={setToolTypeData}/>
            </div>
          </div>
          <div className="content-block-footer"/>
        </div>
        }
      </>
    );
  }
}

export default ToolTypeDetailView;