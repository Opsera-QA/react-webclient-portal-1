import React from "react";
import PropTypes from "prop-types";
import ShowAndHideButton from "components/common/buttons/visibility/ShowAndHideButton";

function ShowSensitiveDataButton(
  {
    isLoading,
    valueShown,
    hideDataFunction,
    showDataFunction,
    variant,
    size,
    className,
    disable,
  }) {
  if (showDataFunction == null || hideDataFunction == null) {
    return null;
  }

  return (
    <ShowAndHideButton
      showDataFunction={showDataFunction}
      hideDataFunction={hideDataFunction}
      isLoading={isLoading}
      className={className}
      type={"Sensitive Data"}
      disabled={disable}
      size={size}
      variant={variant}
      valueShown={valueShown}
    />
  );
}

ShowSensitiveDataButton.propTypes = {
  showDataFunction: PropTypes.func,
  hideDataFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  valueShown: PropTypes.bool,
  disable: PropTypes.bool,
};

ShowSensitiveDataButton.defaultProps = {
  variant: "outline-primary",
};

export default ShowSensitiveDataButton;