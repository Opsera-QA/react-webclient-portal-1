import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import Model from "core/data_model/model";
import { DialogToastContext } from "contexts/DialogToastContext";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import { meetsRequirements, ROLE_LEVELS } from "components/common/helpers/role-helpers";
import axios from "axios";
import PipelineStorageActions from "components/admin/pipeline_storage/pipeline-storage-actions";
import PipelineStorageDetailPanel
  from "components/admin/pipeline_storage/pipeline_storagei_detail_view/PipelineStorageDetailPanel";

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
      setPipelineStorageData(new Model(record, metadata, false));
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/pipeline-storage"} />
        </div>
        <div>
          {meetsRequirements(ROLE_LEVELS.OPSERA_ADMINISTRATORS, accessRoleData) && (
            <ActionBarDeleteButton2 dataObject={pipelineStorageData} relocationPath={"/admin/pipeline-storage"} handleDelete={handleDelete} />
          )}
        </div>
      </ActionBarContainer>
    );
  };

  const handleDelete = async () => {
    return await PipelineStorageActions.deletePipelineStorageDataV2(getAccessToken, cancelTokenSource, pipelineStorageData);
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
      detailPanel={
        <PipelineStorageDetailPanel
          pipelineStorageData={pipelineStorageData}
          accessRoleData={accessRoleData}/>
      }
    />
  );
}

export default PipelineStorageDetailView;
