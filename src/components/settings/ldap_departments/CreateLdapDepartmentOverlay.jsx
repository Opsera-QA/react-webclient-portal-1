import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import ldapDepartmentMetaData from "components/settings/ldap_departments/ldap-department-metadata";
import LdapDepartmentEditorPanel
  from "components/settings/ldap_departments/details/LdapDepartmentEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {CENTER_OVERLAY_SIZES} from "components/common/overlays/center/CenterOverlayContainer";
import {DialogToastContext} from "contexts/DialogToastContext";

function CreateLdapDepartmentOverlay({ isMounted, loadData, orgDomain } ) {
  const toastContext = useContext(DialogToastContext);
  const [ldapDepartmentData, setLdapDepartmentData] = useState(new Model({...ldapDepartmentMetaData.newObjectFields}, ldapDepartmentMetaData, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={"Department"}
      loadData={loadData}
      size={CENTER_OVERLAY_SIZES.SMALL}
    >
      <LdapDepartmentEditorPanel
        orgDomain={orgDomain}
        ldapDepartmentData={ldapDepartmentData}
        setLdapDepartmentData={setLdapDepartmentData}
        handleClose={closePanel}
      />
    </CreateCenterPanel>
  );
}

CreateLdapDepartmentOverlay.propTypes = {
  isMounted: PropTypes.object,
  orgDomain: PropTypes.string,
  loadData: PropTypes.func,
};

export default CreateLdapDepartmentOverlay;


