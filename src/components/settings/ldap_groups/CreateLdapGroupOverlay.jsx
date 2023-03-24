import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import LdapGroupEditorPanel from "./details/LdapGroupEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {CENTER_OVERLAY_SIZES} from "components/common/overlays/center/CenterOverlayContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import useGetLdapGroupModel from "hooks/ldap/groups/useGetLdapGroupModel";

function CreateLdapGroupOverlay(
  {
    orgDomain,
    loadData,
    existingGroupNames,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getLdapGroupModel, } = useGetLdapGroupModel(undefined, true);
  const [groupModel] = useState(getLdapGroupModel(orgDomain, undefined, true));

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
        ldapGroupData={groupModel}
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


