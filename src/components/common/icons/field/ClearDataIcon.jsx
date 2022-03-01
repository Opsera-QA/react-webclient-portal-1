import React, {useState} from "react";
import PropTypes from "prop-types";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ClearDataConfirmationModal from "components/common/modal/ClearDataConfirmationModal";
import IconBase from "components/common/icons/IconBase";

function ClearDataIcon({ clearValueFunction, furtherDetails, requireConfirmation, className }) {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleClearData = () => {
    if (requireConfirmation === true) {
      setShowConfirmationModal(true);
      return;
    }

    clearValueFunction();
  };

  if (clearValueFunction == null) {
    return null;
  }

  return (
    <>
      <TooltipWrapper innerText={"Clear this Value"}>
        <span className={className}>
          <span onClick={() => handleClearData()} className="my-auto badge badge-danger clear-value-badge pointer">
            <span className={"my-auto"}><IconBase icon={faTimes} className={"mr-1"}/>Clear Value</span>
          </span>
        </span>
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
  className: PropTypes.string
};

export default ClearDataIcon;