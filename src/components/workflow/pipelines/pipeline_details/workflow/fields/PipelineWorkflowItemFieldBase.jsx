import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import {hasStringValue} from "components/common/helpers/string-helpers";

export default function PipelineWorkflowItemFieldBase(
  {
    icon,
    iconClassName,
    className,
    label,
    value,
    hideColon,
  }) {
  const colon = hideColon !== true ? ":" : "";

  if (value == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"text-muted small d-flex"}>
        <IconBase
          icon={icon}
          iconSize={"sm"}
          className={"mr-1"}
          iconClassName={iconClassName}
        />
        <span className={"mr-1"}>{label}{colon}</span> {value}
      </div>
    </div>
  );
}

PipelineWorkflowItemFieldBase.propTypes = {
  icon: PropTypes.object,
  iconClassName: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  className: PropTypes.string,
  hideColon: PropTypes.bool,
};