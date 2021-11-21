import React from "react";
import PropTypes from "prop-types";
import {faPencilAlt} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import IconBase from "components/common/icons/IconBase";

function EditIcon({ editFunction, className, tooltipBody, disabled }) {

  if (disabled === true) {
    return null;
  }

  return (
    <div className={className}>
      <ButtonTooltip innerText={tooltipBody}>
        <IconBase
          onClickFunction={() => {editFunction();}}
          icon={faPencilAlt}
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