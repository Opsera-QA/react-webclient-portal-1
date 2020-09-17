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
import {DialogToastContext} from "../../../../contexts/DialogToastContext";

function KpiEditorPanel({ kpiData, setKpiData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [toolList, setToolList] = useState([]);
  const [kpiDataDto, setKpiDataDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setKpiDataDto(kpiData);
      await getToolList();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const createKpi = async () => {
    return await KpiActions.createKpi(kpiDataDto, getAccessToken);
  }

  const updateKpi = async () => {
   return await KpiActions.updateKpi(kpiDataDto, getAccessToken);
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
        <Row>
          <Col lg={12}>
            <DtoTextInput dataObject={kpiDataDto} fieldName={"name"} setDataObject={setKpiDataDto}/>
          </Col>
          <Col lg={12}>
            <DtoToggleInput setDataObject={setKpiDataDto} fieldName={"active"} dataObject={kpiData}/>
          </Col>
          <Col lg={12}>
            <DtoTextInput dataObject={kpiDataDto} fieldName={"description"} setDataObject={setKpiDataDto}/>
          </Col>
          <Col lg={12}>
            <DtoSelectInput selectOptions={toolList} dataObject={kpiDataDto} fieldName={"tool_identifier"}
                            setDataObject={setKpiDataDto} textField={"name"} valueField={"identifier"}/>
          </Col>
        </Row>
        <Row>
          <div className="ml-auto mt-3 px-3">
            <SaveButton updateRecord={updateKpi} setRecordDto={setKpiDataDto} setData={setKpiData} handleClose={handleClose} createRecord={createKpi} recordDto={kpiDataDto}/>
          </div>
        </Row>
      </div>
    </>
  );
}

KpiEditorPanel.propTypes = {
  kpiData: PropTypes.object,
  setKpiData: PropTypes.func,
  handleClose: PropTypes.func,
};

export default KpiEditorPanel;


