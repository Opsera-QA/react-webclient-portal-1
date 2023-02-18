import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import {faMinusCircle} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {numberHelpers} from "components/common/helpers/number/number.helpers";

const getBadgeText = (count, type) => {
  let badgeText = "Remove All";

  if (numberHelpers.isNumberGreaterThan(-1, count) === true) {
    badgeText += ` ${count}`;
  }

  if (hasStringValue(type) === true) {
    badgeText += ` ${type}`;
  }

  return badgeText;
};

export default function RemoveAllBadge(
  {
    removeAllFunction,
    className,
    disabled,
    count,
    type,
  }) {
  const badgeText = getBadgeText(count, type);

  if (removeAllFunction == null || disabled === true) {
    return null;
  }

  return (
    <div className={className}>
      <div
        onClick={removeAllFunction}
        className={"badge badge-danger pointer d-flex"}
      >
        <div className={"my-auto mr-1"}>
          <IconBase
            icon={faMinusCircle}
            className={"mr-1"}
          />
          {badgeText}
        </div>
      </div>
    </div>
  );
}

RemoveAllBadge.propTypes = {
  removeAllFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  count: PropTypes.number,
  type: PropTypes.string,
};