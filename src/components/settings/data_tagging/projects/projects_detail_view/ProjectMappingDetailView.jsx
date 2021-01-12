import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProjectMappingDetailPanel from "./ProjectMappingDetailPanel";
import { faProjectDiagram } from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import dataMappingActions from "components/settings/data_tagging/data-mapping-actions";
import Model from "core/data_model/model";
import projectTagsMetadata from "components/settings/data_tagging/projects/tagging-project-metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
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
      if (response.data != null && response.data.length > 0) {
        setProjectMappingData(new Model(response.data[0], projectTagsMetadata, false));
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator === true) {
        await getProjectMapping(projectMappingId);
      }
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

  if (accessRoleData.OpseraAdministrator === false) {
    return <AccessDeniedDialog roleData={accessRoleData} />;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"projectTaggingDetailView"}
      title={"Project Mapping Details"}
      managementViewLink={"/settings/data_mapping"}
      managementTitle={"Mappings Management"}
      managementViewIcon={faProjectDiagram}
      type={"Project Mapping"}
      titleIcon={faProjectDiagram}
      dataObject={projectMappingData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<ProjectMappingDetailPanel projectMappingData={projectMappingData} setProjectMappingData={setProjectMappingData} />}
    />
  );
}

export default ProjectMappingDetailView;
