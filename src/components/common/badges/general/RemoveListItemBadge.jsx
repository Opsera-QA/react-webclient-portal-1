import React  from "react";
import PropTypes from "prop-types";
import BadgeBase from "components/common/badges/BadgeBase";
import {faMinusCircle} from "@fortawesome/pro-light-svg-icons";

function RemoveListItemBadge(
  {
    deleteValueFunction,
    className,
    disabled,
  }) {

  if (deleteValueFunction == null || disabled === true) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"pointer danger-red"} onClick={deleteValueFunction}>
        <BadgeBase
          badgeText={"Remove"}
          icon={faMinusCircle}
        />
      </div>
    </div>
  );
}

RemoveListItemBadge.propTypes = {
  deleteValueFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default React.memo(RemoveListItemBadge);