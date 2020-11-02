import React, {useState} from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faSearchPlus} from "@fortawesome/pro-light-svg-icons";
import ObjectJsonModal from "../../modal/ObjectJsonModal";

// TODO: Use this instead of show details button
function ActionBarShowJsonButton({dataObject}) {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <>
      <ActionBarButton
        action={() => setShowInfoModal(true)}
        iconClasses={"mr-2"}
        icon={faSearchPlus}
        popoverText={`Show object JSON`}
      />
      <ObjectJsonModal header={`${dataObject.getType()} Data`} size="lg" jsonData={dataObject.getPersistData()} show={showInfoModal} setParentVisibility={setShowInfoModal} />
    </>
  );
}

ActionBarShowJsonButton.propTypes = {
  dataObject: PropTypes.object,
};

export default ActionBarShowJsonButton;