import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingDialog from "../../../../common/status_notifications/loading";
import AccessDeniedDialog from "../../../../common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "../../../../common/navigation/breadcrumbTrail";
import {AuthContext} from "../../../../../contexts/AuthContext";
import toolTypeActions from "../../tool-management-actions";
import Model from "../../../../../core/data_model/model";
import toolIdentifierMetadata from "../tool-identifier-metadata";
import ToolIdentifierSummaryPanel from "./ToolIdentifierSummaryPanel";
import ToolIdentifierDetailPanel from "./ToolIdentifierDetailPanel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTools} from "@fortawesome/pro-solid-svg-icons";

function ToolIdentifierDetailView() {
  const {toolIdentifierId} = useParams();
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [toolIdentifierData, setToolIdentifierData] = useState(undefined);

  useEffect(() => {
    getRoles();
  }, []);

  const getToolIdentifier = async (toolIdentifierId) => {
    const response = await toolTypeActions.getToolIdentifierById(toolIdentifierId, getAccessToken);
    console.log("response: " + JSON.stringify(response.data));
    // // TODO: remove grabbing first when it only sends object instead of array
    if (response.data != null && response.data.length > 0) {
      setToolIdentifierData(new Model(response.data[0], toolIdentifierMetadata, false));
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess.OpseraAdministrator === true) {
        await getToolIdentifier(toolIdentifierId);
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
        <BreadcrumbTrail destination="toolIdentifierDetailView"/>
        {toolIdentifierData &&
        <div className="content-container content-card-1 max-content-width ml-2">
          <div className="pt-2 pl-2 content-block-header">
            <h5><FontAwesomeIcon icon={faTools} fixedWidth className="mr-1" />Tool Identifier Details [{toolIdentifierData.getData("name")}]</h5>
          </div>
          <div className="detail-view-body">
            <div>
              <ToolIdentifierSummaryPanel toolIdentifierData={toolIdentifierData} setToolIdentifierData={setToolIdentifierData}/>
            </div>
            <div>
              <ToolIdentifierDetailPanel toolIdentifierData={toolIdentifierData} setToolIdentifierData={setToolIdentifierData}/>
            </div>
          </div>
          <div className="content-block-footer"/>
        </div>
        }
      </>
    );
  }
}

export default ToolIdentifierDetailView;