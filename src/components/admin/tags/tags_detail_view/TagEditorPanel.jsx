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
import Modal from "../../../common/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import adminTagsActions from "../admin-tags-actions";
import Loading from "../../../common/loading";

const INITIAL_DATA = {
  key: "",
  value: "",
  configuration: {},
  active: false,
};

function TagEditorPanel({ tagData, newTag, setTagData, handleClose }) {
  const [error, setErrors] = useState("");
  const { getAccessToken } = useContext(AuthContext);
  const [formFieldList, updateFormFields ] = useState({ ...tagEditorFormFields });
  const [ changeMap, setChangeMap] = useState({});
  const [ formData, setFormData] = useState(INITIAL_DATA);
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
    console.log("TagData in unpackTagData: " + JSON.stringify(tagData));
    if (tagData != null) {
      setFormField("key", tagData["key"] != null ? tagData["key"] : "");
      setFormField("value", tagData["value"] != null ? tagData["value"] : "");
      setFormField("configuration", tagData["configuration"] != null ? tagData["configuration"] : {});
      setFormField("active", tagData["active"] != null ? tagData["active"] : false);
    }
    setIsLoading(false);
  };

  const setFormField = (field, value) => {
    console.log("Setting form field: " + field + " value: " + JSON.stringify(value));

    if (value === tagData[field])
    {
      console.log("Removing " + field + " from change map");
      delete changeMap[field];
    }
    else
    {
      console.log("Added " + field + " to change map: " + value);
      changeMap[field] = value;
      setChangeMap({ ...changeMap });
    }

    formData[field] = value;
    setFormData({ ...formData });


    console.log("ChangeMap: " + JSON.stringify(changeMap));

    if (newTag)
    {
      tagData[field] = value;
      setTagData({ ...tagData });
    }
  };

  //TODO: Check fields
  const isFormValid = true;

  const createTag = async (newFormData) => {
    console.log("Persisting new tag to DB: " + JSON.stringify(newFormData));

    if(isFormValid) {
      let createTagResponse = await adminTagsActions.create(newFormData, getAccessToken);
      console.log("createTagResponse: ", JSON.stringify(createTagResponse));

      if (createTagResponse.error != null) {
        const errorMsg = `Microservice error reported creating the tag: ${newFormData.key}.  Error returned: ${JSON.stringify(createTagResponse.error.message, null, 2)}`;
        console.log(errorMsg);
        setErrors(errorMsg);
      }
      else {
        handleClose();
      }
    }
  };

  const updateTag = async (newTagData) => {
    if(isFormValid) {
      try {
        console.log("Persisting values in ChangeMap : " + JSON.stringify(changeMap));
        const response = await adminTagsActions.update(newTagData._id, changeMap, getAccessToken);
        console.log("Response data: " + JSON.stringify(response.data));
        setTagData({ ...response.data });
        setChangeMap({});
      }
      catch (err) {
        console.log(err.message);
      }
    }

  };

  return (
    <>
      {isLoading ? <Loading size="sm" /> : null}

      {!isLoading && <>
        <div className="scroll-y full-height">
          {error.length > 0 && <>
            <div className="pb-2 error-text">WARNING! An error has occurred saving your configuration: {error}</div>
          </>}
          <Row>
            <Col>
              <TextInput field={formFieldList.key} setData={setFormField} formData={formData}/>
            </Col>
            <Col>
              <ToggleInput field={formFieldList.active} setData={setFormField} formData={formData} />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ formFieldList.value } setData={setFormField} formData={formData}/>
            </Col>
            <Col>
              <MultipleInput field={ formFieldList.configuration } setData={setFormField} formData={formData}/>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto px-3">
              {newTag ? <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0} onClick={() => createTag(tagData)}>Create Tag</Button>
                : <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0} onClick={() => updateTag(tagData)}>Save changes</Button>
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
  handleClose: PropTypes.func
};

TagEditorPanel.defaultProps = {
  newTag: false
};

export default TagEditorPanel;


