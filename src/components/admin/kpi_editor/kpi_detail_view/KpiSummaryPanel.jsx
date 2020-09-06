import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";

import "components/inventory/tools/tools.css";
import { useHistory } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import KpiActions from "../kpi-editor-actions";
import Modal from "components/common/modal/modal";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoDateField from "../../../common/form_fields/dto_form_fields/dto-date-field";
import DtoToggleField from "../../../common/form_fields/dto_form_fields/dto-toggle-field";
import DtoItemField from "../../../common/form_fields/dto_form_fields/dto-item-field";
import SummaryActionBar from "../../../common/actions/SummaryActionBar";
import Model from "../../../../core/data_model/model";
import {getLoadingErrorDialog, getUpdateSuccessResultDialog} from "../../../common/toasts/toasts";

function KpiSummaryPanel({ kpiData, setKpiData } ) {
  const { getAccessToken } = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const history = useHistory();
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);


  const deleteKpi = async (kpiData) => {
    kpiData["active"] = false
      try {
        const response = await KpiActions.update(kpiData._id, kpiData, getAccessToken);
        setKpiData({ ...response.data });
        history.push("/admin/kpis/");
      }
      catch (err) {
        console.log(err.message);
      }
  };

  const handleActiveToggle = async () => {
    if(kpiData.isModelValid()) {
      try {
        let newKpiData = {...kpiData};
        newKpiData.setData("active", !newKpiData.getData("active"));
        let response = await KpiActions.updateKpi({...newKpiData}, getAccessToken);
        let updatedDto = new Model(response.data, newKpiData.metaData, false);
        setKpiData(updatedDto);
        let toast = getUpdateSuccessResultDialog(newKpiData.getType(), setShowToast);
        setToast(toast);
        setShowToast(true);
      }
      catch (error) {
        let toast = getLoadingErrorDialog(error.message, setShowToast);
        setToast(toast);
        setShowToast(true);
        console.error(error.message);
      }
    }
  };

  if (kpiData == null) {
    return <></>;
  }

  return (
    <>
      <div className="scroll-y pt-2 px-3">
        {showToast && toast}
        <SummaryActionBar backButtonPath={"/admin/kpis"} handleActiveToggle={handleActiveToggle}
                          status={kpiData.getData("active")}/>
        <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
          <Row>
            <Col lg={6}>
              <DtoTextField dataObject={kpiData} fieldName={"name"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={kpiData} fieldName={"_id"}/>
            </Col>
            <Col lg={6}>
              <DtoDateField dataObject={kpiData} fieldName={"createdAt"}/>
            </Col>
            <Col lg={6}>
              <DtoItemField dataObject={kpiData} fieldName={"tool_identifier"}/>
            </Col>
            <Col lg={6}>
              <DtoToggleField fieldName={"active"} dataObject={kpiData}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={kpiData} fieldName={"description"}/>
            </Col>
          </Row>
        </div>
      </div>
      {showDeleteModal ? <Modal header="Confirm Kpi Delete"
                                message="Warning! Data cannot be recovered once this tag is deleted. Do you still want to proceed?"
                                button="Confirm"
                                handleCancelModal={() => setShowDeleteModal(false)}
                                handleConfirmModal={() => deleteKpi(kpiData)}/> : null}
    </>
  );
}

KpiSummaryPanel.propTypes = {
  kpiData: PropTypes.object,
  setKpiData: PropTypes.func
};


export default KpiSummaryPanel;
