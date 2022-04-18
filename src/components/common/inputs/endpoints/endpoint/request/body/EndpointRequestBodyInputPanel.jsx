import React, { useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import {endpointRequestFieldMetadata} from "components/common/inputs/endpoints/endpoint/request/body/endpointRequestField.metadata";
import EndpointRequestBodyFieldInputRow from "components/common/inputs/endpoints/endpoint/request/body/EndpointRequestBodyFieldInputRow";
import {hasStringValue} from "components/common/helpers/string-helpers";
import InfoText from "components/common/inputs/info_text/InfoText";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import InfoContainer from "components/common/containers/InfoContainer";
import {
  EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS
} from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpointInput.heights";

function EndpointRequestBodyInputPanel(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const [field, setField] = useState(model?.getFieldById(fieldName));
  const [error, setError] = useState("");
  const [fields, setFields] = useState([]);
  const isMounted = useRef(false);
  const [activeTab, setActiveTab] = useState(`0`);

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  useEffect(() => {
    isMounted.current = true;

    setField(model?.getFieldById(fieldName));
    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [fieldName]);

  const loadData = () => {
    const currentData = model?.getData(fieldName);
    const items = Array.isArray(currentData) ? currentData : [];
    setFields([...items]);
  };

  const validateAndSetData = (newFields) => {
    const newArray = Array.isArray(newFields) ? newFields : [];

    if (newArray.length > field.maxItems) {
      setError("You have reached the maximum allowed number of values. Please remove one to add another.");
      return;
    }

    setFields([...newFields]);
    const duplicateName = hasDuplicateNames(newFields);

    if (hasStringValue(duplicateName) === true) {
      setError(`The field name ${duplicateName} is a duplicate. Please make field names unique or unexpected issues will occur.`);
      return;
    }

    const parsedFields = [];

    if (Array.isArray(newArray) && newArray.length > 0) {
      newArray.forEach((endpointField) => {
        const fieldComplete = isFieldComplete(endpointField);

        if (fieldComplete === true) {
          parsedFields.push(endpointField);
        }
      });
    }

    setError("");
    const newModel = {...model};
    newModel.setData(fieldName, [...parsedFields]);
    setModel({...newModel});
  };

  const hasDuplicateNames = (newFields) => {
    if (!Array.isArray(newFields) || newFields.length === 0) {
      return false;
    }

    const fieldNames = newFields.map((field) => field.fieldName);
    let duplicate;

    fieldNames.forEach((fieldName, index) => {
      if (duplicate == null && fieldNames.indexOf(fieldName) !== index) {
        duplicate = fieldName;
      }
    });

    return duplicate;
  };

  const updateFieldFunction = (index, field) => {
    const newFields = [...fields];
    newFields[index] = field;
    validateAndSetData(newFields);
  };

  const addField = () => {
    const newFields = fields;
    const newField = {...endpointRequestFieldMetadata.newObjectFields};
    newField.fieldName = `field${fields.length + 1}`;
    newFields.push(newField);
    loadData();
    validateAndSetData(newFields);
    setActiveTab(`${newFields.length - 1}`);
  };

  const deleteFieldFunction = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    loadData();
    validateAndSetData(newFields);

    if (index !== 0) {
      setActiveTab(`${index - 1}`);
    }
  };

  const getFieldTab = (parameter, index) => {
    return (
      <VanitySetVerticalTab
        key={index}
        tabText={hasStringValue(parameter.fieldName) ? parameter.fieldName : `No Field Name`}
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
    if (hasStringValue(activeTab) !== true) {
      return null;
    }

    const index =  parseInt(activeTab);

    if (typeof index !== "number" || !Array.isArray(fields) || fields.length <= index) {
      return null;
    }

    const fieldData = fields[index];

    if (fieldData) {
      return (
        <EndpointRequestBodyFieldInputRow
          index={index}
          deleteFieldFunction={() => deleteFieldFunction(index)}
          endpointBodyField={fieldData}
          updateFieldFunction={(newField) => updateFieldFunction(index, newField)}
          disabled={disabled}
        />
      );
    }
  };

  const getAddFieldButton = () => {
    return (
      <ButtonContainerBase
        leftSideButtons={
          <div className={"mt-auto mr-2"}>
            <InfoText
              customMessage={getInfoText()}
              errorMessage={getErrorText()}
            />
          </div>
        }
      >
        <NewRecordButton
          variant={"success"}
          disabled={isAddAllowed() !== true}
          addRecordFunction={addField}
          type={"Field"}
          customButtonText={"Add Field"}
          size={"sm"}
        />
      </ButtonContainerBase>
    );
  };

  const getBody = () => {
    if (!Array.isArray(fields) || fields.length === 0) {
      return (
        <InfoContainer
          titleText={field?.label}
          titleIcon={faBracketsCurly}
          minimumHeight={EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.ENDPOINT_REQUEST_BODY_INPUT_HEIGHT}
          maximumHeight={EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.ENDPOINT_REQUEST_BODY_INPUT_HEIGHT}
          titleRightSideButton={getAddFieldButton()}
        >
          <CenteredContentWrapper>
            <div className={"mt-5"}>No fields have been added</div>
          </CenteredContentWrapper>
        </InfoContainer>
      );
    }

    return (
      <div>
        <VanitySetTabAndViewContainer
          title={field?.label}
          icon={faBracketsCurly}
          verticalTabContainer={getVerticalTabContainer()}
          currentView={getCurrentView()}
          minimumHeight={EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.ENDPOINT_REQUEST_BODY_INPUT_HEIGHT}
          maximumHeight={EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.ENDPOINT_REQUEST_BODY_INPUT_HEIGHT}
          tabColumnSize={3}
          titleRightSideButton={getAddFieldButton()}
        />
      </div>
    );
  };

  const isFieldComplete = (field) => {
    return (
      hasStringValue(field?.fieldName) === true
      && hasStringValue(field?.type) === true
    );
  };

  const getFirstIncompleteFieldIndex = () => {
    if (fields.length === 0) {
      return null;
    }

    let incompleteIndex;

    fields.forEach((field, index) => {
      if (incompleteIndex !== undefined) {
        return;
      }

      const fieldComplete = isFieldComplete(field);

      if (fieldComplete !== true) {
        incompleteIndex = index;
      }
    });

    return incompleteIndex;
  };


  const isAddAllowed = () => {
    if (!Array.isArray(fields) || fields?.length >= field.maxItems) {
      return false;
    }

    const duplicateName = hasDuplicateNames(fields);
    const incompleteFieldIndex = getFirstIncompleteFieldIndex();
    return typeof incompleteFieldIndex !== "number" && hasStringValue(duplicateName) === false;
  };

  const getInfoText = () => {
    if (fields.length >= field.maxItems) {
      return "You have reached the maximum allowed number of fields. Please remove one to add another.";
    }
  };

  const getErrorText = () => {
    const incompleteFieldIndex = getFirstIncompleteFieldIndex();

    if (typeof incompleteFieldIndex === "number") {
      return (`Field ${incompleteFieldIndex + 1} is incomplete. Fields must include a name and type.`);
    }

    if (hasStringValue(error) === true) {
      return error;
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <div className={"m-3"}>
      {getBody()}
    </div>
  );
}

EndpointRequestBodyInputPanel.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndpointRequestBodyInputPanel;
