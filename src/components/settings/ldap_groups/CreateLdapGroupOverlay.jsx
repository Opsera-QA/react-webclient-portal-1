import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import LdapGroupEditorPanel from "./details/LdapGroupEditorPanel";
import Model from "core/data_model/model";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {CENTER_OVERLAY_SIZES} from "components/common/overlays/center/CenterOverlayContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import ldapGroupMetadata from "@opsera/definitions/constants/accounts/groups/user/ldapGroup.metadata";

function CreateLdapGroupOverlay(
  {
    orgDomain,
    loadData,
    existingGroupNames,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [ldapGroupData, setLdapGroupData] = useState(new Model({...ldapGroupMetadata.newObjectFields}, ldapGroupMetadata, true));

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
  loadData: PropTypes.func,
  existingGroupNames: PropTypes.array,
  isMounted: PropTypes.object,
};

export default CreateLdapGroupOverlay;


