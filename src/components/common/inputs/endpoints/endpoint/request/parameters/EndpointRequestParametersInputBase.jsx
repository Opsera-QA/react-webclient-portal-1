import React, { useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {faFilter} from "@fortawesome/pro-light-svg-icons";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import EndpointRequestParameterInputRow
  from "components/common/inputs/endpoints/endpoint/request/parameters/parameter/EndpointRequestParameterInputRow";

function EndpointRequestParametersInputBase(
  {
    fieldName,
    model,
    setModel,
    parameterFields,
    disabled,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));
  const [parameters, setParameters] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    if (Array.isArray(parameterFields)) {
      loadData();
    }

    return () => {
      isMounted.current = false;
    };
  }, [parameterFields]);

  const loadData = () => {
    const currentData = model?.getObjectData(fieldName);
    const unpackedParameters = [];

    parameterFields.forEach((parameter) => {
      const fieldName = parameter?.fieldName;
      const value = parseObjectValue(parameter.type, currentData[fieldName]);

      unpackedParameters.push({
        ...parameter,
        value: value,
      });
    });

    setParameters([...unpackedParameters]);
  };

  // TODO: Wire up constants
  const parseObjectValue = (type, value) => {
    switch (type) {
      case "string":
        return typeof value === "string" ? value : "";
      case "array":
        return Array.isArray(value) ? value : [];
    }
  };

  const validateAndSetData = (newParameters) => {
    setParameters([...newParameters]);
    const newModel = {...model};
    const constructedParameterObject = {};

    newParameters.forEach((parameter) => {
      const fieldName = parameter?.fieldName;
      const value = parameter?.value;

      constructedParameterObject[fieldName] = parseObjectValue(parameter?.type, value);
    });

    console.log("constructedParameterObject: " + JSON.stringify(constructedParameterObject));
    newModel.setData(fieldName, constructedParameterObject);
    setModel({...newModel});
  };

  const updateParameterFunction = (index, updatedParameter) => {
    const newParameters = [...parameters];
    newParameters[index] = {...updatedParameter};
    validateAndSetData(newParameters);
  };

  const getFieldBody = () => {
    return (
      <div>
        {parameters.map((fieldData, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
              <EndpointRequestParameterInputRow
                index={index}
                endpointBodyField={fieldData}
                updateParameterFunction={(updatedParameter) => updateParameterFunction(index, updatedParameter)}
                disabled={disabled}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const getHeaderBar = () => {
    return (
      <Row className={"d-flex py-1 justify-content-between"}>
        <Col xs={6} className={"my-auto"}>
          <span className={'ml-3'}>Field Name</span>
        </Col>
        <Col xs={6} className={"my-auto"}>
          <span>Value</span>
        </Col>
      </Row>
    );
  };

  const getBody = () => {
    if (!parameters || parameters?.length === 0) {
      return (
        <div className="text-center">
          <div className="text-muted my-5">There are no Parameters to configure</div>
        </div>
      );
    }

    return (
      <div>
        <div className={"filter-bg-white"}>
          {getHeaderBar()}
        </div>
        <div className="fields-input">
          {getFieldBody()}
        </div>
      </div>
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <div className={"my-2"}>
      <PropertyInputContainer
        titleIcon={faFilter}
        titleText={field?.label}
      >
        {getBody()}
      </PropertyInputContainer>
    </div>
  );
}

EndpointRequestParametersInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  parameterFields: PropTypes.object,
  disabled: PropTypes.bool,
};

export default EndpointRequestParametersInputBase;
