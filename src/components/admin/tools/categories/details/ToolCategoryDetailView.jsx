import React, {useState, useEffect, useContext, useRef} from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ToolCategoryDetailPanel from "components/admin/tools/categories/details/ToolCategoryDetailPanel";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import axios from "axios";
import {meetsRequirements, ROLE_LEVELS} from "components/common/helpers/role-helpers";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import ToolManagementSubNavigationBar from "components/admin/tools/ToolManagementSubNavigationBar";
import {toolCategoryActions} from "components/admin/tools/categories/toolCategory.actions";
import {toolCategoryMetadata} from "components/admin/tools/categories/toolCategory.metadata";

function ToolCategoryDetailView() {
  const {toolTypeId} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [toolCategoryData, setToolCategoryData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
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
    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (toolTypeId != null && userRoleAccess?.OpseraAdministrator === true) {
        await getToolType(cancelSource);
      }
    }
  };

  const getToolType = async (cancelSource = cancelTokenSource) => {
    const response = await toolCategoryActions.getToolTypeByIdV2(getAccessToken, cancelSource, toolTypeId);
    const toolType = response?.data?.data;

    if (isMounted?.current === true && toolType) {
      setToolCategoryData(new Model(toolType, toolCategoryMetadata, false));
    }
  };

  const deleteToolCategory = async () => {
    return await toolCategoryActions.deleteToolTypeV2(
      getAccessToken,
      cancelTokenSource,
      toolTypeId,
      );
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/tools/categories"} />
        </div>
        <div>
        {meetsRequirements(ROLE_LEVELS.OPSERA_ADMINISTRATORS, accessRoleData) && <ActionBarDeleteButton2 dataObject={toolCategoryData} handleDelete={deleteToolCategory} relocationPath={"/admin/tools/categories"} />}
        </div>
      </ActionBarContainer>
    );
  };

  const getDetailPanel = () => {
    return (
      <ToolCategoryDetailPanel
        toolCategoryData={toolCategoryData}
        setToolCategoryData={setToolCategoryData}
      />
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"toolCategoryDetailView"}
      metadata={toolCategoryMetadata}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      dataObject={toolCategoryData}
      navigationTabContainer={<ToolManagementSubNavigationBar activeTab={"toolCategoryViewer"} />}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={getDetailPanel()}
      />
  );
}

export default ToolCategoryDetailView;