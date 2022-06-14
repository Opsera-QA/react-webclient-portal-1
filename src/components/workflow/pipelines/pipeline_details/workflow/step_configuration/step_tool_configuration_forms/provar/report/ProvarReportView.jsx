import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import ProvarLogSummaryTable
    from "./ProvarLogSummaryTable";

function ProvarReportView({ provarObj }) {

    if (provarObj == null) {
        return (
            <LoadingDialog
                message={"Loading Execution Result"}
                size={'sm'}
            />
        );
    }

    return (
        <ProvarLogSummaryTable
            provarObj={provarObj}
        />
    );
}


ProvarReportView.propTypes = {
    provarObj: PropTypes.array,
};

export default ProvarReportView;