import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {ldapUsersMetaData} from "components/settings/ldap_users/ldap-users-metadata";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {faUser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import UserEditorPanel from "components/settings/users/details/UserEditorPanel";
import userActions from "components/user/user-actions";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import accountRegistrationMetadata from "components/user/account_registration/account-registration-metadata";

function NewUserOverlay({ isMounted, loadData, authorizedActions } ) {
  const { generateJwtServiceTokenWithValue, getUserRecord } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [ldapUserData, setLdapUserData] = useState(undefined);
  const [accountRegistrationData, setAccountRegistrationData] = useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [invalidHost, setInvalidHost] = useState(false);
  const [domain, setDomain] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    initializeData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
    };
  }, []);

  const initializeData = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const orgDomain = user?.ldap?.domain;
    setDomain(orgDomain);
    const token = await generateJwtServiceTokenWithValue({ id: "orgRegistrationForm" });
    const accountResponse = await userActions.getAccountInformationV2(cancelSource, orgDomain, token);
    const newAccountModel = (new Model(accountRegistrationMetadata.newObjectFields, accountRegistrationMetadata, true));

    if (accountResponse?.data) {
      if (accountResponse.data.idpBaseUrl && window.location.hostname.toLowerCase() !== accountResponse.data.idpBaseUrl.toLowerCase()) {
        setInvalidHost(true);
        toastContext.showSystemErrorBanner("Warning!  You are attempting to create an account on the wrong Opsera Portal tenant.  Please check with your account owner or contact Opsera to get the proper URL register accounts.");
      }

      newAccountModel.setData("company", accountResponse.data?.orgName);
      newAccountModel.setData("ldapOrgAccount", accountResponse.data?.name);
      newAccountModel.setData("ldapOrgDomain", accountResponse.data?.orgDomain);
      newAccountModel.setData("organizationName", accountResponse?.data?.accountName);
      newAccountModel.setData("orgAccount", accountResponse?.data?.name);
    }

    setAccountRegistrationData({...newAccountModel});
    const newUserModel = new Model({...ldapUsersMetaData.newObjectFields}, ldapUsersMetaData, true);
    setLdapUserData({...newUserModel});
  };

  const handleClose = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getBody = () => {
    if (ldapUserData == null || accountRegistrationData == null) {
      return (<LoadingDialog size={"sm"} message={"Loading User Creation Form"} />);
    }

    return (
      <UserEditorPanel
        orgDomain={domain}
        authorizedActions={authorizedActions}
        setLdapUserData={setLdapUserData}
        ldapUserData={ldapUserData}
        accountRegistrationData={accountRegistrationData}
        handleClose={handleClose}
      />
    );
  };

  return (
    <CreateCenterPanel titleIcon={faUser} closePanel={handleClose} objectType={"User"} loadData={loadData}>
      {getBody()}
    </CreateCenterPanel>
  );
}

NewUserOverlay.propTypes = {
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array,
  orgDomain: PropTypes.string,
  isMounted: PropTypes.object,
};

export default NewUserOverlay;


