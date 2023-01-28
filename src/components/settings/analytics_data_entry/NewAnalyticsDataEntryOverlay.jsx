import React, {useState} from "react";
import PropTypes from "prop-types";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import analyticsDataEntryMetadata
  from "@opsera/definitions/constants/settings/analytics_data_entries/analyticsDataEntry.metadata";
import AnalyticsDataEntryEditorPanel from "components/settings/analytics_data_entry/detail_view/AnalyticsDataEntryEditorPanel";
import useGetAnalyticsDataEntryModel from "hooks/settings/insights/analytics_data_entries/useGetAnalyticsDataEntryModel";
import useComponentStateReference from "hooks/useComponentStateReference";

function NewAnalyticsDataEntryOverlay({ isMounted, loadData }) {
  const { toastContext } = useComponentStateReference();
  const getAnalyticsDataEntryModel = useGetAnalyticsDataEntryModel();
  const [analyticsDataEntryModel] = useState(getAnalyticsDataEntryModel(undefined, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={analyticsDataEntryMetadata.type} loadData={loadData}>
      <AnalyticsDataEntryEditorPanel
        handleClose={closePanel}
        analyticsDataEntry={analyticsDataEntryModel}
      />
    </CreateCenterPanel>
  );
}

NewAnalyticsDataEntryOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
};

export default NewAnalyticsDataEntryOverlay;


