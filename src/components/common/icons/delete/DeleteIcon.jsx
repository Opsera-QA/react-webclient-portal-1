import React from "react";
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import IconBase from "components/common/icons/IconBase";

function DeleteIcon({ handleDeleteClick, className, tooltipBody, disabled }) {

  if (disabled === true) {
    return null;
  }

  return (
    <div className={className}>
      <ButtonTooltip innerText={tooltipBody}>
        <IconBase
          onClickFunction={() => {handleDeleteClick();}}
          icon={faTrash}
          className={"pointer delete-icon danger-red"}
        />
      </ButtonTooltip>
    </div>
  );
}

DeleteIcon.propTypes = {
  handleDeleteClick: PropTypes.func,
  className: PropTypes.string,
  tooltipBody: PropTypes.any,
  disabled: PropTypes.bool
};

export default DeleteIcon;