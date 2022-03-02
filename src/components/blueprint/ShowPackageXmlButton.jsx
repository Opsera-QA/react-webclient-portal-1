import React, {useState} from 'react';
import PropTypes from "prop-types";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {faFileCode} from "@fortawesome/free-solid-svg-icons";
import ModalXML from "components/blueprint/modalXML";
import IconBase from "components/common/icons/IconBase";

// TODO: This needs to be refactored, I just isolated the code and will clean it up after I know I didn't break anything
function ShowPackageXmlButton({logData}) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});

  // TODO: Show overlay panel instead
  const handleClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };

  const getButton = () => {
    if (logData?.xmlData) {
      return (
        <Button
          variant="outline-dark"
          className="ml-2"
          size="sm"
          onClick={() => {
            handleClick(logData.xmlData);
          }}
        >
          <IconBase icon={faFileCode} className={"mr-1"} />
          Package XML
        </Button>
      );
    }

    if (logData?.data?.length > 0 && logData?.data[0]?.step_configuration?.configuration?.buildType === "ant" && !logData.xmlData) {
      return (
        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Package XML is unavailable for this job.</Tooltip>}>
          <Button
            variant="outline-dark"
            className={"ml-2"}
            size="sm"
            disabled
            style={{pointerEvents: "none"}}
            onClick={() => {
              handleClick(logData.xmlData);
            }}
          >
            <IconBase icon={faFileCode} className={"mr-1"} />
            Package XML
          </Button>
        </OverlayTrigger>
      );
    }
  };

  return (
    <>
      {getButton()}
      <ModalXML
        header={modalMessage?._index}
        size="lg"
        jsonMessage={modalMessage}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </>
  );
}

ShowPackageXmlButton.propTypes = {
  logData: PropTypes.object,
};

export default ShowPackageXmlButton;