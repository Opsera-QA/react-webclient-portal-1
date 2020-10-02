import React, { useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import "components/inventory/tools/tools.css";
import { AuthContext } from "contexts/AuthContext";
import KpiActions from "../kpi-editor-actions";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoDateField from "../../../common/form_fields/dto_form_fields/dto-date-field";
import DtoToggleField from "../../../common/form_fields/dto_form_fields/dto-toggle-field";
import DtoItemField from "../../../common/form_fields/dto_form_fields/dto-item-field";
import SummaryActionBar from "../../../common/actions/SummaryActionBar";
import Model from "../../../../core/data_model/model";
import LoadingDialog from "../../../common/status_notifications/loading";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";

function KpiSummaryPanel({ kpiData, setKpiData } ) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);

  // TODO: Make toggle component and implement there.
  const handleActiveToggle = async () => {
    if(kpiData.isModelValid()) {
      try {
        let newKpiData = {...kpiData};
        newKpiData.setData("active", !newKpiData.getData("active"));
        let response = await KpiActions.updateKpi({...newKpiData}, getAccessToken);
        let updatedDto = new Model(response.data, newKpiData.metaData, false);
        setKpiData(updatedDto);
        toastContext.showUpdateSuccessResultDialog(newKpiData.getType());
      }
      catch (error) {
        toastContext.showUpdateFailureResultDialog("KPI", error);
        console.error(error);
      }
    }
  };

  if (kpiData == null) {
      return <LoadingDialog size="sm" />
  }

  return (
    <div className="scroll-y px-3">
      <SummaryActionBar backButtonPath={"/admin/kpis"} handleActiveToggle={handleActiveToggle}
                        status={kpiData.getData("active")}/>
      <div className="mb-3 content-block-collapse p-3 detail-view-summary">
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
            <DtoToggleField dataObject={kpiData} fieldName={"active"}/>
          </Col>
          <Col lg={6}>
            <DtoTextField dataObject={kpiData} fieldName={"description"}/>
          </Col>
        </Row>
      </div>
    </div>
  );
}

KpiSummaryPanel.propTypes = {
  kpiData: PropTypes.object,
  setKpiData: PropTypes.func
};


export default KpiSummaryPanel;
