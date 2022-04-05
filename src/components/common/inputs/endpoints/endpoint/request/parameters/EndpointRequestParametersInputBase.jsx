import React, { useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {faCheckCircle, faCode} from "@fortawesome/pro-light-svg-icons";
import EndpointRequestParameterInputRow
  from "components/common/inputs/endpoints/endpoint/request/parameters/parameter/EndpointRequestParameterInputRow";
import InfoContainer from "components/common/containers/InfoContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import {dataParsingHelper} from "components/common/helpers/data/dataParsing.helper";
import ClearDataIcon from "components/common/icons/field/ClearDataIcon";
import {hasStringValue} from "components/common/helpers/string-helpers";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import JsonFieldBase from "components/common/fields/json/JsonFieldBase";

const containerHeight = "calc(100vh - 546px)";

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
  const [activeTab, setActiveTab] = useState("run");

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

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

      // Skip incomplete fields. This shouldn't happen but being as defensive as possible
      if (hasStringValue(fieldName) !== true) {
        return;
      }

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

  const getFieldTab = (parameter, index) => {
    return (
      <VanitySetVerticalTab
        key={index}
        tabText={`${parameter.fieldName}`}
        tabName={parameter.fieldName}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
    );
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer>
        <div className={"tab-tree"}>
          {parameters?.map((fieldData, index) => {
            return (getFieldTab(fieldData, index));
          })}
        </div>
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    if (hasStringValue(activeTab) !== true) {
      return null;
    }

    const index = parameters.findIndex((parameter) => parameter.fieldName === activeTab);

    if (index === -1) {
      return null;
    }

    const fieldData = parameters[index];

    return (
      <EndpointRequestParameterInputRow
        index={index}
        endpointBodyField={fieldData}
        updateParameterFunction={(updatedParameter) => updateParameterFunction(index, updatedParameter)}
        disabled={disabled}
      />
    );
  };

  const getParameterInputContainer = () => {
    if (!Array.isArray(parameters) || parameters?.length === 0) {
      return (
        <InfoContainer
          titleIcon={faCode}
          titleText={field?.label}
          minimumHeight={containerHeight}
          maximumHeight={containerHeight}
        >
          <CenteredContentWrapper>
            <span>There are no Parameters to configure</span>
          </CenteredContentWrapper>
        </InfoContainer>
      );
    }

    return (
      <VanitySetTabAndViewContainer
        icon={faCode}
        title={field?.label}
        minimumHeight={containerHeight}
        maximumHeight={containerHeight}
        verticalTabContainer={getVerticalTabContainer()}
        currentView={getCurrentView()}
        tabColumnSize={3}
      />
    );
  };

  const resetDataToDefault = () => {
    const resetFields = Array.isArray(parameterFields) ? parameterFields : [];
    validateAndSetData([...resetFields]);
  };

  const getRightSideButton = () => {
    return (
        <ClearDataIcon
          clearValueFunction={resetDataToDefault}
          className={"my-auto mr-1"}
        />
    );
  };

  const getConstructedParameterContainer = () => {
    return (
      <InfoContainer
        titleIcon={faCheckCircle}
        titleText={`Constructed ${model?.getLabel(fieldName)}`}
        className={"h-100"}
        minimumHeight={containerHeight}
        maximumHeight={containerHeight}
        titleRightSideButton={getRightSideButton()}
      >
        <div className={"m-3"}>
          <JsonFieldBase
            className={"h-100 mb-2"}
            json={model?.getData(fieldName)}
          />
          <div className={"mt-auto"}>
            <InfoText
              customMessage={`
                 Please Note: Until updated and saved, 
                 this will include all previously saved fields.
               `}
            />
          </div>
        </div>
      </InfoContainer>
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <div className={"mt-2"}>
      <Row>
        <Col xs={8} className={"pr-2"}>
          {getParameterInputContainer()}
        </Col>
        <Col xs={4} className={"pl-0"}>
          {getConstructedParameterContainer()}
        </Col>
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
