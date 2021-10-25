import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {ldapOrganizationMetaData} from "components/admin/accounts/ldap/organizations/ldap-organizations-metadata";
import LdapOrganizationEditorPanel
  from "components/admin/accounts/ldap/organizations/organizations_detail_view/LdapOrganizationEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {DialogToastContext} from "contexts/DialogToastContext";

function CreateLdapOrganizationOverlay({ isMounted, loadData }) {
  const toastContext = useContext(DialogToastContext);
  const [ldapOrganizationData, setLdapOrganizationData] = useState(undefined);

  useEffect(() => {
    setLdapOrganizationData(new Model({...ldapOrganizationMetaData.newObjectFields}, ldapOrganizationMetaData, true));
  }, []);


  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

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
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default CreateLdapOrganizationOverlay;


