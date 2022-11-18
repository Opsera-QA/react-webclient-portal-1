import React, {useState} from "react";
import PropTypes from "prop-types";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ClearDataConfirmationModal from "components/common/modal/ClearDataConfirmationModal";
import IconBase from "components/common/icons/IconBase";

function ClearDataIcon(
  {
    clearValueFunction,
    furtherDetails,
    requireConfirmation,
    className,
    disabled,
  }) {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleClearData = () => {
    if (requireConfirmation === true) {
      setShowConfirmationModal(true);
      return;
    }

    clearValueFunction();
  };

  if (clearValueFunction == null || disabled === true) {
    return null;
  }

  return (
    <>
      <TooltipWrapper innerText={"Clear this Value"}>
        <div className={className}>
          <div onClick={() => handleClearData()} className={"badge badge-danger pointer d-flex"}>
            <div className={"my-auto"}>
              <IconBase
                icon={faTimes}
                className={"mr-1 my-auto"}
              />
              Clear
            </div>
          </div>
        </div>
      </TooltipWrapper>
      <ClearDataConfirmationModal
        clearDataFunction={clearValueFunction}
        showModal={showConfirmationModal}
        setShowModal={setShowConfirmationModal}
        furtherDetails={furtherDetails}
      />
    </>
  );
}

ClearDataIcon.propTypes = {
  clearValueFunction: PropTypes.func,
  furtherDetails: PropTypes.any,
  requireConfirmation: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ClearDataIcon;