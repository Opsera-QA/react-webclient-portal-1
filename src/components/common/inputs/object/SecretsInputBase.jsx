import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faBracketsCurly, faTimes} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconBase from "components/common/icons/IconBase";

function SecretsInputBase({
  dataObject, 
  setDataObject, 
  fieldName, 
  disabledFields, 
  type, 
  titleIcon, 
  allowIncompleteItems, 
  titleText, 
  nameMaxLength, 
  regexValidationRequired,
  delFlag,
  setDelFlag,
  addFlag
}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [properties, setProperties] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [addView, setAddView] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, properties);
    setDataObject({...newDataObject});
  }, [properties]);

  const loadData = () => {
    setAddView(addFlag);
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
        if (allowIncompleteItems !== true && property["name"] === "" || property["value"] === "") {
          return;
        }

        newArray.push(property);
      });
    }

    newDataObject.setData(fieldName, newArray);
    setDataObject({...newDataObject});
  };

  const addProperty = () => {
    setProperties([...properties, {
      name,
      value
    }]);
    setName("");
    setValue("");
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
              placeholder={"Name"}                
              maxLength={nameMaxLength}
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={11} className={"my-1 ml-2"}>
            <textarea
              style={{WebkitTextSecurity: 'disc'}}
              rows={3}
              onChange={(event) => setValue(event.target.value)}
              className="form-control"
              placeholder={"Value"}
              value={value}
            />
          </Col>
        </Row>
        <Button size="sm" className="my-1 ml-2" variant="success" 
          disabled={!name || name.length === 0 || !value || value.length === 0}
          onClick={() => { addProperty();}}
        >
          Add {type}
        </Button>          
      </div>
    );
  };

  const getPropertyRow = (property, index) => {
    return (
      <div className={`d-flex align-items-center justify-content-between ${addView ? "" : "py-2"} ${index % 2 === 0 ? "even-row" : "odd-row"}`} key={index}>
        <Col sm={11}>
          <Row>
            <Col sm={6} className={"pl-2 pr-0"}>
              {/* <input
                className="form-control"
                type={"text"}
                value={property["name"]}
                placeholder={"Name"}
                disabled={true}                
              /> */}
              {property["name"]}
            </Col>
            <Col sm={6} className={"pl-2 pr-0"}>              
              {/* <input                
                className="form-control"
                type={"password"}
                value={property["value"]}
                placeholder={"Value"}
                disabled={true}
              /> */}
              {"**********"}
            </Col>
          </Row>
        </Col>
        <Col sm={1} className={"pr-3 pl-0 delete-button"}>
          {addView ? getDeletePropertyButton(index) : null}
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
        { addView ? (
          <div className="flex-fill">
            {getInputRow()}
          </div>
        ) : (
          <div>
            <small className="form-text text-muted form-group m-2 text-left">
              Please delete the existing secrets to add new secrets
            </small>                      
            <div className="bottom-zoom-btns mr-2">
              <Button size="sm" variant="light" onClick={() => handleDelete()}>Delete Secrets</Button>
            </div>
          </div>          
        ) }        
      </>      
    );
  };

  const handleDelete = () => {
    setProperties([]);
    setDelFlag(true);
    setAddView(true);
  };
  
  const getDeletePropertyButton = (index) => {
    return (
      <Button variant="link" onClick={() => deleteProperty(index)}>
        <span><IconBase className={"danger-red"} icon={faTimes} fixedWidth/></span>
      </Button>
    );
  };

  const getHeaderBar = () => {
    return (
      <div className="d-flex justify-content-between page-description">
        <Col sm={11}>
          <Row>
            <Col sm={6} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Name</span>  
            </Col>
            <Col sm={6} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Value</span>  
            </Col>
          </Row>
        </Col>
      </div>
    );
  };

  const getTitleBar = () => {
    return (
      <div className="px-2 pt-2 d-flex justify-content-between">
        <div><IconBase icon={titleIcon} className={"mr-2"}/>{titleText}</div>
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

SecretsInputBase.propTypes = {
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
  delFlag: PropTypes.bool,
  setDelFlag: PropTypes.func,
  addFlag: PropTypes.bool
};

SecretsInputBase.defaultProps = {
  titleIcon: faBracketsCurly,
  disabledFields: [],
  allowIncompleteItems: false,
  nameMaxLength: 50
};

export default SecretsInputBase;