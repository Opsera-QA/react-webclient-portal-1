import React, {useState} from "react";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";
import AnalyticsDataEntryKpiConfigurationPanel
  from "components/settings/analytics_data_entry/detail_view/configuration_panels/AnalyticsDataEntryKpiConfigurationPanel";

function AnalyticsDataEntryEditorPanel({analyticsDataEntry, handleClose }) {
  const [analyticsDataEntryModel, setAnalyticsDataEntryModel] = useState({...analyticsDataEntry});
  const [kpiConfigurationData, setKpiConfigurationData] = useState(undefined);

  const createAnalyticsDataEntry = async () => {
    analyticsDataEntryModel.setData("data", kpiConfigurationData?.getPersistData());
    return await analyticsDataEntryModel.createModel();
  };

  const updateAnalyticsDataEntry = async () => {
    analyticsDataEntryModel.setData("data", kpiConfigurationData?.getPersistData());
    return await analyticsDataEntryModel.saveModel();
  };

  if (analyticsDataEntryModel == null) {
    return (<LoadingDialog/>);
  }

  return (
    <EditorPanelContainer
      createRecord={createAnalyticsDataEntry}
      updateRecord={updateAnalyticsDataEntry}
      setRecordDto={setAnalyticsDataEntryModel}
      recordDto={analyticsDataEntryModel}
      handleClose={handleClose}
      lenient={true}
      disable={
        !analyticsDataEntryModel.checkCurrentValidity()
        || (kpiConfigurationData == null || !kpiConfigurationData.checkCurrentValidity())}
    >
      <AnalyticsDataEntryKpiConfigurationPanel
        analyticsDataEntryModel={analyticsDataEntryModel}
        setAnalyticsDataEntryModel={setAnalyticsDataEntryModel}
        kpiConfigurationData={kpiConfigurationData}
        setKpiConfigurationData={setKpiConfigurationData}
      />
      <Col lg={12}>
        <TagMultiSelectInput dataObject={analyticsDataEntryModel} setDataObject={setAnalyticsDataEntryModel}/>
      </Col>
    </EditorPanelContainer>
  );
}

AnalyticsDataEntryEditorPanel.propTypes = {
  analyticsDataEntry: PropTypes.object,
  handleClose: PropTypes.func,
};

export default AnalyticsDataEntryEditorPanel;


