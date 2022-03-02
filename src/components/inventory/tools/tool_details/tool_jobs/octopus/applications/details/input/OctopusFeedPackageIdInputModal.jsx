import React, { useState, useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import { Button } from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";

function OctopusFeedPackageIdInputModal({ handleClose, callback, dataObject, setDataObject }) {  
  return (
    <>
      <div className="flat-top-content-block p-0 workflow-tool-activity-container">
        <div className="w100 data-block-title">
          <div style={{ minHeight: "30px" }}>          
            <div className="text-right float-right p-1">
              <IconBase icon={faTimes} className={"pointer"} onClickFunction={handleClose} />
            </div>
          </div>          
        </div>
        <div className="p-3">
          {dataObject && 
            <TextInputBase
              setDataObject={setDataObject}
              dataObject={dataObject}
              fieldName="packageId"
            />
          }
          <div className="text-right">
            <Button 
              size="md" 
              variant="success" 
              disabled={!dataObject || (dataObject && dataObject.getData("packageId") === "")}
              onClick={callback}
            >
              Continue
            </Button>
          </div>          
        </div>                
      </div>
    </>
  );
}
OctopusFeedPackageIdInputModal.propTypes = {
  handleClose: PropTypes.func,
  callback: PropTypes.func,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default OctopusFeedPackageIdInputModal;
