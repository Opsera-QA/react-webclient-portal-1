import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import InformaticaIdqExportLogSummaryTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica_idq/components/InformaticaIdqExportLogSummaryTable";
import InformaticaIdqImportLogSummaryTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica_idq/components/InformaticaIdqImportLogSummaryTable";

function InformaticaIdqReportView({ informaticaDeployObjs, isImportObj }) {

  if (informaticaDeployObjs == null) {
    return (
      <LoadingDialog
        message={"Loading Execution Result"}
        size={'sm'}
      />
    );
  }

  return (
    <>
      {isImportObj ? 
        <InformaticaIdqImportLogSummaryTable
          informaticaDeployObjs={informaticaDeployObjs}
        /> :
        <InformaticaIdqExportLogSummaryTable
          informaticaDeployObjs={informaticaDeployObjs}
        />
      }
    </>
  );
}


InformaticaIdqReportView.propTypes = {
  informaticaDeployObjs: PropTypes.array,
  isImportObj: PropTypes.bool
};

export default InformaticaIdqReportView;