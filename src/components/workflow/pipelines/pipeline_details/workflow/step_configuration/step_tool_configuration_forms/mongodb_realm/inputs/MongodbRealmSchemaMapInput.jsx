import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {faFile, faTimes} from "@fortawesome/pro-light-svg-icons";
import { Row, Col, Button } from "react-bootstrap";
import regexDefinitions from "utils/regexDefinitions";
import InfoText from "components/common/inputs/info_text/InfoText";
import IconBase from "components/common/icons/IconBase";

const MongodbRealmSchemaMapInput = ({ dataObject, setDataObject, fieldName, disabled, allowIncompleteItems }) => {

  const [mappings, setMappings] = useState([]);
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageCollection, setErrorMessageCollection] = useState("");
  const [errorMessageFilepath, setErrorMessageFilepath] = useState("");
  const [collection, setCollection] = useState("");
  const [gitFilePath, setGitFilePath] = useState("");
  const [addView, setAddView] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setAddView(true);
    let currentData = dataObject?.getData(fieldName);
    let items = Array.isArray(currentData) && currentData.length > 0 ? currentData : [];
    setMappings([...items]);
  };

  const getFieldBody = () => {
    return (
      <>
        <div className="flex-fill">
          {mappings.map((mapping, index) => {
            return getMappingRow(mapping, index);
          })}
        </div>
        { addView ? (
          <div className="flex-fill">
            {getInputRow()}
          </div>
        ) : (
          <div>
            <div className="bottom-zoom-btns mr-2">
              <Button size="sm" variant="light" onClick={() => handleDelete()}>Delete Secrets</Button>
            </div>
          </div>          
        ) }        
      </>      
    );
  };

  const getInputRow = () => {
    return (
      <div className="my-2">
        <Row>
          <Col sm={11} className={"my-1 ml-2"}>
            <input
              className="form-control"
              type={"text"}
              placeholder={"[Database name].[Collection name]"}
              maxLength={200}
              onChange={(event) => setCollection(event.target.value)}
              value={collection}
            />
            <InfoText errorMessage={errorMessageCollection} />
          </Col>          
        </Row>        
        <Row>
          <Col sm={11} className={"my-1 ml-2"}>
            <input
              className="form-control"
              type={"text"}
              placeholder={"Repository Path to Schema file"}
              maxLength={200}
              onChange={(event) => setGitFilePath(event.target.value)}
              value={gitFilePath}
            />
            <InfoText errorMessage={errorMessageFilepath} />
          </Col>          
        </Row>        
        <Button size="sm" className="my-1 ml-2" variant="success" 
          disabled={!collection || collection.length === 0 || !gitFilePath || gitFilePath.length === 0}
          onClick={() => { addMapping();}}
        >
          Add Mapping
        </Button>          
      </div>
    );
  };

  const getMappingRow = (mapping, index) => {
    return (
      <div className={`d-flex align-items-center justify-content-between ${addView ? "" : "py-2"} ${index % 2 === 0 ? "even-row" : "odd-row"}`} key={index}>
        <Col sm={11}>
          <Row>
            <Col sm={6} className={"pl-2 pr-0"}>              
              {mapping["collection"]}
            </Col>
            <Col sm={6} className={"pl-2 pr-0"}>             
              {mapping["gitFilePath"]}
            </Col>
          </Row>
        </Col>
        <Col sm={1} className={"pr-3 pl-0 delete-button"}>
          {addView ? getDeletePropertyButton(index) : null}
        </Col>
      </div>
    );
  };

  const addMapping = () => {
    const collectionSchemaRegex = regexDefinitions.collectionName;
    const filepathRegex = regexDefinitions.jsonFile;

    setErrorMessageCollection("");
    setErrorMessageFilepath("");

    if(!collection.match(collectionSchemaRegex?.regex)){
      setErrorMessageCollection(collectionSchemaRegex?.errorFormText);
      return;
    }

    if(!gitFilePath.match(filepathRegex?.regex)){
      setErrorMessageFilepath(filepathRegex?.errorFormText);
      return;
    }

    let newMappingList = [...mappings, {
      collection,
      gitFilePath
    }];
    validateAndSetData(newMappingList);
    setCollection("");
    setGitFilePath("");
  };

  const getDeletePropertyButton = (index) => {
    return (
      <Button variant="link" onClick={() => deleteProperty(index)}>
        <span><IconBase className={"danger-red"} icon={faTimes}/></span>
      </Button>
    );
  };

  const deleteProperty = (index) => {
    let newMappingList = mappings;
    newMappingList.splice(index, 1);
    validateAndSetData(newMappingList);
  };

  const handleDelete = () => {
    setMappings([]);
    // setDelFlag(true);
    setAddView(true);
  };

  const validateAndSetData = (newMappingList) => {
    setMappings([...newMappingList]);
    let newDataObject = {...dataObject};

    if (field && newMappingList && newMappingList.length > field.maxItems) {
      setErrorMessage(`You have reached the maximum allowed number of Mappings. Please remove one to add another.`);
      return;
    }

    let newArray = [];

    if (newMappingList && newMappingList.length > 0) {
      newMappingList.map((property) => {
        if (allowIncompleteItems !== true && property["collection"] === "" || property["gitFilePath"] === "") {
          return;
        }

        newArray.push(property);
      });
    }

    newDataObject.setData(fieldName, newArray);
    setDataObject({...newDataObject});
  };

  const getHeaderBar = () => {
    return (
      <div className="d-flex justify-content-between page-description">
        <Col sm={11}>
          <Row>
            <Col sm={6} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Collection</span>  
            </Col>
            <Col sm={6} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Schema File Path</span>  
            </Col>
          </Row>
        </Col>
      </div>
    );
  };

  const getTitleBar = () => {
    return (
      <div className="px-2 pt-2 d-flex justify-content-between">
        <div><IconBase icon={faFile} className={"mr-2"}/>Schema Mapping</div>
      </div>
    );
  };

  return (
    <div className="object-properties-input">
      <div className="content-container">
        <div className="property-header">
          <h6>{getTitleBar()}</h6>
        </div>
        <div>
          {mappings.length > 0 ? getHeaderBar() : null}
        </div>
        <div className="properties-body-alt">
          {getFieldBody()}
        </div>
      </div>
    </div>
  );
};

MongodbRealmSchemaMapInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
  allowIncompleteItems: PropTypes.bool,
};

MongodbRealmSchemaMapInput.defaultPros = {
  allowIncompleteItems: false,
  disabled: false,
};

export default MongodbRealmSchemaMapInput;
