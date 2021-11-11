import React, {useContext, useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import axios from "axios";
import {organizationMetadata} from "components/settings/organizations/organization.metadata";
import OrganizationDetailPanel
  from "components/settings/organizations/organization_detail_view/OrganizationDetailPanel";
import organizationActions from "components/settings/organizations/organization-actions";
import {meetsRequirements, ROLE_LEVELS} from "components/common/helpers/role-helpers";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import OrganizationsSubNavigationBar from "components/settings/organizations/OrganizationsSubNavigationBar";

function OrganizationDetailView() {
  const {id} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [organizationData, setOrganizationModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [canDelete, setCanDelete] = useState(false);
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
      await getOrganization(cancelSource);
    }
    catch (error) {
      if (isMounted.current === true && !error?.error?.message?.includes(404)) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getOrganization = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (meetsRequirements(ROLE_LEVELS.POWER_USERS_AND_SASS, userRoleAccess)) {
        const response = await organizationActions.getOrganizationV2(getAccessToken, cancelSource, id);
        const organization = response?.data;

        if (isMounted.current === true && organization) {
          setOrganizationModel(new Model(organization, organizationMetadata, false));
          setCanDelete(meetsRequirements(ROLE_LEVELS.ADMINISTRATORS, userRoleAccess) || organization.owner === user?._id);
        }
      }
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  const getActionBar = () => {
    if (organizationData != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={`/settings/organizations`}/>
          </div>
          <div>
            {canDelete &&
            <ActionBarDeleteButton2 relocationPath={`/settings/organizations`} dataObject={organizationData}
                                    handleDelete={deleteOrganization}/>}
          </div>
        </ActionBarContainer>
      );
    }
  };

  const deleteOrganization = () => {
    return organizationActions.deleteOrganizationV2(getAccessToken, cancelTokenSource, organizationData?.getData("_id"));
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"organizationDetailView"}
      metadata={organizationMetadata}
      dataObject={organizationData}
      navigationTabContainer={<OrganizationsSubNavigationBar activeTab={"organizationViewer"}/>}
      isLoading={isLoading}
      actionBar={getActionBar()}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      detailPanel={<OrganizationDetailPanel organizationData={organizationData} />}
    />
  );
}

export default OrganizationDetailView;