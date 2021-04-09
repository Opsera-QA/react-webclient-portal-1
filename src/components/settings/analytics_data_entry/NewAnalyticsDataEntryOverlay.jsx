import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import Model from "core/data_model/model";
import {analyticsDataMetadata} from "components/settings/analytics_data_entry/analytics-data-metadata";
import AnalyticsDataEntryEditorPanel from "components/settings/analytics_data_entry/detail_view/AnalyticsDataEntryEditorPanel";

function NewAnalyticsDataEntryOverlay({ isMounted, loadData }) {
  const toastContext = useContext(DialogToastContext);
  const [analyticsDataEntry] = useState(new Model({...analyticsDataMetadata.newObjectFields}, analyticsDataMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={analyticsDataMetadata.type} loadData={loadData}>
      <AnalyticsDataEntryEditorPanel handleClose={closePanel} analyticsDataEntry={analyticsDataEntry}/>
    </CreateCenterPanel>
  );
}

NewAnalyticsDataEntryOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
};

export default NewAnalyticsDataEntryOverlay;


