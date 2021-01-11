import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingDialog from "../../../../common/status_notifications/loading";
import AccessDeniedDialog from "../../../../common/status_notifications/accessDeniedInfo";
import {AuthContext} from "../../../../../contexts/AuthContext";
import toolTypeActions from "../../tool-management-actions";
import Model from "../../../../../core/data_model/model";
import toolIdentifierMetadata from "../tool-identifier-metadata";
import ToolIdentifierDetailPanel from "./ToolIdentifierDetailPanel";
import {faTools} from "@fortawesome/pro-solid-svg-icons";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import {faWrench} from "@fortawesome/free-solid-svg-icons";
import DetailScreenContainer from "../../../../common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "../../../../common/actions/ActionBarContainer";
import ActionBarBackButton from "../../../../common/actions/buttons/ActionBarBackButton";
import ActionBarToggleButton from "../../../../common/actions/buttons/ActionBarToggleButton";

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

  const handleActiveToggle = async () => {
    try {
      let newToolIdentifierData = {...toolIdentifierData};
      newToolIdentifierData.setData("active", !newToolIdentifierData.getData("active"));
      let response = await toolTypeActions.updateToolIdentifier({...newToolIdentifierData}, getAccessToken);
      let updatedDto = new Model(response.data, toolIdentifierData.metaData, false);
      setToolIdentifierData(updatedDto);
      toastContext.showUpdateSuccessResultDialog(newToolIdentifierData.getType());
    } catch (error) {
      toastContext.showUpdateFailureResultDialog(error);
      console.error(error);
    }
  }

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/tools/identifiers"} />
        </div>
        <div>
          <ActionBarToggleButton status={toolIdentifierData?.getData("active")} handleActiveToggle={handleActiveToggle} />
        </div>
      </ActionBarContainer>
    );
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (accessRoleData.OpseraAdministrator === false) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"toolIdentifierDetailView"}
      title={toolIdentifierData != null ? `Tool Identifier Details [${toolIdentifierData.getData("name")}]` : undefined}
      managementViewLink={"/admin/tools/identifiers"}
      managementTitle={"Tool Management"}
      managementViewIcon={faWrench}
      type={"Tool Identifier"}
      titleIcon={faTools}
      dataObject={toolIdentifierData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<ToolIdentifierDetailPanel toolIdentifierData={toolIdentifierData} setToolIdentifierData={setToolIdentifierData}/>}
    />
  );
}

export default ToolIdentifierDetailView;