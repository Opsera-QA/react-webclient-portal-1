import React, {useEffect, useContext, useState} from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import {AuthContext} from "../../../../../../../../contexts/AuthContext";
import KpiActions from "../../../../../../../admin/kpi_editor/kpi-editor-actions";
import Loading from "../../../../../../../common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import DtoTextInput from "../../../../../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../../../../../common/input/dto_input/dto-toggle-input";
import DtoSelectInput from "../../../../../../../common/input/dto_input/dto-select-input";
import SaveButton from "../../../../../../../common/buttons/SaveButton";
import {DialogToastContext} from "../../../../../../../../contexts/DialogToastContext";
import argoActions from "../../argo-actions";

function ArgoApplicationEditorPanel({ argoApplicationData, toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [argoApplicationDataDto, setArgoApplicationDataDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setArgoApplicationDataDto(argoApplicationData);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const createKpi = async () => {
    return await argoActions.createArgoApplication(argoApplicationDataDto, getAccessToken);
  }

  const updateKpi = async () => {
    return await argoActions.updateArgoApplication(argoApplicationDataDto, getAccessToken);
  };

  if (isLoading || argoApplicationDataDto == null) {
    return <Loading size="sm" />;
  }

  return (
    <>
      <div className="scroll-y full-height">
        <Row>
          <Col lg={12}>
            <DtoTextInput dataObject={argoApplicationDataDto} fieldName={"name"} setDataObject={setArgoApplicationDataDto}/>
          </Col>
          <Col lg={12}>
            <DtoToggleInput setDataObject={setArgoApplicationDataDto} fieldName={"active"} dataObject={argoApplicationDataDto}/>
          </Col>
          <Col lg={12}>
            <DtoTextInput dataObject={argoApplicationDataDto} fieldName={"description"} setDataObject={setArgoApplicationDataDto}/>
          </Col>
          <Col lg={12}>
            <DtoTextInput dataObject={argoApplicationDataDto} fieldName={"type"} setDataObject={setArgoApplicationDataDto}/>
          </Col>
        </Row>
        <Row>
          <div className="ml-auto mt-3 px-3">
            <SaveButton updateRecord={updateKpi} setRecordDto={setArgoApplicationDataDto} setData={setArgoApplicationData} handleClose={handleClose} createRecord={createKpi} recordDto={argoApplicationDataDto}/>
          </div>
        </Row>
      </div>
    </>
  );
}

ArgoApplicationEditorPanel.propTypes = {
  argoApplicationData: PropTypes.object,
  toolData: PropTypes.object,
  loadData: PropTypes.func
};


export default ArgoApplicationEditorPanel;
