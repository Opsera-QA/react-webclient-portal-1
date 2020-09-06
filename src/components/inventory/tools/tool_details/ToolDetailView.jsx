import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import LoadingDialog from "../../../common/status_notifications/loading";
import Model from "../../../../core/data_model/model";
import ToolSummaryPanel from "./ToolSummaryPanel";
import inventoryActions from "../../inventory-actions";
import toolMetadata from "../tool-metadata";
import ToolDetailPanel from "./ToolDetailPanel";
import {getLoadingErrorDialog} from "../../../common/toasts/toasts";

function ToolDetailView() {
  const { id } = useParams();
  const { getAccessToken } = useContext(AuthContext);
  const [toolData, setToolData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);


  useEffect(() => {
    // getRoles();
    getTool();
  }, []);

  const getTool = async () => {
    console.log("loading tool");
    setIsLoading(true);
    try {
      const response = await inventoryActions.getToolById(id, getAccessToken);
      setToolData(new Model(...response.data, toolMetadata, false));
    } catch (error) {
      let toast = getLoadingErrorDialog(error.message, setShowToast);
      setToast(toast);
      setShowToast(true);
      console.error(error.message);
    }
    setIsLoading(false);
  };

  // TODO: Implement Roles if required
  // const getRoles = async () => {
  //   const user = await getUserRecord();
  //   const userRoleAccess = await setAccessRoles(user);
  //   if (userRoleAccess) {
  //     setAccessRoleData(userRoleAccess);
  //
  //     if (userRoleAccess["Administrator"] === true) {
  //       await getTool();
  //     }
  //   }
  // };

    return (
      <>
        <BreadcrumbTrail destination="toolDetailView"/>
        {showToast && toast}
        {toolData &&
        <div className="content-container content-card-1 max-content-width ml-2">
          <div className="pt-2 pl-2 content-block-header"><h5>Tool Details
            [{toolData["name"]}]</h5></div>
          <div className="detail-view-body">
            <div>
              <ToolSummaryPanel toolData={toolData} setToolData={setToolData}/>
            </div>
            <div>
              <ToolDetailPanel toolData={toolData} isLoading={isLoading} setToolData={setToolData} loadData={getTool} />
            </div>
          </div>
          <div className="content-block-footer"/>
        </div>
        }
      </>
    );
}

export default ToolDetailView;