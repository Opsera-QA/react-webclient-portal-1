import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import {rawDataDownload} from "components/common/buttons/export/exportHelpers";
import { CSVLink } from "react-csv";
import IconBase from "components/common/icons/IconBase";

export const ExportTypes = {
  RAW: "raw",
  PDF: "pdf",
  CSV: "csv"
};

// TODO: If this will include both the csv and pdf exports, add an option for .csv and trigger based on prop. OR make two separate buttons.
function ExportButton({isLoading, variant, size, className, getRawData, getPdfExporter, getCsvData, exportDataModel, closeEditorCallback}) {
  const [isExporting, setIsExporting] = React.useState(false);

  const csvLink = React.createRef();

  const exportData = async () => {
    setIsExporting(true);

    switch (exportDataModel?.getData("exportOption")) {
      case ExportTypes.PDF:
        await exportToPdf();
        break;
      case ExportTypes.CSV:
        await exportToCsv();
        break;
      default:
        console.error("No Export Type Selected. Defaulting to Raw.");
      // eslint-disable-next-line no-fallthrough
      case ExportTypes.RAW:
        await exportRaw();
    }

    // TODO: Add ismounted check
    setIsExporting(false);
    closeEditorCallback();
  };

  const exportRaw = async () => {
    const dataToExport = getRawData();

    if (dataToExport) {
      rawDataDownload(dataToExport, exportDataModel?.getData("fileName"));
    }
  };

  const exportToPdf = async () => {
    const pdfExporter = getPdfExporter();
    if (pdfExporter) {
      pdfExporter.save(exportDataModel?.getData("fileName"));
    }
  };

  const exportToCsv = async () => {
    let newLink = await csvLink.current.link;
    newLink.click();
  };

  return (
    <div>
        <div className={className}>
          <Button variant={variant} size={size} disabled={isLoading || isExporting} onClick={() => exportData()}>
            <span>
              <IconBase isLoading={isExporting} icon={faFileDownload} className={"mr-1"}/>
              {isExporting ? "Exporting Data" : "Export Data"}
            </span>
          </Button>
        </div>
      {getCsvData && <CSVLink data={getCsvData()} filename={exportDataModel?.getData("fileName")} ref={csvLink}/>}
    </div>
  );
}

ExportButton.propTypes = {
  isLoading: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  getRawData: PropTypes.func,
  getPdfExporter: PropTypes.func,
  getCsvData: PropTypes.func,
  closeEditorCallback: PropTypes.func,
  exportDataModel: PropTypes.object
};

export default ExportButton;