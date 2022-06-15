import React, { useEffect, useContext, useState, useRef } from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import sfdcDataTransformerRulesActions from "../sfdc-data-transformer-rules-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import SfdcDataTransformerOperationSelectInput from "./inputs/SfdcDataTransformerOperationSelectInput";
import SfdcTagsFilterInputBase from "./inputs/SfdcTagsFilterInputBase";
import SfdcComponentTypeSelectInput from "./inputs/SfdcComponentTypeSelectInput";
import SfdcComponentNameFilterInputBase from "./inputs/SfdcComponentNameFilterInputBase";

function SfdcDataTransformerRulesEditorPanel({ dataTransformerRuleData, toolData, ruleId, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [dataTransformerRuleModel, setDataTransformerRuleModel] = useState(undefined);
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

    if (dataTransformerRuleData) {
      loadData();
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [dataTransformerRuleData]);

  const loadData = () => {
    try {
      setIsLoading(true);
      setDataTransformerRuleModel(dataTransformerRuleData);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createQualityGate = async () => {
    return await sfdcDataTransformerRulesActions.createDataTransformerRule(getAccessToken, cancelTokenSource, toolData.getData("_id"), dataTransformerRuleModel);
  };

  const updateQualityGate = async () => {
    return await sfdcDataTransformerRulesActions.updateDataTransformerRule(getAccessToken, cancelTokenSource, toolData.getData("_id"), ruleId, dataTransformerRuleModel);
  };

  const deleteQualityGate = async () => {
    const response = await sfdcDataTransformerRulesActions.deleteDataTransformerRule(getAccessToken, cancelTokenSource, toolData.getData("_id"), ruleId);
    handleClose();
    return response;
  };

  if (isLoading || dataTransformerRuleModel == null) {
    return <LoadingDialog size="sm" message={"Loading Data"} />;
  }

  const getXmlFields = () => {
    if (dataTransformerRuleModel?.getData("operation") === "exclude") {
      return (
        <Col lg={12}>
          <TextInputBase
            setDataObject={setDataTransformerRuleModel}
            dataObject={dataTransformerRuleModel}
            fieldName={"tagName"}
          />
        </Col>
      );
    }
    if(dataTransformerRuleModel?.getData("isXml") && dataTransformerRuleModel?.getData("operation") === "search_and_replace") {
      return (
        <>
          <Col lg={12}>
            <TextInputBase
              setDataObject={setDataTransformerRuleModel}
              dataObject={dataTransformerRuleModel}
              fieldName={"tagName"}
            />
          </Col>
          <Col lg={12} className="my-3">
            <SfdcTagsFilterInputBase
              fieldName={"tagFilter"}
              model={dataTransformerRuleModel}
              setModel={setDataTransformerRuleModel}
            />
          </Col>
        </>
      );
    }
  };

  const getSearchAndReplaceFields = () => {
    if (dataTransformerRuleModel?.getData("operation") === "search_and_replace") {
      return (
        <>
          <Col lg={12}>
            <TextInputBase
              setDataObject={setDataTransformerRuleModel}
              dataObject={dataTransformerRuleModel}
              fieldName={"searchText"}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              setDataObject={setDataTransformerRuleModel}
              dataObject={dataTransformerRuleModel}
              fieldName={"replaceText"}
            />
          </Col>          
        </>
      );
    }    
  };

  return (
    <EditorPanelContainer
      recordDto={dataTransformerRuleModel}
      createRecord={createQualityGate}
      updateRecord={updateQualityGate}
      setRecordDto={setDataTransformerRuleModel}
      isLoading={isLoading}
      extraButtons={
        <DeleteButtonWithInlineConfirmation
          dataObject={dataTransformerRuleModel}
          deleteRecord={deleteQualityGate}
        />
      }
      handleClose={handleClose}
    >
      <div className="scroll-y hide-x-overflow">
        <Row className="mb-5">
          <Col lg={12}>
            <TextInputBase
              setDataObject={setDataTransformerRuleModel}
              dataObject={dataTransformerRuleModel}
              fieldName={"name"}
              disabled={!dataTransformerRuleData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <SfdcDataTransformerOperationSelectInput
              model={dataTransformerRuleModel}
              setModel={setDataTransformerRuleModel}
              disabled={!dataTransformerRuleData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <SfdcComponentTypeSelectInput
              model={dataTransformerRuleModel}
              setModel={setDataTransformerRuleModel}
              disabled={!dataTransformerRuleData?.isNew()}
              toolId={toolData.getData("_id")}
              operation={dataTransformerRuleModel?.getData("operation")}
            />
          </Col>
          <Col lg={12} className="my-3">
            <SfdcComponentNameFilterInputBase
              fieldName={"componentName"}
              model={dataTransformerRuleModel}
              setModel={setDataTransformerRuleModel}              
            />
          </Col>
          {getXmlFields()}
          {getSearchAndReplaceFields()}
        </Row>
      </div>
    </EditorPanelContainer>
  );
}

SfdcDataTransformerRulesEditorPanel.propTypes = {
  dataTransformerRuleData: PropTypes.object,
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  ruleId: PropTypes.string,
  handleClose: PropTypes.func
};

export default SfdcDataTransformerRulesEditorPanel;
