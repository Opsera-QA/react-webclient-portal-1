import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/docco";
import xml from "react-syntax-highlighter/dist/esm/languages/hljs/xml";
import CopyToClipboardIcon from "../common/icons/CopyToClipboardIcon";
import CloseButton from "../common/buttons/CloseButton";

SyntaxHighlighter.registerLanguage("xml", xml);

function ModalXML({ header, size, jsonMessage, dataType, show, setParentVisibility }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(show);
  }, [jsonMessage, show]);

  const handleClose = () => {
    setShowModal(false);
    setParentVisibility(false);
  };

  return (
    <Modal show={showModal} size={size} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Package XML</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{padding: "20px", position: "relative"}}>
          <div style={{position: "absolute", fontSize: "1.1rem", top: "20px", right: "30px"}}>
            <CopyToClipboardIcon copyString={jsonMessage && jsonMessage.xml ? jsonMessage.xml : jsonMessage ? jsonMessage : "N/A"} />
          </div>
            <SyntaxHighlighter language="xml" style={docco}>
              {jsonMessage && jsonMessage.xml ? jsonMessage.xml : jsonMessage ? jsonMessage : "N/A"}
             </SyntaxHighlighter>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <CloseButton closeEditorCallback={handleClose} showUnsavedChangesMessage={false}/>
      </Modal.Footer>
    </Modal>
  );
}

ModalXML.propTypes = {
  header: PropTypes.string,
  size: PropTypes.string,
  jsonMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  dataType: PropTypes.string,
  show: PropTypes.bool,
  setParentVisibility: PropTypes.func,
};

export default ModalXML;
