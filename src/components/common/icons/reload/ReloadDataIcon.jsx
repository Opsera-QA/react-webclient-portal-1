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
      return "badge badge-secondary disabled d-flex";
    }

    return "badge badge-secondary pointer d-flex";
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
    <div className={className}>
      <div
        onClick={() => handleLoadData()}
        className={getClassName()}
        style={getStyle()}
      >
        <div className={"my-auto"}>
          <IconBase
            icon={faRefresh}
            className={"mr-1 my-auto"}
            isLoading={isLoading}
          />
          {getLabel()}
        </div>
      </div>
    </div>
  );
}

ReloadDataIcon.propTypes = {
  loadDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};