import React, {useContext, useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import axios from "axios";
import {organizationMetadata} from "components/settings/organizations/organization-metadata";
import OrganizationDetailPanel
  from "components/settings/organizations/organization_detail_view/OrganizationDetailPanel";
import organizationActions from "components/settings/organizations/organization-actions";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";

function OrganizationDetailView() {
  const {id} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
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
      await getRoles(cancelSource);
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
    const response = await organizationActions.getOrganizationV2(getAccessToken, cancelSource, id);


    if (isMounted.current === true && response?.data) {
      setOrganizationModel(new Model(response.data, organizationMetadata, false));
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator) {
        await getOrganization(cancelSource);
      }
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  const getActionBar = () => {
    // if (ldapGroupData != null) {
    //   return (
    //     <ActionBarContainer>
    //       <div>
    //         <ActionBarBackButton path={`/settings/${orgDomain}/groups`} />
    //       </div>
    //       <div>
    //         {canDelete && <ActionBarDeleteButton2 relocationPath={`/settings/${orgDomain}/groups`} dataObject={ldapGroupData} handleDelete={deleteGroup}/>}
    //       </div>
    //     </ActionBarContainer>
    //   );
    // }
  };

  const deleteGroup = () => {
    // return accountsActions.deleteGroup(orgDomain, ldapGroupData, getAccessToken);
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"organizationDetailView"}
      metadata={organizationMetadata}
      dataObject={organizationData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS}
      detailPanel={
        <OrganizationDetailPanel
          organizationData={organizationData}
          loadData={getRoles}
        />
      }
    />
  );
}

export default OrganizationDetailView;