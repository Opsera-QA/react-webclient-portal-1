import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import Model from "core/data_model/model";
import {organizationMetadata} from "components/settings/organizations/organization.metadata";
import OrganizationEditorPanel
  from "components/settings/organizations/organization_detail_view/OrganizationEditorPanel";

function NewOrganizationOverlay({ isMounted, loadData }) {
  const toastContext = useContext(DialogToastContext);
  const [organizationData, setOrganizationData] = useState(new Model({...organizationMetadata.newObjectFields}, organizationMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={organizationMetadata.type} loadData={loadData}>
      <OrganizationEditorPanel setOrganizationData={setOrganizationData} handleClose={closePanel} organizationData={organizationData}/>
    </CreateCenterPanel>
  );
}

NewOrganizationOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
};

export default NewOrganizationOverlay;


