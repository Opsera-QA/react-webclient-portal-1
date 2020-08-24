import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  ButtonGroup, ButtonToolbar,
  Popover,
} from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";

import validate from "utils/formValidation";
import tagEditorFormFields from "../tags-form-fields.js";
import TextInput from "../../../common/input/text-input";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToggleInput from "../../../common/input/toggle-input";
import MultipleInput from "../../../common/input/multiple-input";
import Modal from "../../../common/modal/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import adminTagsActions from "../admin-tags-actions";
import Loading from "../../../common/status_notifications/loading";

const INITIAL_DATA = {
  type: "",
  value: "",
  configuration: {},
  active: false,
};

function TagEditorPanel({ tagData, newTag, setTagData, handleClose }) {
  const [error, setErrors] = useState("");
  const { getAccessToken } = useContext(AuthContext);
  const [formFieldList, updateFormFields] = useState({ ...tagEditorFormFields });
  const [changeMap, setChangeMap] = useState({});
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData(tagData);
  }, []);

  const loadData = async (tagData) => {
    setIsLoading(true);
    await unpackTagData(tagData);
    setIsLoading(false);
  };

  const unpackTagData = async (tagData) => {
    if (tagData != null) {
      setFormField("type", tagData["type"] != null ? tagData["type"] : "");
      setFormField("value", tagData["value"] != null ? tagData["value"] : "");
      setFormField("configuration", tagData["configuration"] != null ? tagData["configuration"] : {});
      setFormField("active", tagData["active"] != null ? tagData["active"] : false);
    }
    setIsLoading(false);
  };

  const setFormField = (field, value) => {
    if (value === tagData[field]) {
      delete changeMap[field];
    } else {
      changeMap[field] = value;
      setChangeMap({ ...changeMap });
    }
    formData[field] = value;
    setFormData({ ...formData });

    if (newTag) {
      tagData[field] = value;
      setTagData({ ...tagData });
    }
  };

  //TODO: Check fields
  const isFormValid = true;

  const createTag = async (newFormData) => {
    if (isFormValid) {
      let createTagResponse = await adminTagsActions.create(newFormData, getAccessToken);
      if (createTagResponse.error != null) {
        const errorMsg = `Microservice error reported creating the tag: ${newFormData.key}.  Error returned: ${JSON.stringify(createTagResponse.error.message, null, 2)}`;
        setErrors(errorMsg);
      } else {
        handleClose();
      }
    }
  };

  const updateTag = async (newTagData) => {
    if (isFormValid) {
      try {
        const response = await adminTagsActions.update(newTagData._id, changeMap, getAccessToken);
        setTagData({ ...response.data });
        setChangeMap({});
      } catch (err) {
        console.log(err.message);
      }
    }

  };

  return (
    <>
      {isLoading ? <Loading size="sm"/> : null}

      {!isLoading && <>
        <div className="scroll-y full-height">
          {error.length > 0 && <>
            <div className="pb-2 error-text">WARNING! An error has occurred saving your configuration: {error}</div>
          </>}
          <Row>
            <Col>
              <TextInput field={formFieldList.type} setData={setFormField} formData={formData}/>
            </Col>
            <Col>
              <ToggleInput field={formFieldList.active} setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={formFieldList.value} setData={setFormField} formData={formData}/>
            </Col>
            <Col>
              <MultipleInput field={formFieldList.configuration} setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto px-3">
              {newTag ? <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0}
                                onClick={() => createTag(tagData)}>Create Tag</Button>
                : <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0}
                          onClick={() => updateTag(tagData)}>Save changes</Button>
              }
            </div>
          </Row>
        </div>
      </>}
    </>
  );
}

TagEditorPanel.propTypes = {
  tagData: PropTypes.object,
  setTagData: PropTypes.func,
  canDelete: PropTypes.bool,
  newTag: PropTypes.bool,
  handleClose: PropTypes.func,
};

TagEditorPanel.defaultProps = {
  newTag: false,
};

export default TagEditorPanel;


