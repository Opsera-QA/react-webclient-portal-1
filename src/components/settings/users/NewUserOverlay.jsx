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

function NewUserOverlay({ isMounted, loadData, authorizedActions, orgDomain } ) {
  const { generateJwtServiceTokenWithValue } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [ldapUserData, setLdapUserData] = useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [invalidHost, setInvalidHost] = useState(false);

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
    const token = await generateJwtServiceTokenWithValue({ id: "orgRegistrationForm" });
    const accountResponse = await userActions.getAccountInformationV2(cancelSource, orgDomain, token);
    const newUserModel = new Model({...ldapUsersMetaData.newObjectFields}, ldapUsersMetaData, true);


    if (accountResponse?.data) {
      if (accountResponse.data.idpBaseUrl && window.location.hostname.toLowerCase() !== accountResponse.data.idpBaseUrl.toLowerCase()) {
        setInvalidHost(true);
        toastContext.showSystemErrorBanner("Warning!  You are attempting to create an account on the wrong Opsera Portal tenant.  Please check with your account owner or contact Opsera to get the proper URL register accounts.");
      }

      newUserModel.setData("company", accountResponse.data?.orgName);
      newUserModel.setData("ldapOrgAccount", accountResponse.data?.name);
      newUserModel.setData("ldapOrgDomain", accountResponse.data?.orgDomain);
      newUserModel.setData("organizationName", accountResponse?.data?.accountName);
      newUserModel.setData("orgAccount", accountResponse?.data?.name);
    }

    setLdapUserData({...newUserModel});
  };

  const handleClose = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel titleIcon={faUser} closePanel={handleClose} objectType={"User"} loadData={loadData} >
      <UserEditorPanel
        orgDomain={orgDomain}
        authorizedActions={authorizedActions}
        setLdapUserData={setLdapUserData}
        ldapUserData={ldapUserData}
        handleClose={handleClose}
      />
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


