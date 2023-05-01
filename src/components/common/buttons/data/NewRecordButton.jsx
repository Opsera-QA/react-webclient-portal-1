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

    if (hasStringValue(type) === true) {
      return (`New ${type}`);
    }

    return "Create New";
  };

  if (!addRecordFunction) {
    return <></>;
  }

  return (
    <div className={className}>
      <Button
        variant={variant}
        size={size}
        disabled={isLoading || disabled === true}
        onClick={() => {addRecordFunction();}}
        className={"d-flex text-nowrap"}
      >
        <span>
          <IconBase icon={faPlus} />
          <span className={"d-none d-xs-none d-sm-inline ml-1"}>
            {getButtonText()}
          </span>
        </span>
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