import React, { useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {faCheckCircle, faCode} from "@fortawesome/pro-light-svg-icons";
import EndpointRequestParameterInputRow
  from "components/common/inputs/endpoints/endpoint/request/parameters/parameter/EndpointRequestParameterInputRow";
import InfoContainer from "components/common/containers/InfoContainer";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import InfoText from "components/common/inputs/info_text/InfoText";
import {dataParsingHelper} from "components/common/helpers/data/dataParsing.helper";
import ClearDataIcon from "components/common/icons/field/ClearDataIcon";

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
    setParameters([]);

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
      const value = dataParsingHelper.parseObjectValue(parameter.type, currentData[fieldName]);

      unpackedParameters.push({
        ...parameter,
        value: value,
      });
    });

    setParameters([...unpackedParameters]);
  };

  const validateAndSetData = (newParameters) => {
    setParameters([...newParameters]);
    const newModel = {...model};
    const constructedParameterObject = {};

    newParameters.forEach((parameter) => {
      const fieldName = parameter?.fieldName;
      const value = parameter?.value;

      constructedParameterObject[fieldName] = dataParsingHelper.parseObjectValue(parameter?.type, value);
    });

    newModel.setData(fieldName, constructedParameterObject);
    setModel({...newModel});
  };

  const updateParameterFunction = (index, updatedParameter) => {
    const newParameters = [...parameters];
    newParameters[index] = {...updatedParameter};
    validateAndSetData(newParameters);
  };

  const getParameterBody = () => {
    if (!Array.isArray(parameters) || parameters?.length === 0) {
      return (
        <div className="text-center">
          <div className="text-muted my-5">There are no Parameters to configure</div>
        </div>
      );
    }

    return (
      <div>
        {parameters?.map((fieldData, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "" : "my-3"}>
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

  const getParameterInputContainer = () => {
    return (
      <Col xs={8}>
        <InfoContainer
          titleClassName={"sub-input-title-bar"}
          titleIcon={faCode}
          titleText={field?.label}
        >
          <div className={"m-3"}>
            {getParameterBody()}
          </div>
        </InfoContainer>
      </Col>
    );
  };

  const resetDataToDefault = () => {
    const resetFields = Array.isArray(parameterFields) ? parameterFields : [];
    validateAndSetData([...resetFields]);
  };

  const getConstructedParameterContainer = () => {
    return (
      <Col xs={4}>
        <InfoContainer
          titleClassName={"sub-input-title-bar"}
          titleIcon={faCheckCircle}
          titleText={`Constructed ${model?.getLabel(fieldName)}`}
          className={"h-100"}
        >
          <div className={"mx-3 mb-3"}>
            <div className={"d-flex justify-content-end"}>
              <ClearDataIcon
                clearValueFunction={resetDataToDefault}
                className={"my-2"}
              />
            </div>
            <StandaloneJsonField
              className={"h-100 mb-2"}
              model={model}
              fieldName={fieldName}
            />
            <InfoText
              customMessage={`
                  Please Note: Until updated and saved, 
                  this will include all previously saved fields.
                `}
            />
          </div>
        </InfoContainer>
      </Col>
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <div className={"my-2"}>
      <Row>
        {getParameterInputContainer()}
        {getConstructedParameterContainer()}
      </Row>
    </div>
  );
}

EndpointRequestParametersInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  parameterFields: PropTypes.array,
  disabled: PropTypes.bool,
};

export default EndpointRequestParametersInputBase;
