import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import informaticaIdqExportObjectLogResultMetaData
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica_idq/metadata/informaticaIdqExportObjectLogResult.metadata";
import {
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";

function InformaticaIdqExportLogSummaryTable({ informaticaDeployObjs }) {
  const fields = informaticaIdqExportObjectLogResultMetaData?.fields;
  
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "type")),
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "project")),
      getTableTextColumn(getField(fields, "path")),
    ],
    []
  );

  const getComponentResultsTable = () => {
    return (
      <VanityTable
        data={informaticaDeployObjs}
        columns={columns}
        tableHeight={"28.2vh"}
      />
    );
  };

  if (!Array.isArray(informaticaDeployObjs) || informaticaDeployObjs.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase className={"mr-2"} icon={faCheckCircle} />
        There were no deployed objects with this execution.
      </div>
    );
  }

  return (
    <FilterContainer
      showBorder={false}
      body={getComponentResultsTable()}
      titleIcon={faExclamationCircle}
      title={`Objects`}
      className={"mt-2"}
    />
  );
}

InformaticaIdqExportLogSummaryTable.propTypes = {
  informaticaDeployObjs: PropTypes.array,
};

export default InformaticaIdqExportLogSummaryTable;