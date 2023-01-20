import React from "react";
import PropTypes from "prop-types";
import { hasStringValue } from "components/common/helpers/string-helpers";
import LoadingIcon from "components/common/icons/LoadingIcon";

export default function FieldLabelBase(
  {
    label,
    showLabel,
    isLoading,
  }) {
  const getLoadingIcon = () => {
    if (isLoading === true) {
      return (
        <LoadingIcon className={"ml-1"} />
      );
    }
  };

  if (hasStringValue(label) === false || showLabel === false) {
    return null;
  }

  return (
    <label className="mb-0 mr-2 text-muted">
      <span>{label}:</span>
      {getLoadingIcon()}
    </label>
  );
}

FieldLabelBase.propTypes = {
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  isLoading: PropTypes.bool,
};