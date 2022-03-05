import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import {Col, Row} from "react-bootstrap";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import TagManager from "components/common/inputs/tags/TagManager";
import axios from "axios";
import {toolCategoryActions} from "components/admin/tools/categories/toolCategory.actions";

function ToolCategoryEditorPanel({ toolCategoryData, setToolCategoryData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [toolCategoryModel, setToolCategoryModel] = useState(undefined);
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
    if (isMounted?.current === true) {
      setIsLoading(true);
      setToolCategoryModel(toolCategoryData);
      setIsLoading(false);
    }
  };

  const createToolType = async () => {
    return await toolCategoryActions.createToolTypeV2(
      getAccessToken,
      cancelTokenSource,
      toolCategoryModel,
      );
  };

  const updateToolType = async () => {
    return await toolCategoryActions.updateToolTypeV2(
      getAccessToken,
      cancelTokenSource,
      toolCategoryModel,
      );
  };

  if (isLoading || toolCategoryModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <EditorPanelContainer
      isLoading={isLoading}
      createRecord={createToolType}
      updateRecord={updateToolType}
      setRecordDto={setToolCategoryModel}
      recordDto={toolCategoryModel}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase
            fieldName={"name"}
            dataObject={toolCategoryModel}
            setDataObject={setToolCategoryModel}
          />
        </Col>
        <Col lg={6}>
          <TextInputBase
            fieldName={"identifier"}
            dataObject={toolCategoryModel}
            setDataObject={setToolCategoryModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"description"}
            dataObject={toolCategoryModel}
            setDataObject={setToolCategoryModel}
          />
        </Col>
        <Col lg={6}>
          <TagManager
            type={"tool"}
            dataObject={toolCategoryModel}
            setDataObject={setToolCategoryModel}
          />
        </Col>
        <Col lg={6}>
          <ActivityToggleInput
            fieldName={"active"}
            dataObject={toolCategoryModel}
            setDataObject={setToolCategoryModel}
          />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

ToolCategoryEditorPanel.propTypes = {
  toolCategoryData: PropTypes.object,
  setToolCategoryData: PropTypes.func,
  handleClose: PropTypes.func
};

export default ToolCategoryEditorPanel;


