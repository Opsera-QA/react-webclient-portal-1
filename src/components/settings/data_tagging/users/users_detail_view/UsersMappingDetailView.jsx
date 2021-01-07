import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import AccessDeniedDialog from "../../../../common/status_notifications/accessDeniedInfo";
import { AuthContext } from "../../../../../contexts/AuthContext";
import dataMappingActions from "../../data-mapping-actions";
import Model from "../../../../../core/data_model/model";
import usersTagsMetadata from "../tagging-users-metadata";
import UsersMappingDetailPanel from "./UsersMappingDetailPanel";
import { faProjectDiagram, faToolbox, faTrash, faWrench } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "../../../../../contexts/DialogToastContext";
import DetailScreenContainer from "../../../../common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "../../../../common/actions/ActionBarContainer";
import ActionBarBackButton from "../../../../common/actions/buttons/ActionBarBackButton";
import ActionBarToggleButton from "../../../../common/actions/buttons/ActionBarToggleButton";
import { faRUsers } from "@fortawesome/free-brands-svg-icons";
import LoadingDialog from "../../../../common/status_notifications/loading";
import { faUser } from "@fortawesome/pro-solid-svg-icons";
import ActionBarButton from "../../../../common/actions/buttons/ActionBarButton";
import DeleteModal from "../../../../common/modal/DeleteModal";

function UsersMappingDetailView() {
  const { usersMappingId } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [usersMappingData, setUsersMappingData] = useState(undefined);
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

  const getUsersMapping = async (usersMappingId) => {
    try {
      const response = await dataMappingActions.getUserMappingById(usersMappingId, getAccessToken);
      if (response.data != null && response.data.length > 0) {
        setUsersMappingData(new Model(response.data[0], usersTagsMetadata, false));
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
        await getUsersMapping(usersMappingId);
      }
    }
  };

  const deleteMapping = async () => {
    let response = await dataMappingActions.deleteUserMapping(usersMappingData, getAccessToken);
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

  if (isLoading || !usersMappingData) {
    return (
      <DetailScreenContainer
        breadcrumbDestination={"userTaggingDetailView"}
        title={usersMappingData != null ? "Users Mapping Details" : undefined}
        managementViewLink={"/settings/data_mapping"}
        managementTitle={"Mappings Management"}
        managementViewIcon={faProjectDiagram}
        type={"User Mapping"}
        titleIcon={faUser}
        isLoading={isLoading}
        actionBar={getActionBar()}
      >
        <LoadingDialog size="sm" />
      </DetailScreenContainer>
    );
  }

  return (
    <>
      {usersMappingData && (
        <>
          <DetailScreenContainer
            breadcrumbDestination={"userTaggingDetailView"}
            title={usersMappingData != null ? "Users Mapping Details" : undefined}
            managementViewLink={"/settings/data_mapping"}
            managementTitle={"Mappings Management"}
            managementViewIcon={faProjectDiagram}
            type={"User Mapping"}
            titleIcon={faUser}
            dataObject={usersMappingData}
            isLoading={isLoading}
            actionBar={getActionBar()}
            detailPanel={
              <UsersMappingDetailPanel usersMappingData={usersMappingData} setUsersMappingData={setUsersMappingData} />
            }
          />
          <DeleteModal
            showModal={showDeleteModal}
            setShowModal={setShowDeleteModal}
            dataObject={usersMappingData}
            handleDelete={deleteMapping}
            // handleClose={handleClose}
          />
        </>
      )}
    </>
  );
}

export default UsersMappingDetailView;
