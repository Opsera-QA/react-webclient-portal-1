import React, {useState} from "react";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";
import AnalyticsDataEntryKpiConfigurationPanel
  from "components/settings/analytics_data_entry/detail_view/configuration_panels/AnalyticsDataEntryKpiConfigurationPanel";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";

function AnalyticsDataEntryEditorPanel({analyticsDataEntry, handleClose }) {
  const [analyticsDataEntryModel, setAnalyticsDataEntryModel] = useState({...analyticsDataEntry});
  const [internalDataModel, setInternalDataModel] = useState(undefined);

  const updateInternalDataModel = (newModel) => {
    if (newModel) {
      analyticsDataEntryModel.setData("data", newModel?.getPersistData());
      setInternalDataModel({...newModel});
    }
  };

  if (analyticsDataEntryModel == null) {
    return (<LoadingDialog/>);
  }

  return (
    <VanityEditorPanelContainer
      setModel={setAnalyticsDataEntryModel}
      model={analyticsDataEntryModel}
      handleClose={handleClose}
      disable={analyticsDataEntryModel?.checkCurrentValidity() !== true || internalDataModel?.checkCurrentValidity() !== true}
    >
      <AnalyticsDataEntryKpiConfigurationPanel
        analyticsDataEntryModel={analyticsDataEntryModel}
        setAnalyticsDataEntryModel={setAnalyticsDataEntryModel}
        kpiConfigurationData={internalDataModel}
        setKpiConfigurationData={updateInternalDataModel}
      />
      <Col lg={12}>
        <TagMultiSelectInput dataObject={analyticsDataEntryModel} setDataObject={setAnalyticsDataEntryModel}/>
      </Col>
    </VanityEditorPanelContainer>
  );
}

AnalyticsDataEntryEditorPanel.propTypes = {
  analyticsDataEntry: PropTypes.object,
  handleClose: PropTypes.func,
};

export default AnalyticsDataEntryEditorPanel;


