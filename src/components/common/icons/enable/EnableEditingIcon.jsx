import React from "react";
import PropTypes from "prop-types";
import {faPencil} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

export default function EnableEditingIcon(
  {
    enableEditingFunction,
    disabled,
    isLoading,
    className,
  }) {
  const handleLoadData = async () => {
    if (disabled === true || isLoading === true) {
      return;
    }

    await enableEditingFunction();
  };

  const getLabel = () => {
    return "Enable Editing";
  };

  const getClassName = () => {
    if (isLoading === true || disabled === true) {
      return "badge badge-info disabled";
    }

    return "badge badge-info pointer";
  };

  const getStyle = () => {
    if (isLoading === true) {
      return ({
        opacity: .5,
      });
    }
  };

  if (disabled === true || enableEditingFunction == null) {
    return null;
  }

  return (
    <span className={className}>
      <div>
        <span
          onClick={() => handleLoadData()}
          className={getClassName()}
          style={getStyle()}
        >
          <span className={"my-auto"}>
            <IconBase
              icon={faPencil}
              className={"mr-1"}
            />
            {getLabel()}
          </span>
      </span>
      </div>
    </span>
  );
}

EnableEditingIcon.propTypes = {
  enableEditingFunction: PropTypes.func,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};