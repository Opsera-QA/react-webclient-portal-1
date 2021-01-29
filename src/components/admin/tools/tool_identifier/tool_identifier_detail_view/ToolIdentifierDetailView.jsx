import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import toolManagementActions from "components/admin/tools/tool-management-actions";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import LoadingDialog from "components/common/status_notifications/loading";
import ToolIdentifierDetailPanel
  from "components/admin/tools/tool_identifier/tool_identifier_detail_view/ToolIdentifierDetailPanel";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import toolIdentifierMetadata from "components/admin/tools/tool_identifier/tool-identifier-metadata";

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
      if (!error.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getToolIdentifier = async (toolIdentifierId) => {
    const response = await toolManagementActions.getToolIdentifierById(toolIdentifierId, getAccessToken);
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

      if (userRoleAccess?.OpseraAdministrator === true) {
        await getToolIdentifier(toolIdentifierId);
      }
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/tools/identifiers"} />
        </div>
      </ActionBarContainer>
    );
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"toolIdentifierDetailView"}
      accessDenied={!accessRoleData?.OpseraAdministrator}
      metadata={toolIdentifierMetadata}
      dataObject={toolIdentifierData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<ToolIdentifierDetailPanel toolIdentifierData={toolIdentifierData} setToolIdentifierData={setToolIdentifierData}/>}
    />
  );
}

export default ToolIdentifierDetailView;