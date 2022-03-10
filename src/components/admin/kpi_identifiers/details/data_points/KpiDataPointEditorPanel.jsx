import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Loading from "components/common/status_notifications/loading";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import axios from "axios";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import MetricDataPointTypeSelectInput
  from "components/common/list_of_values_input/insights/data_points/type/MetricDataPointTypeSelectInput";
import MetricDataPointStrategicCriteriaPanel
  from "components/common/inputs/metric/data_points/admin/strategic_criteria/MetricDataPointStrategicCriteriaPanel";
import MetricDataPointVisibilityInput
  from "components/common/inputs/metric/data_points/visibility/MetricDataPointVisibilityInput";

function KpiDataPointEditorPanel({ dataPointModel, closeEditorPanel }) {
  const [kpiDataPointModel, setKpiDataPointModel] = useState(undefined);
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
    setKpiDataPointModel(dataPointModel);
    setIsLoading(false);
  };

  if (kpiDataPointModel == null) {
    return <Loading size="sm" />;
  }

  return (
    <VanityEditorPanelContainer
      model={kpiDataPointModel}
      setModel={setKpiDataPointModel}
      isLoading={isLoading}
      handleClose={closeEditorPanel}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase
            fieldName={"name"}
            dataObject={kpiDataPointModel}
            setDataObject={setKpiDataPointModel}
          />
        </Col>
        <Col lg={6}>
          <TextInputBase
            fieldName={"identifier"}
            dataObject={kpiDataPointModel}
            setDataObject={setKpiDataPointModel}
          />
        </Col>
        <Col lg={6}>
          <MetricDataPointTypeSelectInput
            fieldName={"type"}
            model={kpiDataPointModel}
            setModel={setKpiDataPointModel}
          />
        </Col>
        <Col lg={12}>
          <MetricDataPointVisibilityInput
            fieldName={"visibility"}
            model={kpiDataPointModel}
            setModel={setKpiDataPointModel}
          />
        </Col>
        <Col lg={12}>
          <MetricDataPointStrategicCriteriaPanel
            model={kpiDataPointModel}
            setModel={setKpiDataPointModel}
            strategicCriteria={kpiDataPointModel?.getData("strategic_criteria")}
          />
        </Col>
        <Col lg={12}>
          <TextAreaInput
            fieldName={"description"}
            dataObject={kpiDataPointModel}
            setDataObject={setKpiDataPointModel}
          />
        </Col>
      </Row>
    </VanityEditorPanelContainer>
  );
}

KpiDataPointEditorPanel.propTypes = {
  dataPointModel: PropTypes.object,
  closeEditorPanel: PropTypes.func,
};

export default KpiDataPointEditorPanel;
