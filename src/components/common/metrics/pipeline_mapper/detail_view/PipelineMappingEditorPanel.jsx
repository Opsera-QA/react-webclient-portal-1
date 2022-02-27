import React, {useState, useContext, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import axios from "axios";
import PipelineMappingJobInput from "components/common/metrics/pipeline_mapper/jobs/PipelineMappingJobInput";

// TODO: Delete, use actual pipeline mapping editor panel
function PipelineMappingEditorPanel({ tagData, setTagData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [tagDataDto, setTagDataDto] = useState(undefined);
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
      setTagDataDto(tagData);
      setIsLoading(false);
    }
  };

  const createTag = async () => {
    return await adminTagsActions.createTagV2(getAccessToken, cancelTokenSource, tagDataDto);
  };

  const updateTag = async () => {
    return await adminTagsActions.updateTagV2(getAccessToken, cancelTokenSource, tagDataDto);
  };

  const getInlineWarning = () => {
    if (!tagDataDto?.isNew()) {
      return (
        <InlineWarning
          className={"mb-2"}
          warningMessage={`
            Editing Type or Value on a Tag does not updating existing applications of the tag. If you edit these,
            you will need to reapply the Tag to any place it is being used for the changes to take effect.
          `}
        />
      );
    }
  };

  return (
    <EditorPanelContainer
      isLoading={isLoading}
      recordDto={tagDataDto}
      handleClose={handleClose}
      setRecordDto={setTagDataDto}
      createRecord={createTag}
      updateRecord={updateTag}
    >
      {getInlineWarning()}
      <Row>
        <Col xs={12}>
          <TextInputBase
            fieldName={"name"}
            setDataObject={setTagDataDto}
            dataObject={tagDataDto}
          />
        </Col>
        <Col xs={12}>
          <PipelineMappingJobInput
            model={tagDataDto}
            setModel={setTagData}
            fieldName={"jobs"}
          />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

PipelineMappingEditorPanel.propTypes = {
  tagData: PropTypes.object,
  setTagData: PropTypes.func,
  handleClose: PropTypes.func
};

export default PipelineMappingEditorPanel;


