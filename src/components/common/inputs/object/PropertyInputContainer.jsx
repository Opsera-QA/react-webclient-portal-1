import React from "react";
import PropTypes from "prop-types";
import InfoText from "components/common/inputs/info_text/InfoText";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Row from "react-bootstrap/Row";
import {Button} from "react-bootstrap";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";

function PropertyInputContainer({ children, isLoading, titleIcon, titleText, field, errorMessage, addProperty, type, addAllowed, helpComponent }) {
  const getAddPropertyButton = () => {
    if (addProperty) {
      return (
        <Row className={"mx-0"}>
          <div className="ml-auto m-2 d-flex">
            <Button variant="secondary" disabled={!addAllowed} onClick={() => addProperty()} size="sm">
              <span className="text-white"><FontAwesomeIcon className="text-white mr-2" icon={faPlus} fixedWidth />Add {type}</span>
            </Button>
          </div>
        </Row>
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
        <div>{getAddPropertyButton()}</div>
      </div>
      <InfoText field={field} errorMessage={errorMessage}/>
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
  isLoading: PropTypes.bool
};

export default PropertyInputContainer;