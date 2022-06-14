import React from "react";
import PropTypes from "prop-types";
import ProvarLicenseConfiguration from "./tool_jobs/provar/ProvarLicenseConfiguration";

function ToolLicensePanel({ toolData, setToolData }) {

    const getLicensePanel = () => {
        if (toolData == null) {
            return <></>;
        }

        switch (toolData?.getData("tool_identifier")) {
            case "provar":
                return <ProvarLicenseConfiguration toolData={toolData} />;
            default:
                return <div className="text-center p-5 text-muted mt-5">License configuration is not currently available for this tool.</div>;
        }
    };

    return (
        <div className="p-3">
            {getLicensePanel() }
        </div>
    );
}

ToolLicensePanel.propTypes = {
    toolData: PropTypes.object,
    setToolData: PropTypes.func,
};


export default ToolLicensePanel;
