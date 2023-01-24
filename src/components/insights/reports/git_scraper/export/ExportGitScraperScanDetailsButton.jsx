import React, {useContext} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import { DialogToastContext } from "contexts/DialogToastContext";
import ExportDataButtonBase from "components/common/modal/export_data/ExportDataButtonBase";
import ExportGitScraperScanDataOverlay from "./ExportGitScraperScanDataOverlay";

function ExportGitScraperScanDetailsButton({isLoading, scanData, className, allCoverityIssues}) {
    const toastContext = useContext(DialogToastContext);

    const launchOverlayFunction = () => {
        toastContext.showOverlayPanel(
            <ExportGitScraperScanDataOverlay
                isLoading={isLoading}
                formattedData={formattedData()}
                rawData={rawDataResults()}
            />
        );
    };

    const rawDataResults = () =>{
        return scanData ? scanData.map(item => JSON.stringify(item)) : "export failure";
    };

    const formattedData = () => {
        let formattedData = scanData;

        //any data formatting goes here

        return formattedData;
    };

    // TODO: Refine when more is complete
    return (
        <ExportDataButtonBase
            clasName={className}
            isLoading={isLoading}
            scanData={scanData}
            launchOverlayFunction={launchOverlayFunction}
        />
    );
}

ExportGitScraperScanDetailsButton.propTypes = {
    scanData: PropTypes.array,
    allCoverityIssues: PropTypes.array,
    isLoading: PropTypes.bool,
    className: PropTypes.string
};

export default ExportGitScraperScanDetailsButton;