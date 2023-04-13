import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import PipelineStorageActions from "components/admin/pipeline_storage/pipeline-storage-actions";
import PipelineStorageDetailPanel
  from "components/admin/pipeline_storage/details/PipelineStorageDetailPanel";
import ActionBarModelDeleteButton from "components/common/actions/buttons/ActionBarModelDeleteButton";
import PipelineStorageModel from "components/admin/pipeline_storage/pipelineStorage.model";
import PipelineStorageManagementSubNavigationBar
  from "components/admin/pipeline_storage/PipelineStorageManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function PipelineStorageDetailView() {
  const { id } = useParams();
  const [pipelineStorageData, setPipelineStorageData] = useState(undefined);
  const [pipelineStorageMetadata, setPipelineStorageMetadata] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpseraAdministrator,
    isMounted,
    cancelTokenSource,
    toastContext,
    accessRoleData,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  },[]);

  const loadData = async () => {
    try {
      setPipelineStorageData(undefined);

      if (isOpseraAdministrator !== true) {
        return;
      }

      setIsLoading(true);
      await getPipelineStorageRecord();
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

  const getPipelineStorageRecord = async () => {
    const response = await PipelineStorageActions.getPipelineStorageRecordByIdV2(getAccessToken, cancelTokenSource, id);
    const record = response?.data?.data;
    const metadata = response?.data?.metadata;

    if (isMounted?.current === true && record) {
      setPipelineStorageMetadata(metadata);
      setPipelineStorageData(new PipelineStorageModel(record, metadata, false, getAccessToken, cancelTokenSource, loadData, false, true, setPipelineStorageData));
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

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"pipelineStorageDetailView"}
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
