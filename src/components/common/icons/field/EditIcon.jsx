import React from "react";
import PropTypes from "prop-types";
import {faPencilAlt} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import IconBase from "components/common/icons/IconBase";

function EditIcon(
  {
    handleEditFunction,
    className,
    tooltipBody,
    disabled,
    iconClassName,
    iconTransformProperties,
  }) {

  if (disabled === true || handleEditFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <ButtonTooltip innerText={tooltipBody}>
        <IconBase
          onClickFunction={() => {handleEditFunction();}}
          icon={faPencilAlt}
          className={"pointer"}
          iconTransformProperties={iconTransformProperties}
          iconClassName={iconClassName}
        />
      </ButtonTooltip>
    </div>
  );
}

EditIcon.propTypes = {
  handleEditFunction: PropTypes.func,
  className: PropTypes.string,
  tooltipBody: PropTypes.any,
  disabled: PropTypes.bool,
  iconClassName: PropTypes.string,
  iconTransformProperties: PropTypes.any,
};

export default EditIcon;