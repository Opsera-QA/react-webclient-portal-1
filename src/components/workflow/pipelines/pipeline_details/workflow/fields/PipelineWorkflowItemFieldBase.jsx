import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

export default function PipelineWorkflowItemFieldBase(
  {
    icon,
    className,
    label,
    value,
  }) {
  return (
    <div className={className}>
      <div className={"text-muted small d-flex"}>
        <IconBase
          icon={icon}
          iconSize={"sm"}
          className={"mr-1"}
        />
        <span className={"mr-1"}>{label}:</span> {value}
      </div>
    </div>
  );
}

PipelineWorkflowItemFieldBase.propTypes = {
  icon: PropTypes.object,
  label: PropTypes.string,
  value: PropTypes.any,
  className: PropTypes.string,
};