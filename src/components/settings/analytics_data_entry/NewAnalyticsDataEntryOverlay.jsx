import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import Model from "core/data_model/model";
import {analyticsDataEntryMetadata} from "components/settings/analytics_data_entry/analyticsDataEntry.metadata";
import AnalyticsDataEntryEditorPanel from "components/settings/analytics_data_entry/detail_view/AnalyticsDataEntryEditorPanel";

function NewAnalyticsDataEntryOverlay({ isMounted, loadData }) {
  const toastContext = useContext(DialogToastContext);
  const [analyticsDataEntry] = useState(new Model({...analyticsDataEntryMetadata.newObjectFields}, analyticsDataEntryMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={analyticsDataEntryMetadata.type} loadData={loadData}>
      <AnalyticsDataEntryEditorPanel handleClose={closePanel} analyticsDataEntry={analyticsDataEntry}/>
    </CreateCenterPanel>
  );
}

NewAnalyticsDataEntryOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
};

export default NewAnalyticsDataEntryOverlay;


