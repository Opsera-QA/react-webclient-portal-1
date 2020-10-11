import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingDialog from "../../../../common/status_notifications/loading";
import AccessDeniedDialog from "../../../../common/status_notifications/accessDeniedInfo";
import {AuthContext} from "../../../../../contexts/AuthContext";
import ToolTypeSummaryPanel from "./ToolTypeSummaryPanel";
import toolTypeActions from "../../tool-management-actions";
import Model from "../../../../../core/data_model/model";
import toolTypeMetadata from "../tool-type-metadata";
import ToolTypeDetailPanel from "./ToolTypeDetailPanel";
import {faToolbox} from "@fortawesome/pro-solid-svg-icons";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import DetailViewContainer from "../../../../common/panels/detail_view_container/DetailViewContainer";

function ToolTypeDetailView() {
  const {toolTypeId} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [toolTypeData, setToolTypeData] = useState(undefined);
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
  }

  if (accessRoleData.OpseraAdministrator === false) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <DetailViewContainer
      breadcrumbDestination={"toolTypeDetailView"}
      title={toolTypeData != null ? `Tool Type Details [${toolTypeData.getData("name")}]` : undefined}
      titleIcon={faToolbox}
      isLoading={isLoading}
      summaryPanel={<ToolTypeSummaryPanel toolTypeData={toolTypeData} setToolTypeData={setToolTypeData}/>}
      detailPanel={<ToolTypeDetailPanel toolTypeData={toolTypeData} setToolTypeData={setToolTypeData}/>}
    />
  );
}

export default ToolTypeDetailView;