import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";

function DeleteIcon({ handleDeleteClick, className, tooltipBody, disabled }) {

  if (disabled === true) {
    return null;
  }

  return (
    <div className={className}>
      <ButtonTooltip innerText={tooltipBody}>
        <FontAwesomeIcon
          onClick={() => {handleDeleteClick();}}
          icon={faTrash}
          fixedWidth
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