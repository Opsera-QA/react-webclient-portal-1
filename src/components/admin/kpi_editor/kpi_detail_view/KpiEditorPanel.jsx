import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import KpiActions from "../kpi-editor-actions";
import Loading from "components/common/status_notifications/loading";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../common/input/dto_input/dto-toggle-input";
import SaveButton from "../../../common/buttons/SaveButton";
import DtoSelectInput from "../../../common/input/dto_input/dto-select-input";
import {
  getFormValidationErrorDialog,
  getUpdateFailureResultDialog,
  getUpdateSuccessResultDialog
} from "../../../common/toasts/toasts";
import Model from "../../../../core/data_model/model";

function KpiEditorPanel({ kpiData, setKpiData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [toolList, setToolList] = useState([]);
  const [kpiDataDto, setKpiDataDto] = useState(undefined);
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setKpiDataDto(kpiData);
    await getToolList();
    setIsLoading(false);
  };

  const createKpi = async () => {
    if (kpiDataDto.isModelValid()) {
      try {
        let createKpiResponse = await KpiActions.createKpi(kpiDataDto, getAccessToken);
        let toast = getUpdateSuccessResultDialog(kpiDataDto.getType(), setShowToast);
        setToast(toast);
        setShowToast(true);
        let updatedDto = new Model(createKpiResponse.data, kpiDataDto.metaData, false);
        setKpiData(updatedDto);
        setKpiDataDto(updatedDto);
      } catch (error) {
        let toast = getUpdateFailureResultDialog(kpiDataDto.getType(), error.message, setShowToast);
        setToast(toast);
        setShowToast(true);
        console.error(error.message);
      }
    } else {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  }

  const updateKpi = async () => {
    if(kpiDataDto.isModelValid()) {
      try {
        let updateOrganizationResponse = await KpiActions.updateKpi(kpiDataDto, getAccessToken);
        let toast = getUpdateSuccessResultDialog( kpiDataDto.getType(), setShowToast);
        setToast(toast);
        setShowToast(true);
        let updatedDto = new Model(updateOrganizationResponse.data, kpiDataDto.metaData, false);
        setKpiData(updatedDto);
        setKpiDataDto(updatedDto);
      } catch (error) {
        let toast = getUpdateFailureResultDialog(kpiDataDto.getType(), error.message, setShowToast);
        setToast(toast);
        setShowToast(true);
        console.error(error.message);
      }
    }
    else {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  const getToolList = async () => {
    const response = await KpiActions.getTools(getAccessToken);
    setToolList(response.data)
  }

  if (isLoading || kpiDataDto == null) {
    return <Loading size="sm" />;
  }

  return (
    <>
        <div className="scroll-y full-height">
          {showToast && toast}
          <Row>
            <Col lg={12}>
              <DtoTextInput dataObject={kpiDataDto} fieldName={"name"} setDataObject={setKpiDataDto} />
            </Col>
            <Col lg={12}>
              <DtoToggleInput setDataObject={setKpiDataDto} fieldName={"active"} dataObject={kpiData} />
            </Col>
            <Col lg={12}>
              <DtoTextInput dataObject={kpiDataDto} fieldName={"description"} setDataObject={setKpiDataDto} />
            </Col>
            <Col lg={12}>
              <DtoSelectInput selectOptions={toolList} dataObject={kpiDataDto} fieldName={"tool_identifier"} setDataObject={setKpiDataDto} textField={"name"} valueField={"identifier"} />
            </Col>
          </Row>
          <Row>
            <div className="ml-auto mt-3 px-3">
              <SaveButton updateRecord={updateKpi} createRecord={createKpi} recordDto={kpiDataDto} />
            </div>
          </Row>
        </div>
    </>
  );
}

KpiEditorPanel.propTypes = {
  kpiData: PropTypes.object,
  setKpiData: PropTypes.func,
  canDelete: PropTypes.bool,
};

export default KpiEditorPanel;


