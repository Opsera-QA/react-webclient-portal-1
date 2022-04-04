import React from "react";
import PropTypes from "prop-types";
import {faMinusCircle} from "@fortawesome/pro-light-svg-icons";
import BadgeBase from "components/common/badges/BadgeBase";
import RemoveListItemBadge from "components/common/badges/general/RemoveListItemBadge";

function TextValueCard(
  {
    value,
    className,
    deleteValueFunction,
    index,
    disabled,
  }) {
  if (value == null) {
    return null;
  }

  return (
    <li
      key={index}
      className={className}
    >
      <div className={"pl-2 justify-content-between d-flex w-100"}>
        <div>{value}</div>
        <RemoveListItemBadge
          deleteValueFunction={deleteValueFunction}
          disabled={disabled}
        />
      </div>
    </li>
  );
}

TextValueCard.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  index: PropTypes.number,
  deleteValueFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TextValueCard;