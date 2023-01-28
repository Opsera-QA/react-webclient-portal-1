import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {organizationMetadata} from "components/settings/organizations/organization.metadata";
import OrganizationEditorPanel
  from "components/settings/organizations/organization_detail_view/OrganizationEditorPanel";
import useGetOrganizationModel from "hooks/settings/insights/organizations/useGetOrganizationModel";

function NewOrganizationOverlay({ isMounted, loadData }) {
  const toastContext = useContext(DialogToastContext);
  const getOrganizationModel = useGetOrganizationModel();
  const [organizationModel, setOrganizationModel] = useState(getOrganizationModel(undefined, true));

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
      objectType={organizationMetadata.type}
      loadData={loadData}
    >
      <div className={"px-3 pb-3 pt-1"}>
        <OrganizationEditorPanel
          setOrganizationData={setOrganizationModel}
          handleClose={closePanel}
          organizationData={organizationModel}
        />
      </div>
    </CreateCenterPanel>
  );
}

NewOrganizationOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
};

export default NewOrganizationOverlay;


