import React, {useState, useContext, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TagTypeSelectInput from "components/common/list_of_values_input/settings/tags/TagTypeSelectInput";
import TagConfigurationInput from "components/common/list_of_values_input/settings/tags/TagConfigurationInput";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import axios from "axios";

function TagEditorPanel({ tagData, setTagData, handleClose }) {
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
        <Col md={tagDataDto?.isNew() === true ? 12 : 6}>
          <TagTypeSelectInput dataObject={tagDataDto} setDataObject={setTagDataDto}/>
          <TextInputBase fieldName={"value"} setDataObject={setTagDataDto} dataObject={tagDataDto}/>
          <ActivityToggleInput fieldName={"active"} setDataObject={setTagDataDto} dataObject={tagDataDto}/>
        </Col>
        <Col md={tagDataDto?.isNew() === true ? 12 : 6}>
          <TagConfigurationInput dataObject={tagDataDto} setDataObject={setTagDataDto}/>
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

TagEditorPanel.propTypes = {
  tagData: PropTypes.object,
  setTagData: PropTypes.func,
  handleClose: PropTypes.func
};

export default TagEditorPanel;


