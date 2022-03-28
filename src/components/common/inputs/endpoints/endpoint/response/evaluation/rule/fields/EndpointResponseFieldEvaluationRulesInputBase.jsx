import React, { useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import EndpointResponseRuleFieldInputRow
  from "components/common/inputs/endpoints/endpoint/response/evaluation/rule/fields/EndpointResponseRuleFieldInputRow";
import {dataParsingHelper} from "components/common/helpers/data/dataParsing.helper";
import InfoContainer from "components/common/containers/InfoContainer";

function EndpointResponseFieldEvaluationRulesInputBase(
  {
    fieldName,
    model,
    responseBodyFields,
    setModel,
    disabled,
  }) {
  const [field, setField] = useState(model?.getFieldById(fieldName));
  const [fields, setFields] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    setField(model?.getFieldById(fieldName));
    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [fieldName]);

  const loadData = () => {
    const currentData = model?.getObjectData(fieldName);
    const unpackedFields = [];

    responseBodyFields.forEach((field) => {
      const fieldName = field?.fieldName;
      const value = dataParsingHelper.parseObjectValue(field?.type, currentData[fieldName]);

      unpackedFields.push({
        ...field,
        value: value,
      });
    });

    setFields([...unpackedFields]);
  };

  const validateAndSetData = (newFields) => {
    const newArray = Array.isArray(newFields) ? newFields : [];
    setFields([...newArray]);
    const newModel = {...model};
    newModel.setData(fieldName, [...newArray]);
    setModel({...newModel});
  };

  const updateFieldFunction = (index, field) => {
    const newFields = [...fields];
    newFields[index] = field;
    validateAndSetData(newFields);
  };

  const getBody = () => {
    if (!Array.isArray(fields) || fields?.length === 0) {
      return (
        <div className="text-center">
          <div className="text-muted my-3">
            There are no Response fields configured for this Endpoint.
            Please update the response fields in the Endpoint or select another response evaluation option.
          </div>
        </div>
      );
    }

    return (
      <div>
        {fields.map((fieldData, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "" : "my-3"}>
              <EndpointResponseRuleFieldInputRow
                endpointBodyField={fieldData}
                updateFieldFunction={(newField) => updateFieldFunction(index, newField)}
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
        titleIcon={faBracketsCurly}
        titleText={field?.label}
        titleClassName={"sub-input-title-bar"}
      >
        <div className={"m-3"}>
          {getBody()}
        </div>
      </InfoContainer>
    </div>
  );
}

EndpointResponseFieldEvaluationRulesInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  responseBodyFields: PropTypes.array,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndpointResponseFieldEvaluationRulesInputBase;
