import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import PipelineMappingEnvironmentInputRow
  from "components/common/metrics/pipeline_mapper/environments/PipelineMappingEnvironmentInputRow";
import {hasStringValue} from "components/common/helpers/string-helpers";

function PipelineMappingEnvironmentInput({ fieldName, model, setModel, disabled}) {
  const [field] = useState(model.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [environments, setEnvironments] = useState([]);

  useEffect(() => {
    const environments = model?.getData(fieldName);

    if (Array.isArray(environments)) {
      setEnvironments(environments);
    }
  }, [model]);

  const validateAndSetData = (environments) => {
    setEnvironments([...environments]);
    let newDataObject = {...model};

    if (environments.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of configuration items. Please remove one to add another.");
      return;
    }

    let newObject = {};

    if (environments && environments.length > 0) {
      environments.map((item) => {
        if (hasStringValue(item.key) === true && hasStringValue(item.value) === true) {
          newObject[item.name] = item.value;
        }
      });
    }

    newDataObject.setData(fieldName, {...newObject});
    setModel({...newDataObject});
  };

  const addEnvironment = () => {
    const newEnvironmentList = environments;

    if (lastEnvironmentComplete() !== true) {
      return;
    }

    let newRow = {
      key: "",
      value: "",
    };

    newEnvironmentList.push(newRow);
    validateAndSetData(newEnvironmentList);
  };

  const deleteEnvironmentFunction = (index) => {
    let newPropertyList = environments;
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  // Are there allowed and not characters for key or value
  const setEnvironmentValueFunction = (index, newValue) => {
    let newPropertyList = environments;

    if (newPropertyList[index]["value"] !== newValue) {
      newPropertyList[index]["value"] = newValue;
      validateAndSetData(newPropertyList);
    }
  };

  // Are there allowed and not characters for key or value
  const setEnvironmentKeyFunction = (index, newValue) => {
    let newPropertyList = environments;

    if (newPropertyList[index]["key"] !== newValue) {
      newPropertyList[index]["key"] = newValue;
      validateAndSetData(newPropertyList);
    }
  };

  const getHeaderBar = () => {
    return (
      <Row className="d-flex py-1 mx-0 justify-content-between">
        <Col sm={11} className={"my-auto"}>
          <Row>
            <Col xs={6}>
              Key
            </Col>
            <Col xs={6}>
              Value
            </Col>
          </Row>
        </Col>
        <Col sm={1} />
      </Row>
    );
  };

  const getFieldBody = () => {
    if (!environments || environments.length === 0) {
      return (
        <div className="rules-input">
          <div className="text-muted text-center no-data-message">No environments have been added</div>
        </div>
      );
    }

    return (
      <div>
        {environments.map((environment, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
              <PipelineMappingEnvironmentInputRow
                accessRule={environment}
                disabled={disabled}
                deleteEnvironmentFunction={() => deleteEnvironmentFunction(index)}
                setKeyFunction={(value) => setEnvironmentKeyFunction(index, value)}
                setValueFunction={(value) => setEnvironmentValueFunction(index, value)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const isEnvironmentComplete = (environment) => {
    return hasStringValue(environment?.key) === true && hasStringValue(environment?.value) === true;
  };

  const lastEnvironmentComplete = () => {
    let newPropertyList = environments;

    if (newPropertyList.length === 0) {
      return true;
    }

    let lastObject = newPropertyList[newPropertyList.length - 1];
    return isEnvironmentComplete(lastObject);
  };

  const getIncompletePropertyMessage = () => {
    if (!lastEnvironmentComplete()) {
      return (`Incomplete Environments Will Be Removed Before Saving`);
    }
  };

  if (field == null) {
    return <></>;
  }

  return (
    <PropertyInputContainer
      titleIcon={faBracketsCurly} // Todo: pick better icon
      field={field}
      addProperty={addEnvironment}
      titleText={"Environments"}
      errorMessage={errorMessage}
      addAllowed={lastEnvironmentComplete()}
      type={"environment"}
      incompleteRowMessage={getIncompletePropertyMessage()}
    >
      <div className={"filter-bg-white"}>
        {getHeaderBar()}
      </div>
      {getFieldBody()}
    </PropertyInputContainer>
  );
}

PipelineMappingEnvironmentInput.propTypes = {
  setModel: PropTypes.func,
  model: PropTypes.object,
  fields: PropTypes.array,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool
};

export default PipelineMappingEnvironmentInput;