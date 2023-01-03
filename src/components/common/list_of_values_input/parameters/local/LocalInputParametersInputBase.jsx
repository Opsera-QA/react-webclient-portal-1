import React, {useState} from "react";
import PropTypes from "prop-types";
import {faBracketsCurly, faTimes} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InfoContainer from "components/common/containers/InfoContainer";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import LocalInputParametersInputRow
  from "components/common/list_of_values_input/parameters/local/LocalInputParametersInputRow";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";

export default function LocalInputParametersInputBase(
  {
    model,
    setModel,
    fieldName,
    titleIcon,
    customTitle,
    disabled,
  }) {
  const field = model.getFieldById(fieldName);
  const titleText = hasStringValue(customTitle) === true ? customTitle : field?.label;
  const [errorMessage, setErrorMessage] = useState("");

  const validateAndSetData = (updatedData) => {
    const newArray = [];
    const parsedUpdatedData = DataParsingHelper.parseArray(updatedData, []);

    if (parsedUpdatedData.length > field.maxItems) {
      setErrorMessage(`You have reached the maximum allowed number of Local Input Parameters. Please remove one to add another.`);
      return false;
    }

    parsedUpdatedData.forEach((parameter) => {
      if (parameter?.name !== "" && parameter?.value !== "") {
        newArray.push({
          name: parameter?.name,
          value: parameter?.value,
        });
      }
    });

    model.setData(fieldName, newArray);
    setModel({...model});
    return true;
  };

  const addPropertyFunction = (newParameter) => {
    setErrorMessage("");
    const currentData = model?.getArrayData(fieldName);

    if (currentData.length + 1 > field.maxItems) {
      setErrorMessage(`You have reached the maximum allowed number of Local Input Parameters. Please remove one to add another.`);
      return false;
    }

    const parameterName = newParameter?.name;
    const foundParameter = currentData.find((parameter) => parameter?.name === parameterName);

    if (foundParameter) {
      setErrorMessage("Existing Local Input Parameters can not be added again");
      return false;
    }

    currentData.push(newParameter);
    return validateAndSetData(currentData);
  };

  const deletePropertyFunction = (index) => {
    setErrorMessage("");
    const currentData = model?.getArrayData(fieldName);
    currentData.splice(index, 1);
    validateAndSetData(currentData);
  };

  const getPropertyRow = (property, index) => {
    return (
      <div
        className={`d-flex align-items-center justify-content-between ${index % 2 === 0 ? "even-row" : "odd-row"}`}
        key={index}
      >
        <Col sm={11}>
          <Row>
            <Col sm={6} className={"pl-2 pr-0"}>
              {property?.name}
            </Col>
            <Col sm={6} className={"pl-2 pr-0"}>
              {property?.value}
            </Col>
          </Row>
        </Col>
        <Col sm={1} className={"pr-3 pl-0 delete-button"}>
          <VanityButtonBase
            variant={"link"}
            onClickFunction={() => deletePropertyFunction(index)}
            icon={faTimes}
            iconClassName={"danger-red"}
          />
        </Col>
      </div>
    );
  };

  const getFieldBody = () => {
    const data = DataParsingHelper.parseArray(model?.getArrayData(fieldName), []);
    return (
      <>
        <div className="flex-fill">
          {data.map((property, index) => {
              return getPropertyRow(property, index);
            }
          )}
        </div>
      </>
    );
  };

  const getHeaderBar = () => {
    return (
      <div className={"page-description"}>
        <Col sm={11}>
          <Row>
            <Col sm={6} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Local Parameter Name</span>
            </Col>
            <Col sm={6} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Value</span>
            </Col>
          </Row>
        </Col>
      </div>
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer>
      <InfoContainer
        titleIcon={titleIcon}
        titleText={titleText}
      >
        {getHeaderBar()}
        <div className={"properties-body-alt"}>
          {getFieldBody()}
        </div>
        <LocalInputParametersInputRow
          disabled={disabled}
          addPropertyFunction={addPropertyFunction}
          className={"m-3"}
        />
      </InfoContainer>
      <InfoText
        model={model}
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage}
      />
    </InputContainer>
  );
}

LocalInputParametersInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  titleIcon: PropTypes.object,
  customTitle: PropTypes.string,
};

LocalInputParametersInputBase.defaultProps = {
  titleIcon: faBracketsCurly,
};
