import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProjectMappingDetailPanel from "./ProjectMappingDetailPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import dataMappingActions from "components/settings/data_mapping/data-mapping-actions";
import Model from "core/data_model/model";
import projectTagsMetadata from "components/settings/data_mapping/projects/tagging-project-metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";

function ProjectMappingDetailView() {
  const { projectMappingId } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [projectMappingData, setProjectMappingData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    } catch (error) {
      if (!error.message.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectMapping = async (projectMappingId) => {
    try {
      const response = await dataMappingActions.getProjectMappingById(projectMappingId, getAccessToken);
      if (response?.data?.length > 0) {
        setProjectMappingData(new Model(response.data[0], projectTagsMetadata, false));
      }
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getProjectMapping(projectMappingId);
    }
  };

  const deleteMapping = async () => {
    return await dataMappingActions.deleteProjectMapping(projectMappingData, getAccessToken);
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div><ActionBarBackButton path={"/settings/data_mapping"} /></div>
        <div><ActionBarDeleteButton2 dataObject={projectMappingData} handleDelete={deleteMapping} relocationPath={"/settings/data_mapping"} /></div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"projectTaggingDetailView"}
      accessDenied={!accessRoleData?.PowerUser && !accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator &&  !accessRoleData?.SassPowerUser}
      metadata={projectTagsMetadata}
      dataObject={projectMappingData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<ProjectMappingDetailPanel projectMappingData={projectMappingData} setProjectMappingData={setProjectMappingData} />}
    />
  );
}

export default ProjectMappingDetailView;
