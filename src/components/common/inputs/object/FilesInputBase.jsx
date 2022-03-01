import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faBracketsCurly, faTimes} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import regexDefinitions from "utils/regexDefinitions";
import IconBase from "components/common/icons/IconBase";

function FilesInputBase({
  dataObject, 
  setDataObject, 
  fieldName, 
  disabledFields, 
  type, 
  titleIcon, 
  allowIncompleteItems, 
  titleText, 
  nameMaxLength, 
  regexValidationRequired
}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [properties, setProperties] = useState([]);
  const [inputFilePath, setInputFilePath] = useState("");
  const [inputFileName, setInputFileName] = useState("");
  const [inputFilePathError, setInputFilePathError] = useState("");
  const [inputFileNameError, setInputFileNameError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {    
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, properties);
    setDataObject({...newDataObject});
  }, [properties]);

  const loadData = () => {    
    let currentData = dataObject?.getData(fieldName);
    let items = Array.isArray(currentData) && currentData.length > 0 ? currentData : [];
    setProperties([...items]);
  };

  const validateAndSetData = (newPropertyList) => {
    setProperties([...newPropertyList]);
    let newDataObject = {...dataObject};

    if (newPropertyList.length > field.maxItems) {
      setErrorMessage(`You have reached the maximum allowed number of ${type}. Please remove one to add another.`);
      return;
    }

    let newArray = [];

    if (newPropertyList && newPropertyList.length > 0) {
      newPropertyList.map((property) => {
        if (allowIncompleteItems !== true && property["inputFilePath"] === "" || property["inputFileName"] === "") {
          return;
        }
        newArray.push(property);
      });
    }

    newDataObject.setData(fieldName, newArray);
    setDataObject({...newDataObject});
  };

  const setInputFilePathHandler = (filePath) => {
    setInputFilePathError("");
    let format = regexDefinitions?.pathField?.regex;
    let meetsRegex = format.test(filePath);
    setInputFilePath(filePath);
    if(!meetsRegex){
      setInputFilePathError(regexDefinitions?.pathField?.errorFormText);
    }
  };

  const setInputFileNameHandler = (fileName) => {
    setInputFileNameError("");
    let format = regexDefinitions?.genericFileName?.regex;
    let meetsRegex = format.test(fileName);
    setInputFileName(fileName);
    if(!meetsRegex){
      setInputFileNameError(regexDefinitions?.genericFileName?.errorFormText);
    }
  };

  const addProperty = () => {    
    setProperties([...properties, {
      inputFilePath,
      inputFileName
    }]);
    setInputFilePath("");
    setInputFileName("");
  };

  const deleteProperty = (index) => {
    let newPropertyList = properties;
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  const getInputRow = () => {    
    return (
      <div className="my-2">
        <Row>
          <Col sm={11} className={"my-1 ml-2"}>
            <input
              className="form-control"
              type={"text"}                
              placeholder={"Input File Path"}                
              maxLength={nameMaxLength}
              onChange={(event) => setInputFilePathHandler(event.target.value)}
              value={inputFilePath}
            />
            <small className="red form-text">
              <div>{inputFilePathError}</div>
            </small>
          </Col>
        </Row>
        <Row>
          <Col sm={11} className={"my-1 ml-2"}>
            <input
              className="form-control"
              type={"text"}                
              placeholder={"Input File Name"}                
              maxLength={nameMaxLength}
              onChange={(event) => setInputFileNameHandler(event.target.value)}
              value={inputFileName}
            />
            <small className="red form-text">
              <div>{inputFileNameError}</div>
            </small>
          </Col>
        </Row>
        <Button size="sm" className="my-1 ml-2" variant="success" 
          disabled={!allowIncompleteItems && (!inputFilePath || inputFilePath.length === 0 || !inputFileName || inputFileName.length === 0)}
          onClick={() => { addProperty();}}
        >
          Add {type}
        </Button>          
      </div>
    );
  };

  const getPropertyRow = (property, index) => {    
    return (
      <div className={`d-flex align-items-center justify-content-between ${index % 2 === 0 ? "even-row" : "odd-row"}`} key={index}>
        <Col sm={11}>
          <Row>
            <Col sm={6} className={"pl-2 pr-0 force-text-wrap"}>              
              {property["inputFilePath"]}
            </Col>
            <Col sm={6} className={"pl-2 pr-0 force-text-wrap"}>
            {property["inputFileName"]}
            </Col>
          </Row>
        </Col>
        <Col sm={1} className={"pr-3 pl-0 delete-button"}>
          {getDeletePropertyButton(index)}
        </Col>
      </div>
    );
  };

  const getFieldBody = () => {    
    return (
      <>
        <div className="flex-fill">
          {properties.map((property, index) => {
            return getPropertyRow(property, index);
          })}
        </div>
        <div className="flex-fill">
          {getInputRow()}
        </div>                
      </>      
    );
  };
  
  const getDeletePropertyButton = (index) => {
    return (
      <Button variant="link" onClick={() => deleteProperty(index)}>
        <span><IconBase className={"danger-red"} icon={faTimes}/></span>
      </Button>
    );
  };

  const getHeaderBar = () => {
    return (
      <div className="d-flex justify-content-between page-description">
        <Col sm={11}>
          <Row>
            <Col sm={6} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Input File Path</span>
            </Col>
            <Col sm={6} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Input File Name</span>  
            </Col>
          </Row>
        </Col>
      </div>
    );
  };

  const getTitleBar = () => {    
    return (
      <div className="px-2 pt-2 d-flex justify-content-between">
        <div><FontAwesomeIcon icon={titleIcon} fixedWidth className="mr-2"/>{titleText}</div>        
      </div>
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <div className="object-properties-input">
      <div className="content-container">
        <div className="property-header">
          <h6>{getTitleBar()}</h6>
        </div>
        <div>
          {properties.length > 0 ? getHeaderBar() : null}
        </div>
        <div className="properties-body-alt">
          {getFieldBody()}
        </div>        
      </div>      
    </div>
  );
}

FilesInputBase.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabledFields: PropTypes.array,
  fieldName: PropTypes.string,
  titleIcon: PropTypes.object,
  type: PropTypes.string,
  allowIncompleteItems: PropTypes.bool,
  titleText: PropTypes.string,
  nameMaxLength: PropTypes.number,
  regexValidationRequired: PropTypes.bool,
};

FilesInputBase.defaultProps = {
  titleIcon: faBracketsCurly,
  disabledFields: [],
  allowIncompleteItems: false,
  nameMaxLength: 50
};

export default FilesInputBase;