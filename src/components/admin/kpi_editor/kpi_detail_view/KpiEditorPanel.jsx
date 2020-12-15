import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import KpiActions from "../kpi-editor-actions";
import Loading from "components/common/status_notifications/loading";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../common/input/dto_input/dto-toggle-input";
import EditorPanelContainer from "../../../common/panels/detail_panel_container/EditorPanelContainer";
import DtoJsonInput from "../../../common/input/dto_input/dto-json-input";
import KpiChartTypeInput from "../../../common/list_of_values_input/admin/kpi_configurations/KpiChartTypeInput";
import KpiToolsInput from "../../../common/list_of_values_input/admin/kpi_configurations/KpiToolsInput";
import KpiFiltersInput from "../../../common/list_of_values_input/admin/kpi_configurations/KpiFiltersInput";
import KpiCategoriesInput from "../../../common/list_of_values_input/admin/kpi_configurations/KpiCategoriesInput";
import CreateAndSaveButtonContainer from "../../../common/buttons/saving/containers/CreateAndSaveButtonContainer";
import WebsitePathInput from "../../../common/input/WebsitePathInput";

function KpiEditorPanel({ kpiData, setKpiData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [kpiDataDto, setKpiDataDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setKpiDataDto(kpiData);
    setIsLoading(false);
  };

  const createKpi = async () => {
    return await KpiActions.createKpi(kpiDataDto, getAccessToken);
  }

  const updateKpi = async () => {
   return await KpiActions.updateKpi(kpiDataDto, getAccessToken);
  };

  if (isLoading || kpiDataDto == null) {
    return <Loading size="sm" />;
  }

  return (
    <EditorPanelContainer>
      <Row>
        <Col lg={6}>
          <DtoTextInput dataObject={kpiDataDto} fieldName={"name"} setDataObject={setKpiDataDto}/>
        </Col>
        <Col lg={6}>
          <DtoToggleInput setDataObject={setKpiDataDto} fieldName={"active"} dataObject={kpiData}/>
        </Col>
        <Col lg={6}>
          <DtoTextInput dataObject={kpiDataDto} fieldName={"identifier"} setDataObject={setKpiDataDto}/>
          <KpiChartTypeInput dataObject={kpiDataDto} setDataObject={setKpiDataDto} />
          <KpiToolsInput dataObject={kpiDataDto} setDataObject={setKpiDataDto} />
          <KpiFiltersInput dataObject={kpiDataDto} setDataObject={setKpiDataDto} />
          <KpiCategoriesInput dataObject={kpiDataDto} setDataObject={setKpiDataDto} />
          <WebsitePathInput dataObject={kpiDataDto} fieldName={"thumbnailPath"} setDataObject={setKpiDataDto}/>
        </Col>
        <Col lg={6}>
          <DtoJsonInput dataObject={kpiDataDto} fieldName={"settings"} setDataObject={setKpiDataDto}/>
        </Col>
        <Col lg={12}>
          <DtoTextInput dataObject={kpiDataDto} fieldName={"description"} setDataObject={setKpiDataDto}/>
        </Col>
      </Row>
      <CreateAndSaveButtonContainer
        updateRecord={updateKpi}
        recordDto={kpiDataDto}
        createRecord={createKpi}
        setRecordDto={setKpiDataDto}
        handleClose={handleClose}
        />
    </EditorPanelContainer>
  );
}

KpiEditorPanel.propTypes = {
  kpiData: PropTypes.object,
  setKpiData: PropTypes.func,
  handleClose: PropTypes.func,
};

export default KpiEditorPanel;


