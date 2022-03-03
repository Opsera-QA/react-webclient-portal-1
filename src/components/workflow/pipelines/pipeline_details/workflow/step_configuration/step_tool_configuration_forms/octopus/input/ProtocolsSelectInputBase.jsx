import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faBracketsCurly, faTimes} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Model from "core/data_model/model";
import Col from "react-bootstrap/Col";
import OctopusProtocolInput from "./OctopusProtocolInput";
import OctopusCertificateInputSelect from "./OctopusCertificateInputSelect";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import IconBase from "components/common/icons/IconBase";

function ProtocolsSelectInputBase({
  dataObject, 
  setDataObject, 
  fieldName, 
  disabledFields, 
  type, 
  titleIcon, 
  allowIncompleteItems, 
  titleText,
}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [properties, setProperties] = useState([]);
  
  const [localProperties, setLocalProperties] = useState(new Model({protocols: []}, {
    fields: [
        {
            label: "Protocol",
            id: "protocol",
            maxLength: 5,
            isRequired: true
          },
          {
            label: "Thumbprint",
            id: "thumbprint"
          },
          {
            label: "Host",
            id: "host",
            regexDefinitionName: "hostnameRegex",
            maxLength: 255,
            // isRequired: true
          },
          {
            label: "Binding Port",
            id: "port",
            regexDefinitionName: "numericalField",
            maxLength: 4,
            isRequired: true
          },
    ]
  }, true));

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
    //   TODO: Add more validation here if necessary 
    setProperties([...newPropertyList]);
  };

  const addProperty = () => {
      
    let localProps = localProperties.getPersistData();
    setProperties([...properties, {
      "protocol" : localProps.protocol,
      "thumbprint" : localProps.thumbprint,
      "port" : localProps.port,
      "host" : localProps.host,
    }]);
    
    let newDataObject = {...localProperties};
    newDataObject.setData("protocol", "");
    newDataObject.setData("thumbprint", "");
    newDataObject.setData("port", "");
    newDataObject.setData("host", "");
    setLocalProperties({...newDataObject});

  };

  const deleteProperty = (index) => {
    let newPropertyList = properties;
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  const getInputRow = () => {
    return (
      <div className="m-2">
        <OctopusProtocolInput 
                  dataObject={localProperties}
                  setDataObject={setLocalProperties}
                  fieldName={"protocol"}
                />
                {localProperties &&
                  localProperties.getData("protocol") &&
                  localProperties.getData("protocol") === "https" && 
                  <OctopusCertificateInputSelect 
                    dataObject={localProperties}
                    setDataObject={setLocalProperties}
                    parentDataObject={dataObject}
                    setParentDataObject={setDataObject}
                    fieldName={"thumbprint"}
                  />
                }
                <TextInputBase
                  setDataObject={setLocalProperties}
                  dataObject={localProperties}
                  fieldName={"port"}
                />
                <TextInputBase
                  setDataObject={setLocalProperties}
                  dataObject={localProperties}
                  fieldName={"host"}
                />
        <Button size="sm" className="my-1 ml-2" variant="success" 
          disabled={ localProperties == null || !localProperties.checkCurrentValidity() }
          onClick={() => { addProperty();}}
        >
          Add {type}
        </Button>          
      </div>
    );
  };

  const getPropertyRow = (property, index) => {
    return (
      <div className={`d-flex align-items-center justify-content-between py-2} ${index % 2 === 0 ? "even-row" : "odd-row"}`} key={index}>
        <Col sm={11}>
          <Row>
            <Col sm={3} className={"pl-2 pr-0"}>
              {property["protocol"]}
            </Col>
            <Col sm={3} className={"pl-2 pr-0"}>              
              {property["port"]}
            </Col>
            <Col sm={3} className={"pl-2 pr-0"}>              
              {property["host"]}
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
            <Col sm={3} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Protocol</span>  
            </Col>
            <Col sm={3} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Port</span>  
            </Col>
            <Col sm={3} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Host</span>  
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

ProtocolsSelectInputBase.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabledFields: PropTypes.array,
  fieldName: PropTypes.string,
  titleIcon: PropTypes.object,
  type: PropTypes.string,
  allowIncompleteItems: PropTypes.bool,
  titleText: PropTypes.string,
};

ProtocolsSelectInputBase.defaultProps = {
  titleIcon: faBracketsCurly,
  disabledFields: [],
  allowIncompleteItems: false,
  nameMaxLength: 50
};

export default ProtocolsSelectInputBase;