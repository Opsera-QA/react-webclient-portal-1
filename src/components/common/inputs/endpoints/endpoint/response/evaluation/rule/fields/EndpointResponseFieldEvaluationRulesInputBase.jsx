import React, { useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import EndpointResponseRuleFieldInputRow
  from "components/common/inputs/endpoints/endpoint/response/evaluation/rule/fields/EndpointResponseRuleFieldInputRow";
import {dataParsingHelper} from "components/common/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";

const height = "calc(100vh - 555px)";

function EndpointResponseFieldEvaluationRulesInputBase(
  {
    fieldName,
    model,
    responseBodyFields,
    setDataFunction,
    disabled,
  }) {
  const [field, setField] = useState(model?.getFieldById(fieldName));
  const [fields, setFields] = useState([]);
  const isMounted = useRef(false);
  const [activeTab, setActiveTab] = useState(undefined);
  const [currentFieldData, setCurrentFieldData] = useState(undefined);

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
      const newFieldData = fields[newTab];
      setCurrentFieldData({...newFieldData});
    }
  };

  useEffect(() => {
    isMounted.current = true;
    setField(model?.getFieldById(fieldName));

    return () => {
      isMounted.current = false;
    };
  }, [fieldName]);

  useEffect(() => {
    setFields([]);

    if (Array.isArray(responseBodyFields)) {
      loadData();
    }
  }, [responseBodyFields]);

  const loadData = () => {
    const currentData = model?.getArrayData(fieldName);
    const unpackedFields = [];
    let requiresUpdate = false;

    responseBodyFields?.forEach((field) => {
      const newField = {...field};
      const fieldName = field?.fieldName;

      // Skip incomplete fields. This shouldn't happen but being as defensive as possible
      if (hasStringValue(fieldName) !== true) {
        return;
      }

      const foundItem = currentData.find((field) => field?.fieldName === fieldName);
      newField.value = dataParsingHelper.parseObjectValue(field?.type, foundItem?.value);
      const filter = foundItem?.filter;

      if (hasStringValue(filter) === true) {
        newField.filter = filter;
      }
      else {
        newField.filter = "is_not_null";
        requiresUpdate = true;
      }

      unpackedFields.push(newField);
    });

    if (requiresUpdate === true) {
      validateAndSetData(unpackedFields);
      return;
    }

    if (activeTab == null && Array.isArray(unpackedFields) && unpackedFields.length > 0) {
      setActiveTab('0');
      setCurrentFieldData(unpackedFields[0]);
    }

    setFields([...unpackedFields]);
  };

  const validateAndSetData = (newFields) => {
    const newArray = Array.isArray(newFields) ? newFields : [];
    setDataFunction(newArray);
  };

  const updateFieldFunction = (index, field) => {
    const newFields = [...fields];
    newFields[index] = field;
    validateAndSetData(newFields);
  };

  const getFieldTab = (field, index) => {
    return (
      <VanitySetVerticalTab
        key={index}
        tabText={hasStringValue(field.fieldName) ? field.fieldName : `No Field Name`}
        tabName={`${index}`}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
    );
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer>
        {fields?.map((fieldData, index) => {
          return getFieldTab(fieldData, index);
        })}
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    if (currentFieldData) {
      return (
        <EndpointResponseRuleFieldInputRow
          endpointBodyField={currentFieldData}
          updateFieldFunction={(newField) => updateFieldFunction(parseInt(activeTab), newField)}
          disabled={disabled}
        />
      );
    }
  };


  const getBody = () => {
    if (!Array.isArray(fields) || fields?.length === 0) {
      return (
        <CenteredContentWrapper>
          <span>
            There are no Response fields configured for this Endpoint.
            Please update the response fields in the Endpoint or select another response evaluation option.
          </span>
        </CenteredContentWrapper>
      );
    }

    return (
      <VanitySetTabAndViewContainer
        title={field?.label}
        icon={faBracketsCurly}
        verticalTabContainer={getVerticalTabContainer()}
        currentView={getCurrentView()}
        minimumHeight={height}
        maximumHeight={height}
        tabColumnSize={3}
      />
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <div className={"mt-2"}>
      {getBody()}
    </div>
  );
}

EndpointResponseFieldEvaluationRulesInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setDataFunction: PropTypes.func,
  responseBodyFields: PropTypes.array,
  disabled: PropTypes.bool,
};

export default EndpointResponseFieldEvaluationRulesInputBase;
