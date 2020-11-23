import React, {useState} from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faSearchPlus} from "@fortawesome/pro-light-svg-icons";
import ObjectJsonModal from "../../modal/ObjectJsonModal";

function ActionBarShowDetailsButton({ details, type }) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  return (
    <>
      <ActionBarButton
        action={() => setShowDetailsModal(true)}
        iconClasses={"mr-2"}
        icon={faSearchPlus}
        popoverText={`Show details`}
      />
      <ObjectJsonModal
        header={`Viewing ${type} Details`}
        size="lg"
        jsonData={details}
        show={showDetailsModal}
        setParentVisibility={setShowDetailsModal}
      />
    </>
  );
}

ActionBarShowDetailsButton.propTypes = {
  details: PropTypes.object,
  type: PropTypes.string
};

export default ActionBarShowDetailsButton;