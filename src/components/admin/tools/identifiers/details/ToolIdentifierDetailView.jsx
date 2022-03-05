import React, {useState, useEffect, useContext, useRef} from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ToolIdentifierDetailPanel
  from "components/admin/tools/identifiers/details/ToolIdentifierDetailPanel";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import toolIdentifierMetadata from "components/admin/tools/identifiers/toolIdentifier.metadata";
import axios from "axios";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import ActionBarOpseraAdminDeleteButton from "components/common/actions/buttons/ActionBarOpseraAdminDeleteButton";
import ToolManagementSubNavigationBar from "components/admin/tools/ToolManagementSubNavigationBar";
import {toolIdentifierActions} from "components/admin/tools/identifiers/toolIdentifier.actions";

function ToolIdentifierDetailView() {
  const {toolIdentifierId} = useParams();
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [toolIdentifierData, setToolIdentifierData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (toolIdentifierId != null && userRoleAccess?.OpseraAdministrator) {
        await getToolIdentifier(cancelSource);
      }
    }
  };

  const getToolIdentifier = async (cancelSource = cancelTokenSource) => {
    const response = await toolIdentifierActions.getToolIdentifierByIdV2(getAccessToken, cancelSource, toolIdentifierId);
    const toolIdentifier = response?.data?.data;

    if (isMounted?.current === true && toolIdentifier) {
      setToolIdentifierData(new Model(toolIdentifier, toolIdentifierMetadata, false));
    }
  };

  const deleteToolIdentifier = async () => {
    return await toolIdentifierActions.deleteToolIdentifierV2(
      getAccessToken,
      cancelTokenSource,
      toolIdentifierId,
      );
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/tools/identifiers"} />
        </div>
        <div>
          <ActionBarOpseraAdminDeleteButton
            relocationPath={"/admin/tools/identifiers"}
            handleDelete={deleteToolIdentifier}
            dataObject={toolIdentifierData}
          />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"toolIdentifierDetailView"}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
      metadata={toolIdentifierMetadata}
      dataObject={toolIdentifierData}
      navigationTabContainer={<ToolManagementSubNavigationBar activeTab={"toolIdentifierViewer"} />}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<ToolIdentifierDetailPanel toolIdentifierData={toolIdentifierData} setToolIdentifierData={setToolIdentifierData}/>}
    />
  );
}

export default ToolIdentifierDetailView;