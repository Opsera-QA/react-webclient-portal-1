import React, { useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {faCode} from "@fortawesome/pro-light-svg-icons";
import EndpointRequestParameterInputRow
  from "components/common/inputs/endpoints/endpoint/request/parameters/parameter/EndpointRequestParameterInputRow";
import InfoContainer from "components/common/containers/InfoContainer";

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

    newModel.setData(fieldName, constructedParameterObject);
    setModel({...newModel});
  };

  const updateParameterFunction = (index, updatedParameter) => {
    const newParameters = [...parameters];
    newParameters[index] = {...updatedParameter};
    validateAndSetData(newParameters);
  };

  const getBody = () => {
    if (!Array.isArray(parameters) || parameters?.length === 0) {
      return (
        <div className="text-center">
          <div className="text-muted my-5">There are no Parameters to configure</div>
        </div>
      );
    }

    return (
      <div className={"m-3"}>
        {parameters.map((fieldData, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "" : "my-2"}>
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

  if (field == null) {
    return null;
  }

  return (
    <div className={"my-2"}>
      <InfoContainer
        titleIcon={faCode}
        titleText={field?.label}
      >
        {getBody()}
      </InfoContainer>
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
