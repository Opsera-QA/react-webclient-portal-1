import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import AccessDeniedDialog from "../../../../common/status_notifications/accessDeniedInfo";
import { AuthContext } from "../../../../../contexts/AuthContext";
import dataMappingActions from "../../data-mapping-actions";
import Model from "../../../../../core/data_model/model";
import projectTagsMetadata from "../tagging-project-metadata";
import ProjectMappingDetailPanel from "./ProjectMappingDetailPanel";
import { faProjectDiagram, faToolbox, faTrash, faWrench } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "../../../../../contexts/DialogToastContext";
import DetailScreenContainer from "../../../../common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "../../../../common/actions/ActionBarContainer";
import ActionBarBackButton from "../../../../common/actions/buttons/ActionBarBackButton";
import ActionBarToggleButton from "../../../../common/actions/buttons/ActionBarToggleButton";
import { faRProject } from "@fortawesome/free-brands-svg-icons";
import LoadingDialog from "../../../../common/status_notifications/loading";
import ActionBarDeleteToolButton from "../../../../common/actions/buttons/tool/ActionBarDeleteToolButton";
import DeleteModal from "../../../../common/modal/DeleteModal";
import EditorPanelContainer from "../../../../common/panels/detail_panel_container/EditorPanelContainer";
import ActionBarButton from "../../../../common/actions/buttons/ActionBarButton";

function ProjectMappingDetailView() {
  const { projectMappingId } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [projectMappingData, setProjectMappingData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const history = useHistory();

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

      if (userRoleAccess.OpseraAdministrator === true) {
        await getProjectMapping(projectMappingId);
      }
    }
  };

  const deleteMapping = async () => {
    let response = await dataMappingActions.deleteProjectMapping(projectMappingData, getAccessToken);
    if (response.status === 200) {
      history.push("/settings/data_mapping");
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/settings/data_mapping"} />
        </div>
        <div>
          <ActionBarButton
            action={() => setShowDeleteModal(true)}
            icon={faTrash}
            iconClasses={"danger-red"}
            popoverText={`Delete this Tool`}
          />
        </div>
      </ActionBarContainer>
    );
  };

  if (accessRoleData.OpseraAdministrator === false) {
    return <AccessDeniedDialog roleData={accessRoleData} />;
  }

  if (isLoading || !projectMappingData) {
    return (
      <DetailScreenContainer
        breadcrumbDestination={"projectTaggingDetailView"}
        title={projectMappingData != null ? "Project Mapping Details" : undefined}
        managementViewLink={"/settings/data_mapping"}
        managementTitle={"Mappings Management"}
        managementViewIcon={faProjectDiagram}
        type={"Project Mapping"}
        titleIcon={faProjectDiagram}
        isLoading={isLoading}
        actionBar={getActionBar()}
      >
        <LoadingDialog size="sm" />
      </DetailScreenContainer>
    );
  }

  return (
    <>
      {projectMappingData && (
        <>
          <DetailScreenContainer
            breadcrumbDestination={"projectTaggingDetailView"}
            title={projectMappingData != null ? "Project Mapping Details" : undefined}
            managementViewLink={"/settings/data_mapping"}
            managementTitle={"Mappings Management"}
            managementViewIcon={faProjectDiagram}
            type={"Project Mapping"}
            titleIcon={faProjectDiagram}
            dataObject={projectMappingData}
            isLoading={isLoading}
            actionBar={getActionBar()}
            detailPanel={
              <ProjectMappingDetailPanel
                projectMappingData={projectMappingData}
                setProjectMappingData={setProjectMappingData}
              />
            }
          />
          <DeleteModal
            showModal={showDeleteModal}
            setShowModal={setShowDeleteModal}
            dataObject={projectMappingData}
            handleDelete={deleteMapping}
            // handleClose={handleClose}
          />
        </>
      )}
    </>
  );
}

export default ProjectMappingDetailView;
