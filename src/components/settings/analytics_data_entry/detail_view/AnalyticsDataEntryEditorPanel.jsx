import React, {useEffect, useState, useContext, useRef} from "react";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import analyticsDataActions from "components/settings/analytics_data_entry/analytics-data-actions";
import KpiSelectInput from "components/common/list_of_values_input/admin/kpi_configurations/KpiSelectInput";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";

function AnalyticsDataEntryEditorPanel({analyticsDataEntry, handleClose }) {
  const {getAccessToken} = useContext(AuthContext);
  const [analyticsDataEntryModel, setAnalyticsDataEntryModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);


  const loadData = async () => {
    setIsLoading(true);
    setAnalyticsDataEntryModel(analyticsDataEntry);
    setIsLoading(false);
  };

  const createAnalyticsDataEntry = async () => {
    return await analyticsDataActions.createAnalyticsDataEntryV2(getAccessToken, cancelTokenSource, analyticsDataEntryModel);
  };

  const updateAnalyticsDataEntry = async () => {
    return await analyticsDataActions.updateAnalyticsDataEntryV2(getAccessToken, cancelTokenSource, analyticsDataEntryModel);
  };

  if (isLoading || analyticsDataEntryModel == null) {
    return (<LoadingDialog />);
  }

  return (
    <EditorPanelContainer
      createRecord={createAnalyticsDataEntry}
      updateRecord={updateAnalyticsDataEntry}
      setRecordDto={setAnalyticsDataEntryModel}
      recordDto={analyticsDataEntryModel}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={12}>
          <KpiSelectInput fieldName={"kpi_identifier"} dataObject={analyticsDataEntryModel} setDataObject={setAnalyticsDataEntryModel}/>
        </Col>
        <Col lg={12}>
          <TagMultiSelectInput dataObject={analyticsDataEntryModel} setDataObject={setAnalyticsDataEntryModel} />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

AnalyticsDataEntryEditorPanel.propTypes = {
  analyticsDataEntry: PropTypes.object,
  handleClose: PropTypes.func,
};

export default AnalyticsDataEntryEditorPanel;


