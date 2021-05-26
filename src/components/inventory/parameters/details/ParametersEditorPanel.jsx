import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import axios from "axios";
import parametersActions from "components/inventory/parameters/parameters-actions";

function ParametersEditorPanel({ parameterModel, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [parameterData, setParameterData] = useState(undefined);
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
    setParameterData(parameterModel);
    setIsLoading(false);
  };

  const createParameter = async () => {
    return await parametersActions.createParameterV2(getAccessToken, cancelTokenSource, parameterData);
  };

  const updateParameter = async () => {
    return await parametersActions.updateParameterV2(getAccessToken, cancelTokenSource, parameterData);
  };

  return (
    <EditorPanelContainer
      recordDto={parameterData}
      createRecord={createParameter}
      updateRecord={updateParameter}
      setRecordDto={setParameterData}
      isLoading={isLoading}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase setDataObject={setParameterData} dataObject={parameterData} fieldName={"name"}/>
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

ParametersEditorPanel.propTypes = {
  parameterModel: PropTypes.object,
  handleClose: PropTypes.func
};

export default ParametersEditorPanel;


