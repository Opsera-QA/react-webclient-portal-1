import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {
  ldapOrganizationAccountMetaData
} from "components/admin/accounts/ldap/organization_accounts/ldap-organization-account-metadata";
import LdapOrganizationAccountEditorPanel
  from "components/admin/accounts/ldap/organization_accounts/organization_accounts_detail_view/LdapOrganizationAccountEditorPanel";
import useComponentStateReference from "hooks/useComponentStateReference";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";

export default function CreateLdapOrganizationAccountOverlay(
  {
    ldapOrganizationData,
    loadData,
  }) {
  const {toastContext,} = useComponentStateReference();
  const [ldapOrganizationAccountData, setLdapOrganizationAccountData] = useState(undefined);

  useEffect(() => {
    setLdapOrganizationAccountData(new Model({...ldapOrganizationAccountMetaData.newObjectFields}, ldapOrganizationAccountMetaData, true));
  }, []);

  const closePanel = () => {
    if (loadData) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (ldapOrganizationAccountData == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={"Organization Account"}
      loadData={loadData}
    >
      <LdapOrganizationAccountEditorPanel
        ldapOrganization={ldapOrganizationData}
        setLdapOrganizationAccountData={setLdapOrganizationAccountData}
        handleClose={closePanel}
        ldapOrganizationAccountData={ldapOrganizationAccountData}
      />
    </CreateCenterPanel>
  );
}

CreateLdapOrganizationAccountOverlay.propTypes = {
  ldapOrganizationData: PropTypes.object,
  loadData: PropTypes.func,
};

