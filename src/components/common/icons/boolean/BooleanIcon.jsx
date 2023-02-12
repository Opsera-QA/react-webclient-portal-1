import React from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faTimesCircle} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

export default function BooleanIcon(
  {
    value,
    visible,
  }) {
  if (visible === false) {
    return null;
  }

  if (value === true) {
    return (
      <IconBase
        icon={faCheckCircle}
        className={"green"}
      />
    );
  }

  return (
    <IconBase
      icon={faTimesCircle}
      className={"red"}
    />
  );
}

BooleanIcon.propTypes = {
  value: PropTypes.bool,
  visible: PropTypes.bool
};