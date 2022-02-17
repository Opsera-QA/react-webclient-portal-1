import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import {Col, Row} from "react-bootstrap";

import InformaticaExportLogSummaryTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica/components/InformaticaExportLogSummaryTable";
import InformaticaImportLogSummaryTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica/components/InformaticaImportLogSummaryTable";

function InformaticaReportView({ informaticaDeployObjs, isImportObj }) {

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
        <InformaticaImportLogSummaryTable
          informaticaDeployObjs={informaticaDeployObjs}
        /> :
        <InformaticaExportLogSummaryTable
          informaticaDeployObjs={informaticaDeployObjs}
        />
      }
    </>
  );
}


InformaticaReportView.propTypes = {
  informaticaDeployObjs: PropTypes.array,
  isImportObj: PropTypes.bool
};

export default InformaticaReportView;