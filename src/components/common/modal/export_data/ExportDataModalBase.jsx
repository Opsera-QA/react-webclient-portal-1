import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CloseButton from "components/common/buttons/CloseButton";
import ExportButton, {ExportTypes} from "components/common/buttons/export/ExportButton";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import Model from "core/data_model/model";
import exportDataMetadata from "components/common/modal/export_data/export-data.metadata";
import RadioButtonInputContainer from "components/common/inputs/radio/RadioButtonInputContainer";
import RadioButtonOption from "components/common/inputs/radio/RadioButtonOption";
import ModalBase from "components/common/modal/ModalBase";

function ExportDataModalBase({ children, showModal, handleCancelModal, isLoading, getRawData, getPdfExporter, getCsvData}) {
  const [exportDataModel, setExportDataModel] = useState(new Model({...exportDataMetadata.newObjectFields}, exportDataMetadata, true));
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    toastContext.removeInlineMessage();
    setExportDataModel(new Model({...exportDataMetadata.newObjectFields}, exportDataMetadata, true));
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
          value={ExportTypes.PDF}
          disabled={getPdfExporter == null}
          visible={getPdfExporter != null}
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
          value={ExportTypes.RAW}
          disabled={getRawData == null}
          visible={getRawData != null}
          label={
            <span>
              <div><strong>Raw Data</strong></div>
            </span>
          }
        />
        <RadioButtonOption
          fieldName={fieldName}
          dataObject={exportDataModel}
          setDataObject={setExportDataModel}
          value={ExportTypes.CSV}
          disabled={getCsvData == null}
          visible={getCsvData != null}
          label={
            <span>
              <div><strong>CSV</strong></div>
            </span>
          }
        />
      </RadioButtonInputContainer>
    );
  };

  const getButtonContainer = () => {
    return (
      <>
        <ExportButton
          getRawData={getRawData}
          getPdfExporter={getPdfExporter}
          getCsvData={getCsvData}
          exportDataModel={exportDataModel}
          className={"mr-2"}
          isLoading={isLoading}
          closeEditorCallback={handleClose}
        />
        <CloseButton closeEditorCallback={handleClose} showUnsavedChangesMessage={false} />
      </>
    );
  };

  return (
    <ModalBase
      handleClose={handleClose}
      size={"lg"}
      buttonContainer={getButtonContainer()}
      showModal={showModal}
      title={"Export Data"}
    >
      <div className="content-block-shaded m-3 full-height">
        {toastContext.getInlineBanner()}
        <div className="p-3">
          {children}
          <TextInputBase fieldName={"fileName"} dataObject={exportDataModel} setDataObject={setExportDataModel} />
          <div className={"mt-2"}>{getExportOptions()}</div>
        </div>
      </div>
    </ModalBase>
  );
}

ExportDataModalBase.propTypes = {
  children: PropTypes.any,
  showModal: PropTypes.bool,
  handleCancelModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  csvEnabled: PropTypes.bool,
  getRawData: PropTypes.func,
  getCsvData: PropTypes.func,
  getPdfExporter: PropTypes.func,
};

ExportButton.defaultProps = {
  showButtonText: true
};

export default ExportDataModalBase;


