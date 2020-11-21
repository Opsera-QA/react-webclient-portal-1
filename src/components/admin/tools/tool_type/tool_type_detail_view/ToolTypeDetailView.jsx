import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingDialog from "../../../../common/status_notifications/loading";
import AccessDeniedDialog from "../../../../common/status_notifications/accessDeniedInfo";
import {AuthContext} from "../../../../../contexts/AuthContext";
import toolTypeActions from "../../tool-management-actions";
import Model from "../../../../../core/data_model/model";
import toolTypeMetadata from "../tool-type-metadata";
import ToolTypeDetailPanel from "./ToolTypeDetailPanel";
import {faToolbox} from "@fortawesome/pro-solid-svg-icons";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import {faWrench} from "@fortawesome/free-solid-svg-icons";
import DetailScreenContainer from "../../../../common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "../../../../common/actions/ActionBarContainer";
import ActionBarBackButton from "../../../../common/actions/buttons/ActionBarBackButton";
import ActionBarToggleButton from "../../../../common/actions/buttons/ActionBarToggleButton";

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
      if (!error.message.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getToolType = async (toolTypeId) => {
    const response = await toolTypeActions.getToolTypeById(toolTypeId, getAccessToken);
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

  const handleActiveToggle = async () => {
    try {
      let newToolTypeData = {...toolTypeData};
      newToolTypeData.setData("active", !newToolTypeData.getData("active"));
      let response = await toolTypeActions.updateToolType({...newToolTypeData}, getAccessToken);
      let updatedDto = new Model(response.data, toolTypeData.metaData, false);
      setToolTypeData(updatedDto);
      toastContext.showUpdateSuccessResultDialog("Tool Type");
    } catch (error) {
      toastContext.showUpdateFailureResultDialog("Tool Type", error);
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/tools"} />
        </div>
        <div>
          <ActionBarToggleButton status={toolTypeData?.getData("active")} handleActiveToggle={handleActiveToggle} />
        </div>
      </ActionBarContainer>
    );
  };

  if (accessRoleData.OpseraAdministrator === false) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"toolTypeDetailView"}
      title={toolTypeData != null ? `Tool Type Details [${toolTypeData.getData("name")}]` : undefined}
      managementViewLink={"/admin/tools"}
      managementTitle={"Tool Management"}
      managementViewIcon={faWrench}
      type={"Tool Type"}
      titleIcon={faToolbox}
      dataObject={toolTypeData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<ToolTypeDetailPanel toolTypeData={toolTypeData} setToolTypeData={setToolTypeData}/>}
      />
  );
}

export default ToolTypeDetailView;