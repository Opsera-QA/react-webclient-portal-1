import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import PipelineMappingEnvironmentInputRow
  from "components/common/metrics/mock_pipeline/environments/PipelineMappingEnvironmentInputRow";
import {hasStringValue} from "components/common/helpers/string-helpers";

function PipelineMappingEnvironmentInput({ fieldName, model, setModel, disabled}) {
  const [field] = useState(model?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [environments, setEnvironments] = useState([]);

  useEffect(() => {
    if (model) {
      const unpackedEnvironments = model?.getData(fieldName);

      if (Array.isArray(unpackedEnvironments) && unpackedEnvironments.length > 0) {
        setEnvironments(unpackedEnvironments);
      } else {
        addEnvironment();
      }
    }
  }, []);

  const validateAndSetData = (environments) => {
    if (!Array.isArray(environments)) {
      return;
    }

    setEnvironments([...environments]);
    const newModel = {...model};

    if (environments?.length > field?.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of configuration items. Please remove one to add another.");
      return;
    }

    const validatedEnvironments = [];

    if (environments.length > 0) {
      environments.map((environment) => {
        if (isEnvironmentComplete(environment)) {
          validatedEnvironments.push(environment);
        }
      });
    }

    newModel.setData(fieldName, validatedEnvironments);
    setModel({...newModel});
  };

  const addEnvironment = () => {
    const newEnvironmentList = environments;

    if (lastEnvironmentComplete() !== true) {
      return;
    }

    const newRow = {
      key: "",
      value: "",
    };

    newEnvironmentList.push(newRow);
    validateAndSetData(newEnvironmentList);
  };

  const deleteEnvironmentFunction = (index) => {
    let newEnvironmentList = environments;
    newEnvironmentList.splice(index, 1);
    validateAndSetData(newEnvironmentList);
  };

  // Are there allowed and not characters for key or value
  const setEnvironmentValueFunction = (index, newValue) => {
    let newEnvironmentList = environments;

    if (newEnvironmentList[index]["value"] !== newValue) {
      newEnvironmentList[index]["value"] = newValue;
      validateAndSetData(newEnvironmentList);
    }
  };

  // Are there allowed and not characters for key or value
  const setEnvironmentKeyFunction = (index, newValue) => {
    let newEnvironmentList = environments;

    if (newEnvironmentList[index]["key"] !== newValue) {
      newEnvironmentList[index]["key"] = newValue;
      validateAndSetData(newEnvironmentList);
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
    if (!Array.isArray(environments) || environments.length === 0) {
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
                environment={environment}
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
    if (environments.length === 0) {
      return true;
    }

    return isEnvironmentComplete(environments.lastItem);
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