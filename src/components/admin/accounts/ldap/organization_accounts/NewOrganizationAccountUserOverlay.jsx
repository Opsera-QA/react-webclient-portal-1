import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {faUser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import UserEditorPanel from "components/settings/users/details/UserEditorPanel";
import userActions from "components/user/user-actions";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import {usersMetadata} from "components/settings/users/users.metadata";
import {apiTokenHelper} from "temp-library-components/helpers/api/token/apiToken.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function NewOrganizationAccountUserOverlay({ orgDomain, loadData } ) {
  const toastContext = useContext(DialogToastContext);
  const [userModel, setUserModel] = useState(undefined);
  const [invalidHost, setInvalidHost] = useState(false);
  const [organization, setOrganization] = useState(undefined);
  const {
    cancelTokenSource,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    if (isOpseraAdministrator === true) {
      initializeData().catch(() => {
      });
    }
  }, [isOpseraAdministrator]);

  const initializeData = async () => {
    const token = apiTokenHelper.generateApiCallToken("orgRegistrationForm");
    const accountResponse = await userActions.getAccountInformationV2(cancelTokenSource, orgDomain, token);
    const newUserModel = (new Model(usersMetadata.newObjectFields, usersMetadata, true));

    if (accountResponse?.data) {
      if (accountResponse.data.idpBaseUrl && window.location.hostname.toLowerCase() !== accountResponse.data.idpBaseUrl.toLowerCase()) {
        setInvalidHost(true);
        toastContext.showSystemErrorBanner("Warning!  You are attempting to create an account on the wrong Opsera Portal tenant.  Please check with your account owner or contact Opsera to get the proper to URL register accounts.");
      }

      setOrganization(accountResponse?.data?.organization);
      newUserModel.setData("company", accountResponse.data?.orgName);
      newUserModel.setData("ldapOrgAccount", accountResponse.data?.name);
      newUserModel.setData("ldapOrgDomain", accountResponse.data?.orgDomain);
      newUserModel.setData("organizationName", accountResponse?.data?.accountName);
      newUserModel.setData("orgAccount", accountResponse?.data?.name);
      newUserModel.setData("localAuth", accountResponse?.data?.localAuth === "TRUE");
    }

    setUserModel({...newUserModel});
  };

  const handleClose = () => {
    if (loadData) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getBody = () => {
    if (userModel == null) {
      return (<LoadingDialog size={"sm"} message={"Loading User Creation Form"} />);
    }

    return (
      <UserEditorPanel
        orgDomain={orgDomain}
        organization={organization}
        userData={userModel}
        handleClose={handleClose}
      />
    );
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <CreateCenterPanel titleIcon={faUser} closePanel={handleClose} objectType={"User"} loadData={loadData}>
      {getBody()}
    </CreateCenterPanel>
  );
}

NewOrganizationAccountUserOverlay.propTypes = {
  loadData: PropTypes.func,
  orgDomain: PropTypes.string,
};
