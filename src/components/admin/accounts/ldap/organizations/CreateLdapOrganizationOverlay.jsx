import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {ldapOrganizationMetaData} from "components/admin/accounts/ldap/organizations/ldap-organizations-metadata";
import LdapOrganizationEditorPanel
  from "components/admin/accounts/ldap/organizations/organizations_detail_view/LdapOrganizationEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {DialogToastContext} from "contexts/DialogToastContext";

function CreateLdapOrganizationOverlay({ loadData }) {
  const toastContext = useContext(DialogToastContext);
  const [ldapOrganizationData, setLdapOrganizationData] = useState(undefined);

  useEffect(() => {
    setLdapOrganizationData(new Model({...ldapOrganizationMetaData.newObjectFields}, ldapOrganizationMetaData, true));
  }, []);


  const closePanel = () => {
    loadData();
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (ldapOrganizationData == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={"Organization"}
      loadData={loadData}
    >
      <LdapOrganizationEditorPanel
        handleClose={closePanel}
        ldapOrganizationData={ldapOrganizationData}
      />
    </CreateCenterPanel>
  );
}

CreateLdapOrganizationOverlay.propTypes = {
  loadData: PropTypes.func,
};

export default CreateLdapOrganizationOverlay;


