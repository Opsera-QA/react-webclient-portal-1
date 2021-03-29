import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import {DialogToastContext} from "contexts/DialogToastContext";
import CloseButton from "components/common/buttons/CloseButton";
import ExportButton from "components/common/buttons/export/ExportButton";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import Model from "core/data_model/model";
import exportDataMetadata from "components/common/modal/export_data/export-data.metadata";
import RadioButtonInputContainer from "components/common/inputs/radio/RadioButtonInputContainer";
import RadioButtonOption from "components/common/inputs/radio/RadioButtonOption";

function ExportDataModal({ children, showModal, handleCancelModal, formattedData, rawData, isLoading, exportFrom, summaryData, logData}) {
  const [exportDataModel, setExportDataModel] = useState(new Model({...exportDataMetadata.newObjectFields}, exportDataMetadata, true));
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    toastContext.removeInlineMessage();
  }, []);

  const handleClose = () => {
    toastContext.removeInlineMessage();
    handleCancelModal();
  };



  // TODO: I'm going to refactor this after everything is known
  const getExportOptions = (fieldName = "exportOption") => {
    return (
      <RadioButtonInputContainer dataObject={exportDataModel} fieldName={fieldName}>
        <RadioButtonOption
          fieldName={fieldName}
          dataObject={exportDataModel}
          setDataObject={setExportDataModel}
          value={"formatted"}
          label={
            <span>
                <div><strong>Format Data Before Export</strong></div>
            </span>
          }
        />
        <RadioButtonOption
          fieldName={fieldName}
          dataObject={exportDataModel}
          setDataObject={setExportDataModel}
          value={"raw"}
          label={
            <span>
                <div><strong>Raw Data</strong></div>
            </span>
          }
        />
      </RadioButtonInputContainer>
    );
  };

  const getDataToExport = () => {
    switch (exportDataModel.getData("exportOption")) {
      case "formatted":
        return formattedData;
      case "raw":
        return new Blob([rawData], {type : 'text/plain'});
      default:
        return new Blob([rawData], {type : 'text/plain'});
    }
  };

  return (
    <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Export Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="content-block-shaded m-3 full-height">
          {toastContext.getInlineBanner()}
          <div className="p-3">
            {children}
            <TextInputBase fieldName={"fileName"} dataObject={exportDataModel} setDataObject={setExportDataModel} />
            <div className={"mt-2"}>{getExportOptions()}</div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ExportButton logData={logData} summaryData={summaryData} dataToExport={getDataToExport()} className={"mr-2"} fileName={exportDataModel.getData("fileName")} isLoading={isLoading} exportFrom={exportFrom} />
        <CloseButton closeEditorCallback={handleClose} />
      </Modal.Footer>
    </Modal>
  );
}

ExportDataModal.propTypes = {
  children: PropTypes.any,
  showModal: PropTypes.bool,
  handleCancelModal: PropTypes.func.isRequired,
  dataToExport: PropTypes.any,
  rawData: PropTypes.any,
  formattedData: PropTypes.any,
  isLoading: PropTypes.bool,
  exportFrom: PropTypes.any,
  summaryData: PropTypes.any, 
  logData: PropTypes.any
};

export default ExportDataModal;


