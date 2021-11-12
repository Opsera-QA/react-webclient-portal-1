import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Loading from "components/common/status_notifications/loading";
import WebsitePathInput from "components/common/inputs/text/WebsitePathInput";
import JsonInput from "components/common/inputs/object/JsonInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import KpiActions from "components/admin/kpi_identifiers/kpi.actions";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import KpiChartTypeInput from "components/common/list_of_values_input/admin/kpi_configurations/KpiChartTypeInput";
import KpiToolsInput from "components/common/list_of_values_input/admin/kpi_configurations/KpiToolsInput";
import KpiFiltersInput from "components/common/list_of_values_input/admin/kpi_configurations/KpiFiltersInput";
import KpiCategoriesInput from "components/common/list_of_values_input/admin/kpi_configurations/KpiCategoriesInput";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import NotificationConditionTriggerSelectInput from "components/common/list_of_values_input/notifications/NotificationConditionTriggerSelectInput";
import axios from "axios";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

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
          <TextInputBase dataObject={kpiDataDto} fieldName={"name"} setDataObject={setKpiDataDto} />
        </Col>
        <Col lg={6}>
          <TextInputBase dataObject={kpiDataDto} fieldName={"identifier"} setDataObject={setKpiDataDto} />
        </Col>
        <Col lg={6}>
          <KpiChartTypeInput dataObject={kpiDataDto} setDataObject={setKpiDataDto} />
        </Col>
        <Col lg={6}>
          <NotificationConditionTriggerSelectInput
            dataObject={kpiDataDto}
            setDataObject={setKpiDataDto}
            fieldName={"yAxis"}
          />
        </Col>
        <Col lg={12}>
          <KpiToolsInput dataObject={kpiDataDto} setDataObject={setKpiDataDto} />
        </Col>
        <Col lg={12}>
          <KpiFiltersInput dataObject={kpiDataDto} fieldName={"supported_filters"} setDataObject={setKpiDataDto} />
        </Col>
        <Col lg={12}>
          <KpiCategoriesInput dataObject={kpiDataDto} setDataObject={setKpiDataDto} />
        </Col>
        <Col lg={12}>
          <WebsitePathInput dataObject={kpiDataDto} fieldName={"thumbnailPath"} setDataObject={setKpiDataDto} />
        </Col>
        <Col lg={6}>
          <JsonInput model={kpiDataDto} fieldName={"settings"} setModel={setKpiDataDto} />
        </Col>
        <Col lg={6}>
          <JsonInput model={kpiDataDto} fieldName={"dataPoints"} setModel={setKpiDataDto} />
        </Col>
        <Col lg={12}>
          <TextAreaInput dataObject={kpiDataDto} fieldName={"description"} setDataObject={setKpiDataDto} />
          <BooleanToggleInput setDataObject={setKpiDataDto} fieldName={"policySupport"} dataObject={kpiData} />
          <BooleanToggleInput setDataObject={setKpiDataDto} fieldName={"active"} dataObject={kpiData} />
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
