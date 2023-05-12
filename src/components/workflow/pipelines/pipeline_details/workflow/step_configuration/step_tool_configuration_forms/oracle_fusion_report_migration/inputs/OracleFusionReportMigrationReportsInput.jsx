import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faHandshake, faTimes } from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import InfoText from "components/common/inputs/info_text/InfoText";
import IconBase from "components/common/icons/IconBase";
import OracleFusionReportMigrationStandaloneArtifactSelectInput from "./artifact/OracleFusionReportMigrationStandaloneArtifactSelectInput";
import OracleFusionReportMigrationStandaloneArtifactVersionSelectInput from "./artifact/OracleFusionReportMigrationStandaloneArtifactVersionSelectInput";
import InfoOverlayIcon from "components/common/icons/info/InfoOverlayIcon";

function OracleFusionReportMigrationReportsInput({
  model,
  setModel,
  fieldName,
  disabledFields,
  type,
  allowIncompleteItems,
  regexValidationRequired,
  disabled,
}) {
  const [field] = useState(model.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [properties, setProperties] = useState([]);
  const [selectedArtifacts, setSelectedArtifacts] = useState([]);
  const [artifactName, setArtifactName] = useState("");
  const [version, setVersion] = useState("");
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!disabled) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    let newModel = { ...model };
    newModel.setData(fieldName, properties);
    setModel({ ...newModel });
  }, [properties]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let currentData = model?.getData(fieldName);
      let items = Array.isArray(currentData) && currentData.length > 0 ? currentData : [];
      setProperties([...items]);
      setSelectedArtifacts(items.map(item => item["artifactName"]));
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateAndSetData = (newPropertyList) => {
    setProperties([...newPropertyList]);
    setSelectedArtifacts(newPropertyList.map(item => item["artifactName"]));
    let newModel = { ...model };

    if (newPropertyList.length > field.maxItems) {
      setErrorMessage(`You have reached the maximum allowed number of ${type}. Please remove one to add another.`);
      return;
    }

    let newArray = [];

    if (newPropertyList && newPropertyList.length > 0) {
      newPropertyList.map((property) => {
        if (
          allowIncompleteItems !== true ||
          property["version"] === "" ||
          property["artifactName"] === ""
        ) {
          return;
        }
        newArray.push(property);
      });
    }

    newModel.setData(fieldName, newArray);
    setModel({ ...newModel });
  };

  const addProperty = () => {
    setErrorMessage("");

    if (artifactName == "" || version == "") {
      setErrorMessage("Artifact and Artifact Version are mandatory");
      return;
    }

    if (properties.length + 1 > field.maxItems) {
      setErrorMessage(`You have reached the maximum allowed number of ${type}. Please remove one to add another.`);
      return;
    }

    for (let item in properties) {      
      if (Object.values(properties[item]).includes(artifactName)) {
        setErrorMessage("Existing artifacts can not be added again");
        return;
      }
    }
    setProperties([
      ...properties,
      {        
        artifactName,
        version,        
      },
    ]);
    setSelectedArtifacts([...selectedArtifacts, artifactName]);
    setVersion("");
    setArtifactName("");
  };

  const deleteProperty = (index) => {
    setErrorMessage("");
    let newPropertyList = properties;
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  const handleArtifactSelection = (data) => {
    setArtifactName(data);
    setVersion("");
  };

  const getInputRow = () => {
    return (
      <div className="p-2">
        <Row>
          <Col sm={6}>
            <OracleFusionReportMigrationStandaloneArtifactSelectInput              
              setDataFunction={handleArtifactSelection}
              value={artifactName}
              toolId={model.getData("nexusToolConfigId")}
              repositoryName={model.getData("repositoryName")}
              groupName={model.getData("groupName")}
              selectedArtifacts={selectedArtifacts}
            />            
          </Col>
          <Col sm={6}>
            <OracleFusionReportMigrationStandaloneArtifactVersionSelectInput              
              setDataFunction={setVersion}
              value={version}
              toolId={model.getData("nexusToolConfigId")}
              repositoryName={model.getData("repositoryName")}
              groupName={model.getData("groupName")}
              artifactName={artifactName}
            />            
          </Col>
        </Row>        
        <Row className="pt-2">
          <Col sm={10}>            
          </Col>
          <Col sm={2}>
            <Button
              size="sm"
              className="input-button w-100"
              variant="success"
              disabled={
                !allowIncompleteItems &&
                (!version ||
                  version.length === 0 ||                  
                  !artifactName ||
                  artifactName.length === 0)
              }
              onClick={() => {
                addProperty();
              }}
            >
              Add
            </Button>
          </Col>
        </Row>

      </div>
    );
  };

  const getPropertyRow = (property, index) => {
    return (
      <div
        className={`d-flex align-items-center justify-content-between ${index % 2 === 0 ? "even-row" : "odd-row"}`}
        key={index}
      >
        <Col sm={11}>
          <Row>
            <Col sm={6} className={"pl-2 pr-0 force-text-wrap"}>
              {property["artifactName"]}
            </Col>
            <Col sm={6} className={"pl-2 pr-0 force-text-wrap"}>
              {property["version"]}
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
    if (!Array.isArray(properties) || properties.length === 0) {
      return (
        <div className="d-flex h-100 w-100">
          <div className={"mx-auto mt-5"}>
            No Mappings have been added yet.
          </div>
        </div>
      );
    }

    return (
      <div className="flex-fill">
        {properties.map((property, index) => {
          return getPropertyRow(property, index);
        })}
      </div>
    );
  };

  const getDeletePropertyButton = (index) => {
    return (
      <Button variant="link" onClick={() => deleteProperty(index)}>
        <span>
          <IconBase className={"danger-red"} icon={faTimes} />
        </span>
      </Button>
    );
  };

  const getHeaderBar = () => {
    return (
      <div className="d-flex justify-content-between page-description">
        <Col sm={11}>
          <Row>
            <Col sm={6} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Artifact</span>
            </Col>
            <Col sm={6} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Version</span>
            </Col>            
          </Row>
        </Col>
      </div>
    );
  };

  const getHelpText = () => {
    return (
      <InfoOverlayIcon 
        infoOverlay={"This functionality helps users map artifact and artifact versions"}
        title={"Artifact Mapping"}
        className={"mb-2"}
        overlayPlacement={"left"}
        overlayHeight={"100px"}
        overlayWidth={"500px"}
      />
    ); 
  };

  const getTitleBar = () => {
    return (
      <div className="pl-2 pt-2 d-flex justify-content-between">
        <div>
          <IconBase icon={faHandshake} className={"mr-2"} />
          Artifact Report Mapping
        </div>
        {getHelpText()}
      </div>
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <>      
      <div className="object-properties-input content-container-curved-top">
        <div>
          <div className="property-header">
            <h6>{getTitleBar()}</h6>
          </div>
          <div>{properties.length > 0 ? getHeaderBar() : null}</div>
          <div className="properties-body-alt">
            {getFieldBody()}
          </div>
        </div>
        <div className="object-properties-footer">{getInputRow()}</div>
        <InfoText
          model={model}
          fieldName={fieldName}
          field={field}
          errorMessage={errorMessage}
        />
      </div>
    </>    
  );
}

OracleFusionReportMigrationReportsInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabledFields: PropTypes.array,
  fieldName: PropTypes.string,
  type: PropTypes.string,
  allowIncompleteItems: PropTypes.bool,
  regexValidationRequired: PropTypes.bool,
  disabled: PropTypes.bool,
};

OracleFusionReportMigrationReportsInput.defaultProps = {
  disabledFields: [],
  allowIncompleteItems: false,
  disabled: false,
};

export default OracleFusionReportMigrationReportsInput;
