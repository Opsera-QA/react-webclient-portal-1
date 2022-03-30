import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import {hasStringValue} from "components/common/helpers/string-helpers";

function NewRecordButton(
  {
    isLoading,
    variant,
    addRecordFunction,
    type,
    size,
    className,
    disabled,
    customButtonText,
  }) {
  const getButtonText = () => {
    if (hasStringValue(customButtonText) === true) {
      return customButtonText;
    }

    return (`New ${type}`);
  };

  if (!addRecordFunction) {
    return <></>;
  }

  return (
    <div className={className}>
      <Button variant={variant} size={size} disabled={isLoading || disabled === true} onClick={() => {addRecordFunction();}}>
        <span className={"d-sm-none"}><IconBase icon={faPlus}/></span>
        <span className={"d-none d-sm-inline"}><IconBase icon={faPlus} className={"mr-1"}/>{getButtonText()}</span>
      </Button>
    </div>
  );
}

NewRecordButton.propTypes = {
  addRecordFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  customButtonText: PropTypes.string,
};

NewRecordButton.defaultProps = {
  size: "sm",
};

export default NewRecordButton;