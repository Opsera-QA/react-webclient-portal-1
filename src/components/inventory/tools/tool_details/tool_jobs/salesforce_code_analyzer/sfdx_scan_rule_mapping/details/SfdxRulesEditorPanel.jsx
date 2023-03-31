import React, {useEffect, useContext, useState, useRef} from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import sfdxScanActions from "../../sfdx-scan-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import SfdxMapRuleSetSelectInput from "./inputs/SfdxMapRuleSetSelectInput";
import SfdxScanThresholdInputBase from "./inputs/SfdxScanThresholdInputBase";
import PositiveIntegerNumberPickerInput
  from "../../../../../../../common/inputs/number/picker/PositiveIntegerNumberPickerInput";

function SfdxRulesEditorPanel({ pmdRuleData, toolData, ruleId, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [pmdRuleModel, setPmdRuleModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if(pmdRuleData) {
      loadData();
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pmdRuleData]);

  const loadData = () => {
    try {
      setIsLoading(true);
      setPmdRuleModel(pmdRuleData);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createQualityGate = async () => {
    return await sfdxScanActions.createRule(getAccessToken, cancelTokenSource, toolData?.getData("_id"), pmdRuleModel);
  };

  const updateQualityGate = async () => {
    return await sfdxScanActions.updateRule(getAccessToken, cancelTokenSource, toolData?.getData("_id"), ruleId, pmdRuleModel);
  };

  const deleteQualityGate = async () => {
    const response = await sfdxScanActions.deleteRule(getAccessToken, cancelTokenSource, toolData?.getData("_id"), ruleId);
    handleClose();
    return response;
  };

  if (isLoading || pmdRuleModel == null) {
    return <LoadingDialog size="sm" message={"Loading Data"} />;
  }

  return (
    <EditorPanelContainer
      recordDto={pmdRuleModel}
      createRecord={createQualityGate}
      updateRecord={updateQualityGate}
      setRecordDto={setPmdRuleModel}
      isLoading={isLoading}
      extraButtons={
        <DeleteButtonWithInlineConfirmation
          dataObject={pmdRuleModel}
          deleteRecord={deleteQualityGate}
        />
      }
      // disable={pmdRuleModel?.isNew() !== true}
      handleClose={handleClose}
    >
      <div className="scroll-y hide-x-overflow">
        <Row>
          <Col lg={12}>
            <TextInputBase
              setDataObject={setPmdRuleModel}
              dataObject={pmdRuleModel}
              fieldName={"name"}
              disabled={!pmdRuleData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <SfdxMapRuleSetSelectInput
                setModel={setPmdRuleModel}
                model={pmdRuleModel}
                fieldName={"category"}
                disabled={!pmdRuleData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <PositiveIntegerNumberPickerInput
                dataObject={pmdRuleModel}
                setDataObject={setPmdRuleModel}
                fieldName={"threshold"}
            />
          </Col>
          <Col lg={12}>
              <SfdxScanThresholdInputBase
                  fieldName={"qualityGates"}
                  model={pmdRuleModel}
                  className={"mb-3"}
                  setModel={setPmdRuleModel}
              />
          </Col>
        </Row>
      </div>
    </EditorPanelContainer>
  );
}

SfdxRulesEditorPanel.propTypes = {
  pmdRuleData: PropTypes.object,
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  ruleId: PropTypes.string,
  handleClose: PropTypes.func
};

export default SfdxRulesEditorPanel;
