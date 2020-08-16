import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import LoadingDialog from "../../../common/loading";
import Model from "../../../../core/data_model/model";
import ToolSummaryPanel from "./ToolSummaryPanel";
import inventoryActions from "../../inventory-actions";
import toolMetadata from "../tool-metadata";
import ToolDetailPanel from "./ToolDetailPanel";

function ToolDetailView() {
  const { id } = useParams();
  const { getAccessToken } = useContext(AuthContext);
  const [toolData, setToolData] = useState(undefined);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // getRoles();
    getTool();
    setPageLoading(false);
  }, []);

  const getTool = async () => {
    const response = await inventoryActions.getToolById(id, getAccessToken);
    setToolData(new Model(...response.data, toolMetadata, false));
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

  if (pageLoading) {
    return (<LoadingDialog size="sm"/>);
  } else {
    return (
      <>
        <BreadcrumbTrail destination="toolDetailView"/>
        {toolData &&
        <div className="content-container content-card-1 max-content-width ml-2">
          <div className="pt-2 pl-2 content-block-header"><h5>Tool Details
            [{toolData["name"]}]</h5></div>
          <div className="detail-view-body">
            <div>
              <ToolSummaryPanel toolData={toolData} setToolData={setToolData}/>
            </div>
            <div>
              <ToolDetailPanel toolData={toolData} setToolData={setToolData} loadData={getTool} />
            </div>
          </div>
          <div className="content-block-footer"/>
        </div>
        }
      </>
    );
  }
}

export default ToolDetailView;