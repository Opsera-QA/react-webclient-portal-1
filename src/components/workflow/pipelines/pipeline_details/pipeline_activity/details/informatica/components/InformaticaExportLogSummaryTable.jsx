import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import informaticaExportObjectLogResultMetaData
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica/metadata/informaticaExportObjectLogResult.metadata";
import {
  getColumnHeader, getColumnId,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";

export const getStatusColumnDefinition = (field, maxLength, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    sortable: false,
    class: className ? className : undefined,
    tooltipTemplate: function (value, row) {
      const status = `${row?.status?.state}`;
      return `<div class="custom-tooltip"><span>${status}</span></div>`;
    },
    template: (text, row) => {
      return row?.status?.state;
    },
  };
};

function InformaticaExportLogSummaryTable({ informaticaDeployObjs }) {
  const fields = informaticaExportObjectLogResultMetaData?.fields;
  
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "id")),
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "path")),
      getTableTextColumn(getField(fields, "type")),
      getTableTextColumn(getField(fields, "description")),
      getStatusColumnDefinition(getField(fields, "status.state")),
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

InformaticaExportLogSummaryTable.propTypes = {
  informaticaDeployObjs: PropTypes.array,
};

export default InformaticaExportLogSummaryTable;