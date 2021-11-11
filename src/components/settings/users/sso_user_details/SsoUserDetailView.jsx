import React, {useState, useEffect, useContext, useRef} from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import {ldapUserMetadata} from "components/settings/ldap_users/ldapUser.metadata";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import LdapUserDetailPanel from "components/settings/ldap_users/users_detail_view/LdapUserDetailPanel";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import {ssoUserMetadata} from "components/settings/users/ssoUser.metadata";
import axios from "axios";
import SsoUserDetailPanel from "components/settings/users/sso_user_details/SsoUserDetailPanel";

function SsoUserDetailView() {
  const {userId} = useParams();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [ssoUserData, setSsoUserData] = useState(undefined);
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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      const organizationDomain = user?.ldap?.domain;

      if (organizationDomain) {
        await getSsoUser(cancelSource, organizationDomain);
      }
    }
  };

  const getSsoUser = async (cancelSource = cancelTokenSource, organizationDomain) => {
    const response = await accountsActions.getPendingUserByIdV2(getAccessToken, cancelSource, organizationDomain, userId);
    const user = response?.data?.user;

    if (user != null) {
      setSsoUserData(new Model(user, ssoUserMetadata, false));
    }
  };

  const getActionBar = () => {
    if (ssoUserData != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={"/settings/user-management/"} />
          </div>
          <div>
          </div>
        </ActionBarContainer>
      );
    }
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"pendingUserDetailView"}
      metadata={ssoUserMetadata}
      dataObject={ssoUserData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <SsoUserDetailPanel hideSettings={true} ssoUserData={ssoUserData} />
      }
    />
  );
}

export default SsoUserDetailView;