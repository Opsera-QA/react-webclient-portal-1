import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function ExternalApiIntegratorEndpointEditorPanel({ toolModel, toolPathModel, setToolPathModel }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const updatePath = async () => {
    const paths = [toolPathModel?.getPersistData()];
    toolModel?.setData("paths", paths);

    return await toolsActions.updateToolV2(getAccessToken, cancelTokenSource, toolModel);
  };

  if (!toolPathModel) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <EditorPanelContainer
      recordDto={toolPathModel}
      createRecord={updatePath}
      updateRecord={updatePath}
    >
      <Row>
        <Col lg={12}>
          <TextInputBase
            fieldName={"name"}
            dataObject={toolPathModel}
            setDataObject={setToolPathModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"description"}
            dataObject={toolPathModel}
            setDataObject={setToolPathModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"path"}
            dataObject={toolPathModel}
            setDataObject={setToolPathModel}
          />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

ExternalApiIntegratorEndpointEditorPanel.propTypes = {
  toolModel: PropTypes.object,
  toolPathModel: PropTypes.object,
  setToolPathModel: PropTypes.func,
};

export default ExternalApiIntegratorEndpointEditorPanel;
