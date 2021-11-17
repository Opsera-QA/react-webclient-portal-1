import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Loading from "components/common/status_notifications/loading";
import WebsitePathInput from "components/common/inputs/text/WebsitePathInput";
import JsonInput from "components/common/inputs/object/JsonInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import KpiActions from "components/admin/kpi_identifiers/kpi.actions";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import KpiChartTypeSelectInput from "components/common/list_of_values_input/admin/kpi_configurations/chart_type/KpiChartTypeSelectInput";
import KpiFilterMultiSelectInput from "components/common/list_of_values_input/admin/kpi_configurations/filters/KpiFilterMultiSelectInput";
import KpiCategoryMultiSelectInput from "components/common/list_of_values_input/admin/kpi_configurations/categories/KpiCategoryMultiSelectInput";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import MetricDataPointTypeSelectInput from "components/common/list_of_values_input/insights/data_points/type/MetricDataPointTypeSelectInput";
import axios from "axios";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import PipelineUsageToolMultiSelectInput
  from "components/common/list_of_values_input/workflow/pipelines/PipelineUsageToolMultiSelectInput";

function KpiIdentifierEditorPanel({ kpiData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [kpiDataDto, setKpiDataDto] = useState(undefined);
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
    setKpiDataDto(kpiData);
    setIsLoading(false);
  };

  const createKpi = async () => {
    return await KpiActions.createKpiV2(getAccessToken, cancelTokenSource, kpiDataDto);
  };

  const updateKpi = async () => {
    return await KpiActions.updateKpiV2(getAccessToken, cancelTokenSource, kpiDataDto);
  };

  if (kpiDataDto == null) {
    return <Loading size="sm" />;
  }

  return (
    <EditorPanelContainer
      isLoading={isLoading}
      updateRecord={updateKpi}
      recordDto={kpiDataDto}
      createRecord={createKpi}
      setRecordDto={setKpiDataDto}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase
            fieldName={"name"}
            dataObject={kpiDataDto}
            setDataObject={setKpiDataDto}
          />
        </Col>
        <Col lg={6}>
          <TextInputBase
            fieldName={"identifier"}
            dataObject={kpiDataDto}
            setDataObject={setKpiDataDto}
          />
        </Col>
        <Col lg={6}>
          <KpiChartTypeSelectInput
            model={kpiDataDto}
            setModel={setKpiDataDto}
          />
        </Col>
        <Col lg={6}>
          <MetricDataPointTypeSelectInput
            fieldName={"yAxis"}
            model={kpiDataDto}
            setModel={setKpiDataDto}
          />
        </Col>
        <Col lg={12}>
          <PipelineUsageToolMultiSelectInput
            fieldName={"tools"}
            model={kpiDataDto}
            setModel={setKpiDataDto}
          />
        </Col>
        <Col lg={12}>
          <KpiFilterMultiSelectInput
            fieldName={"supported_filters"}
            model={kpiDataDto}
            setModel={setKpiDataDto}
          />
        </Col>
        <Col lg={12}>
          <KpiCategoryMultiSelectInput
            dataObject={kpiDataDto}
            setDataObject={setKpiDataDto}
          />
        </Col>
        <Col lg={12}>
          <WebsitePathInput
            fieldName={"thumbnailPath"}
            dataObject={kpiDataDto}
            setDataObject={setKpiDataDto}
          />
        </Col>
        <Col lg={6}>
          <JsonInput
            fieldName={"settings"}
            model={kpiDataDto}
            setModel={setKpiDataDto}
          />
        </Col>
        <Col lg={6} />
        <Col lg={6} className={"mt-2"}>
          <JsonInput
            fieldName={"dataPoints"}
            model={kpiDataDto}
            setModel={setKpiDataDto}
          />
          <div className={"m-2 text-muted"}>
            The Data Point JSON input is temporarily left in to make it easy to remove old data point data that cause issues saving KPIs with the new data point flow.
            Once all stacks are updated, this will be removed. Please use the Data Point tab if adding or editing data points in the short term.
          </div>
        </Col>
        <Col lg={12}>
          <TextAreaInput
            fieldName={"description"}
            dataObject={kpiDataDto}
            setDataObject={setKpiDataDto}
          />
        </Col>
        <Col lg={12}>
          <BooleanToggleInput
            fieldName={"policySupport"}
            setDataObject={setKpiDataDto}
            dataObject={kpiData}
          />
        </Col>
        <Col lg={12}>
          <BooleanToggleInput
            fieldName={"active"}
            setDataObject={setKpiDataDto}
            dataObject={kpiData}
          />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

KpiIdentifierEditorPanel.propTypes = {
  kpiData: PropTypes.object,
  setKpiData: PropTypes.func,
  handleClose: PropTypes.func,
};

export default KpiIdentifierEditorPanel;
