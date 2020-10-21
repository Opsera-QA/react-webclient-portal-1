import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingDialog from "../../../../common/status_notifications/loading";
import AccessDeniedDialog from "../../../../common/status_notifications/accessDeniedInfo";
import {AuthContext} from "../../../../../contexts/AuthContext";
import toolTypeActions from "../../tool-management-actions";
import Model from "../../../../../core/data_model/model";
import toolIdentifierMetadata from "../tool-identifier-metadata";
import ToolIdentifierSummaryPanel from "./ToolIdentifierSummaryPanel";
import ToolIdentifierDetailPanel from "./ToolIdentifierDetailPanel";
import {faTools} from "@fortawesome/pro-solid-svg-icons";
import DetailViewContainer from "../../../../common/panels/detail_view_container/DetailViewContainer";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import DataNotFoundContainer from "../../../../common/panels/detail_view_container/DataNotFoundContainer";
import DataNotFoundDialog from "../../../../common/status_notifications/data_not_found/DataNotFoundDialog";
import {faWrench} from "@fortawesome/free-solid-svg-icons";

function ToolIdentifierDetailView() {
  const {toolIdentifierId} = useParams();
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [toolIdentifierData, setToolIdentifierData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      if (!error.message.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getToolIdentifier = async (toolIdentifierId) => {
    const response = await toolTypeActions.getToolIdentifierById(toolIdentifierId, getAccessToken);
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
  }

  if (accessRoleData.OpseraAdministrator === false) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  }

  if (!isLoading && toolIdentifierData == null) {
    return (
      <DataNotFoundContainer type={"Tool Identifier"} breadcrumbDestination={"toolIdentifierDetailView"}>
        <DataNotFoundDialog type={"Tool Identifier"} managementViewIcon={faWrench} managementViewTitle={"Tool Management"} managementViewLink={"/admin/tools"} />
      </DataNotFoundContainer>
    )
  }

  return (
    <DetailViewContainer
      breadcrumbDestination={"toolIdentifierDetailView"}
      title={toolIdentifierData != null ? `Tool Identifier Details [${toolIdentifierData.getData("name")}]` : undefined}
      titleIcon={faTools}
      isLoading={isLoading}
      summaryPanel={<ToolIdentifierSummaryPanel toolIdentifierData={toolIdentifierData} setToolIdentifierData={setToolIdentifierData}/>}
      detailPanel={<ToolIdentifierDetailPanel toolIdentifierData={toolIdentifierData} setToolIdentifierData={setToolIdentifierData}/>}
    />
    );
}

export default ToolIdentifierDetailView;