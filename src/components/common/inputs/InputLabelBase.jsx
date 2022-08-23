import React from "react";
import PropTypes from "prop-types";
import { hasStringValue } from "components/common/helpers/string-helpers";

export default function InputLabelBase({ label, showLabel, className }) {
  if (hasStringValue(label) === false || showLabel === false) {
    return null;
  }

  return (
    <div className={className}>
      <label className={"mb-0 mr-2 text-muted"}>
        <span>{label}</span>
      </label>
    </div>
  );
}

InputLabelBase.propTypes = {
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
};