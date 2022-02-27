import React, {useState, useEffect, useContext, useRef} from "react";
import { useParams } from "react-router-dom";
import ProjectDataMappingDetailPanel from "components/settings/data_mapping/projects/details/ProjectDataMappingDetailPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import dataMappingActions from "components/settings/data_mapping/data-mapping-actions";
import Model from "core/data_model/model";
import projectDataMappingMetadata from "components/settings/data_mapping/projects/projectDataMapping.metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import DataMappingManagementSubNavigationBar
  from "components/settings/data_mapping/DataMappingManagementSubNavigationBar";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {projectDataMappingActions} from "components/settings/data_mapping/projects/projectDataMapping.actions";

function ProjectDataMappingDetailView() {
  const { projectMappingId } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [projectMappingData, setProjectMappingData] = useState(undefined);
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

    if (isMongoDbId(projectMappingId) === true) {
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
      await getProjectMapping(cancelSource);
    }
  };

  const getProjectMapping = async (cancelSource = cancelTokenSource) => {
    try {
      const response = await projectDataMappingActions.getProjectDataMappingByIdV2(getAccessToken, cancelSource, projectMappingId);
      const projectDataMapping = response?.data?.data;

      if (projectDataMapping) {
        // const metadata = response?.data?.metadata;
        setProjectMappingData(new Model(projectDataMapping, projectDataMappingMetadata, false));
      }
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const deleteMapping = async () => {
    return await projectDataMappingActions.deleteProjectDataMappingV2(getAccessToken, cancelTokenSource, projectMappingId);
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
          <ActionBarDeleteButton2
            dataObject={projectMappingData}
            handleDelete={deleteMapping}
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
      metadata={projectDataMappingMetadata}
      dataObject={projectMappingData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <ProjectDataMappingDetailPanel
          projectMappingData={projectMappingData}
          setProjectMappingData={setProjectMappingData}
        />
      }
    />
  );
}

export default ProjectDataMappingDetailView;
