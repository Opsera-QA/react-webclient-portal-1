import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";

function EditIcon({ editFunction, className, tooltipBody, disabled }) {

  if (disabled === true) {
    return null;
  }

  return (
    <div className={className}>
      <ButtonTooltip innerText={tooltipBody}>
        <FontAwesomeIcon
          onClick={() => {editFunction();}}
          icon={faPencilAlt}
          fixedWidth
          className={"pointer"}
        />
      </ButtonTooltip>
    </div>
  );
}

EditIcon.propTypes = {
  editFunction: PropTypes.func,
  className: PropTypes.string,
  tooltipBody: PropTypes.any,
  disabled: PropTypes.bool
};

export default EditIcon;