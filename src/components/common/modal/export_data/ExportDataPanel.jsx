import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import CloseButton from "components/common/buttons/CloseButton";
import ExportButton, { ExportTypes } from "components/common/buttons/export/ExportButton";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import Model from "core/data_model/model";
import exportDataMetadata from "components/common/modal/export_data/export-data.metadata";
import RadioButtonInputContainer from "components/common/inputs/radio/RadioButtonInputContainer";
import RadioButtonOption from "components/common/inputs/radio/RadioButtonOption";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";

export default function ExportDataPanel(
  {
    children,
    isLoading,
    getRawData,
    getPdfExporter,
    closePanelFunction,
    getCsvData,
  }) {
  const [exportDataModel, setExportDataModel] = useState(new Model({ ...exportDataMetadata.newObjectFields }, exportDataMetadata, true));
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    toastContext.removeInlineMessage();
    setExportDataModel(new Model({ ...exportDataMetadata.newObjectFields }, exportDataMetadata, true));
  }, []);

  const closePanel = () => {
    if (closePanelFunction == null) {
      toastContext.removeInlineMessage();
      toastContext.clearOverlayPanel();
      return;
    }

    closePanelFunction();
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

  if (isLoading === true) {
    return (
      <CenterLoadingIndicator
        type={"Export Data"}
      />
    );
  }

  return (
    <div className={"text-color w-100 p-3"}>
      {toastContext.getInlineBanner()}
      <Row>
        <Col xs={12}>{children}</Col>
        <Col xs={12}>
          <TextInputBase
            className={"mb-2"}
            fieldName={"fileName"}
            dataObject={exportDataModel}
            setDataObject={setExportDataModel}
          />
        </Col>
        <Col xs={12}>{getExportOptions()}</Col>
      </Row>
      <ButtonContainerBase className={"mt-3"}>
        <ExportButton
          getRawData={getRawData}
          getPdfExporter={getPdfExporter}
          getCsvData={getCsvData}
          exportDataModel={exportDataModel}
          className={"mr-2"}
          isLoading={isLoading}
          closeEditorCallback={closePanel}
        />
        <CloseButton
          closeEditorCallback={closePanel}
          showUnsavedChangesMessage={false}
        />
      </ButtonContainerBase>
    </div>
  );
}

ExportDataPanel.propTypes = {
  children: PropTypes.any,
  isLoading: PropTypes.bool,
  getRawData: PropTypes.func,
  getCsvData: PropTypes.func,
  getPdfExporter: PropTypes.func,
  closePanelFunction: PropTypes.func,
};