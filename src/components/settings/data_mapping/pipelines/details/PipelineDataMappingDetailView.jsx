import React, {useState, useEffect, useContext, useRef} from "react";
import { useParams } from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import DataMappingManagementSubNavigationBar
  from "components/settings/data_mapping/DataMappingManagementSubNavigationBar";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import ActionBarModelDeleteButton from "components/common/actions/buttons/ActionBarModelDeleteButton";
import PipelineDataMappingDetailPanel
  from "components/settings/data_mapping/pipelines/details/PipelineDataMappingDetailPanel";
import {pipelineDataMappingActions} from "components/settings/data_mapping/pipelines/pipelineDataMapping.actions";
import PipelineDataMappingModel from "components/settings/data_mapping/pipelines/pipelineDataMapping.model";

function PipelineDataMappingDetailView() {
  const { pipelineDataMappingId } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [pipelineDataMappingModel, setPipelineDataMappingModel] = useState(undefined);
  const [pipelineDataMappingMetadata, setPipelineDataMappingMetadata] = useState(undefined);
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

    if (isMongoDbId(pipelineDataMappingId) === true) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    } catch (error) {
      if (!error.message.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getProjectDataMapping(cancelSource);
    }
  };

  const getProjectDataMapping = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineDataMappingActions.getPipelineDataMappingByIdV2(getAccessToken, cancelSource, pipelineDataMappingId);
    const mapping = response?.data?.data;

    if (isMounted?.current === true && mapping) {
      const metadata = response?.data?.metadata;
      setPipelineDataMappingMetadata({...metadata});
      setPipelineDataMappingModel(new PipelineDataMappingModel(
        mapping,
        metadata,
        false,
        getAccessToken,
        cancelSource,
        loadData,
        [],
        setPipelineDataMappingModel,
      ));
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton
            path={"/settings/data_mapping"}
          />
        </div>
        <div>
          <ActionBarModelDeleteButton
            model={pipelineDataMappingModel}
            relocationPath={"/settings/data_mapping"}
          />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      navigationTabContainer={<DataMappingManagementSubNavigationBar activeTab={"projectTagViewer"} />}
      breadcrumbDestination={"projectTaggingDetailView"}
      accessDenied={!accessRoleData?.PowerUser && !accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator &&  !accessRoleData?.SassPowerUser}
      metadata={pipelineDataMappingMetadata}
      dataObject={pipelineDataMappingModel}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <PipelineDataMappingDetailPanel
          pipelineDataMappingModel={pipelineDataMappingModel}
          setPipelineDataMappingModel={setPipelineDataMappingModel}
        />
      }
    />
  );
}

export default PipelineDataMappingDetailView;
