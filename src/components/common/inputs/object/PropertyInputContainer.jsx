import React from "react";
import PropTypes from "prop-types";
import InfoText from "components/common/inputs/info_text/InfoText";
import Row from "react-bootstrap/Row";
import {Button} from "react-bootstrap";
import {faExclamationTriangle, faPlus} from "@fortawesome/pro-light-svg-icons";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import IconBase from "components/common/icons/IconBase";

function PropertyInputContainer(
  {
    children,
    isLoading,
    titleIcon,
    titleText,
    field,
    errorMessage,
    addProperty,
    type,
    addAllowed,
    helpComponent,
    incompleteRowMessage,
    model,
  }) {
  const getAddPropertyButton = () => {
    if (addProperty) {
      return (
        <div className="ml-auto m-2 d-flex">
          <Button variant="secondary" disabled={!addAllowed} onClick={() => addProperty()} size="sm">
            <span className="text-white"><IconBase className={"text-white mr-2"} icon={faPlus} />Add {type}</span>
          </Button>
        </div>
      );
    }
  };

  const getIncompleteRowBlock = () => {
    if (incompleteRowMessage != null) {
      return (
        <div className="w-100 m-2 text-muted small">
          <IconBase className={"text-warning mr-1"} icon={faExclamationTriangle}/>
          <span className="mt-1">{incompleteRowMessage}</span>
        </div>
      );
    }
  };

  return (
    <div className="object-properties-input">
      <div className="content-container">
        <InputTitleBar
          icon={titleIcon}
          isLoading={isLoading}
          helpComponent={helpComponent}
          customTitle={titleText}
          />
        {children}
        <Row className={"d-flex justify-content-between mx-0"}>
          <div className={"mt-auto"}>
            {getIncompleteRowBlock()}
          </div>
          <div>
            {getAddPropertyButton()}
          </div>
        </Row>
      </div>
      <InfoText
        model={model}
        fieldName={field?.id}
        field={field}
        errorMessage={errorMessage}
      />
    </div>
  );
}

PropertyInputContainer.propTypes = {
  titleIcon: PropTypes.object,
  titleText: PropTypes.string,
  children: PropTypes.any,
  field: PropTypes.object,
  errorMessage: PropTypes.string,
  type: PropTypes.string,
  addProperty: PropTypes.func,
  addAllowed: PropTypes.bool,
  helpComponent: PropTypes.any,
  isLoading: PropTypes.bool,
  incompleteRowMessage: PropTypes.string,
  model: PropTypes.object,
};

export default PropertyInputContainer;