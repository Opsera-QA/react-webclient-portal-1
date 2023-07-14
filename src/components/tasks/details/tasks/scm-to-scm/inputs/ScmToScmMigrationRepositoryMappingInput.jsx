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
import ScmToScmMigrationStandaloneOrganizationSelectInput from "./mapping/ScmToScmMigrationStandaloneOrganizationSelectInput";
import ScmToScmMigrationStandaloneRepositorySelectInput from "./mapping/ScmToScmMigrationStandaloneRepositorySelectInput";
import InfoOverlayIcon from "components/common/icons/info/InfoOverlayIcon";
import StandaloneTextInputBase from "components/common/inputs/text/standalone/StandaloneTextInputBase";

function ScmToScmMigrationRepositoryMappingInput({
  model,
  setModel,
  fieldName,
  disabledFields,
  type,
  allowIncompleteItems,
  regexValidationRequired,
  disabled,
  sourceScmType,
  sourceGitToolId,
  sourceWorkspace,
  targetScmType,
  targetGitToolId,
}) {
  const [field] = useState(model.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [properties, setProperties] = useState([]);
  const [selectedRepositories, setSelectedRepositories] = useState([]);
  const [sourceRepoName, setSourceRepoName] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [targetOrgName, setTargetOrgName] = useState("");
  const [targetRepoName, setTargetRepoName] = useState("");
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const { getAccessToken } = useContext(AuthContext);
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
  }, [
    sourceScmType,
    sourceGitToolId,
    sourceWorkspace,
    targetScmType,
    targetGitToolId,
  ]);

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
      setSelectedRepositories(items.map(item => item["repositoryName"]));
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
    setSelectedRepositories(newPropertyList.map(item => item["repositoryName"]));
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
          property["targetOrgName"] === "" ||
          property["sourceRepoName"] === ""
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

    if (sourceRepoName == "" || targetOrgName == "" || targetRepoName == "") {
      setErrorMessage("Source Repository, Target Organization & Target Repository are mandatory");
      return;
    }

    if (properties.length + 1 > field.maxItems) {
      setErrorMessage(`You have reached the maximum allowed number of ${type}. Please remove one to add another.`);
      return;
    }

    for (let item in properties) {      
      if (Object.values(properties[item]).includes(sourceRepoName)) {
        setErrorMessage("Existing Repositories can not be added again");
        return;
      }
    }
    setProperties([
      ...properties,
      {        
        sourceRepoName,
        repoUrl,
        targetOrgName,
        targetRepoName,
      },
    ]);
    setSelectedRepositories([...selectedRepositories, sourceRepoName]);
    setSourceRepoName("");
    setRepoUrl("");
    setTargetOrgName("");
    setTargetRepoName("");
  };

  const deleteProperty = (index) => {
    setErrorMessage("");
    let newPropertyList = properties;
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  const handleRepositorySelection = (data) => {
    setSourceRepoName(data.repository);
    setRepoUrl(data.gitUrl);
    setTargetRepoName(data?.nameSpacedPath?.substring(data?.nameSpacedPath?.lastIndexOf("/")+1));
  };

  const getInputRow = () => {
    return (
      <div className="p-2">
        <Row>
          <Col sm={11}>
            <Row>
              <Col sm={4}>
                <ScmToScmMigrationStandaloneRepositorySelectInput              
                  setDataFunction={handleRepositorySelection}
                  value={sourceRepoName}
                  service={sourceScmType}
                  gitToolId={sourceGitToolId}
                  workspace={sourceWorkspace}
                  selectedRepositories={selectedRepositories}
                  setErrorMessage={setErrorMessage}
                />            
              </Col>
              <Col sm={4}>
                <ScmToScmMigrationStandaloneOrganizationSelectInput              
                  setDataFunction={setTargetOrgName}
                  value={targetOrgName}
                  service={targetScmType}
                  gitToolId={targetGitToolId}
                  setErrorMessage={setErrorMessage}
                />
              </Col>
              <Col sm={4}>
                <StandaloneTextInputBase
                  value={targetRepoName}
                  setDataFunction={setTargetRepoName}
                  placeholderText={"Target Repository Name"}
                  disabled={!sourceRepoName}
                />
              </Col>
            </Row>
          </Col>
          <Col sm={1}>
            <Button
              size="sm"
              className="input-button w-100"
              variant="success"
              disabled={
                !allowIncompleteItems &&
                (!targetOrgName ||
                  targetOrgName.length === 0 ||                  
                  !sourceRepoName ||
                  sourceRepoName.length === 0 ||
                  !targetRepoName ||
                  targetRepoName.length === 0)
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
            <Col sm={4} className={"pl-2 pr-0 force-text-wrap"}>
              {property["sourceRepoName"]}
            </Col>
            <Col sm={4} className={"pl-2 pr-0 force-text-wrap"}>
              {property["targetOrgName"]}
            </Col>
            <Col sm={4} className={"pl-2 pr-0 force-text-wrap"}>
              {property["targetRepoName"]}
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
            <Col sm={4} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Source Repository</span>
            </Col>
            <Col sm={4} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Target Organization</span>
            </Col>
            <Col sm={4} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Target Repository</span>
            </Col>            
          </Row>
        </Col>
      </div>
    );
  };

  const getHelpText = () => {
    return (
      <InfoOverlayIcon 
        infoOverlay={"This input helps users map Source Repository with Target Organization and Target Repository"}
        title={"Repository Mapping"}
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
          Repository Mapping
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

ScmToScmMigrationRepositoryMappingInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabledFields: PropTypes.array,
  fieldName: PropTypes.string,
  type: PropTypes.string,
  allowIncompleteItems: PropTypes.bool,
  regexValidationRequired: PropTypes.bool,
  disabled: PropTypes.bool,
};

ScmToScmMigrationRepositoryMappingInput.defaultProps = {
  disabledFields: [],
  allowIncompleteItems: false,
  disabled: false,
};

export default ScmToScmMigrationRepositoryMappingInput;
