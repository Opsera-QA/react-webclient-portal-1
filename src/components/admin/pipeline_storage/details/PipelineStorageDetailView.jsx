import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import { meetsRequirements, ROLE_LEVELS } from "components/common/helpers/role-helpers";
import axios from "axios";
import PipelineStorageActions from "components/admin/pipeline_storage/pipeline-storage-actions";
import PipelineStorageDetailPanel
  from "components/admin/pipeline_storage/details/PipelineStorageDetailPanel";
import ActionBarModelDeleteButton from "components/common/actions/buttons/ActionBarModelDeleteButton";
import PipelineStorageModel from "components/admin/pipeline_storage/pipelineStorage.model";
import PipelineStorageManagementSubNavigationBar
  from "components/admin/pipeline_storage/PipelineStorageManagementSubNavigationBar";
import ScreenContainer from "components/common/panels/general/ScreenContainer";

function PipelineStorageDetailView() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const { id } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [pipelineStorageData, setPipelineStorageData] = useState(undefined);
  const [pipelineStorageMetadata, setPipelineStorageMetadata] = useState(undefined);
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
  },[]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    } catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (meetsRequirements(ROLE_LEVELS.OPSERA_ADMINISTRATORS, userRoleAccess) && id) {
        await getPipelineStorageRecord(cancelSource);
      }
    }
  };

  const getPipelineStorageRecord = async (cancelSource = cancelTokenSource) => {
    const response = await PipelineStorageActions.getPipelineStorageRecordByIdV2(getAccessToken, cancelSource, id);
    const record = response?.data?.data;
    const metadata = response?.data?.metadata;

    if (isMounted?.current === true && record) {
      setPipelineStorageMetadata(metadata);
      setPipelineStorageData(new PipelineStorageModel(record, metadata, false, getAccessToken, cancelSource, loadData, false, true, setPipelineStorageData));
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={pipelineStorageData?.getManagementScreenLink()} />
        </div>
        <div>
          <ActionBarModelDeleteButton model={pipelineStorageData} />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      breadcrumbDestination={"pipelineStorageDetailView"}
      accessRoleData={accessRoleData}
      metadata={pipelineStorageMetadata}
      dataObject={pipelineStorageData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      navigationTabContainer={
        <PipelineStorageManagementSubNavigationBar
          activeTab={"pipelineStorageViewer"}
        />
      }
      detailPanel={
        <PipelineStorageDetailPanel
          pipelineStorageData={pipelineStorageData}
          accessRoleData={accessRoleData}/>
      }
    />
  );
}

export default PipelineStorageDetailView;
