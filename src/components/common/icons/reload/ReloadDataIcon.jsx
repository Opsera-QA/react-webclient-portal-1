import React from "react";
import PropTypes from "prop-types";
import {faRefresh} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

export default function ReloadDataIcon(
  {
    loadDataFunction,
    disabled,
    isLoading,
    className,
  }) {
  const handleLoadData = async () => {
    if (disabled === true || isLoading === true) {
      return;
    }

    await loadDataFunction();
  };

  const getLabel = () => {
    if (isLoading === true) {
      return "Loading Data";
    }

    return "Reload Data";
  };

  const getClassName = () => {
    if (isLoading === true || disabled === true) {
      return "my-auto badge badge-secondary clear-value-badge disabled";
    }

    return "my-auto badge badge-secondary clear-value-badge pointer";
  };

  const getStyle = () => {
    if (disabled === true || isLoading === true) {
      return ({
        opacity: .5,
      });
    }
  };

  if (loadDataFunction == null) {
    return null;
  }

  return (
    <span className={className}>
      <span
        onClick={() => handleLoadData()}
        className={getClassName()}
        style={getStyle()}
      >
        <span className={"my-auto"}>
          <IconBase
            icon={faRefresh}
            className={"mr-1"}
            isLoading={isLoading}
          />
          {getLabel()}
        </span>
      </span>
    </span>
  );
}

ReloadDataIcon.propTypes = {
  loadDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};