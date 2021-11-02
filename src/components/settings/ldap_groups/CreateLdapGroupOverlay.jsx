import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import LdapGroupEditorPanel from "./details/LdapGroupEditorPanel";
import Model from "core/data_model/model";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldapGroup.metadata";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {CENTER_OVERLAY_SIZES} from "components/common/overlays/center/CenterOverlayContainer";
import {DialogToastContext} from "contexts/DialogToastContext";

function CreateLdapGroupOverlay(
  {
    orgDomain,
    currentUserEmail,
    loadData,
    existingGroupNames,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [ldapGroupData, setLdapGroupData] = useState(new Model({...ldapGroupMetaData.newObjectFields}, ldapGroupMetaData, true));

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
      objectType={"Group"}
      loadData={loadData}
      size={CENTER_OVERLAY_SIZES.SMALL}
    >
      <LdapGroupEditorPanel
        currentUserEmail={currentUserEmail}
        ldapGroupData={ldapGroupData}
        handleClose={closePanel}
        orgDomain={orgDomain}
        existingGroupNames={existingGroupNames}
      />
    </CreateCenterPanel>
  );
}

CreateLdapGroupOverlay.propTypes = {
  orgDomain: PropTypes.string,
  authorizedActions: PropTypes.array,
  currentUserEmail: PropTypes.string,
  loadData: PropTypes.func,
  existingGroupNames: PropTypes.array,
  isMounted: PropTypes.object,
};

export default CreateLdapGroupOverlay;


