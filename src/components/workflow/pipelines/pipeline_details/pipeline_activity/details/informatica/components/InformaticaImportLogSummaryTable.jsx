import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import informaticaImportObjectLogResultMetaData
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica/metadata/informaticaImportObjectLogResult.metadata";
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

export const getSourceNameColumn = (field, maxLength, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    sortable: false,
    class: className ? className : undefined,
    tooltipTemplate: function (value, row) {
      const sourceName = `${row?.sourceObject?.name}`;
      return `<div class="custom-tooltip"><span>${sourceName}</span></div>`;
    },
    template: (text, row) => {
      return row?.sourceObject?.name;
    },
  };
};

export const getTargetNameColumn = (field, maxLength, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    sortable: false,
    class: className ? className : undefined,
    tooltipTemplate: function (value, row) {
      const targetName = `${row?.targetObject?.name}`;
      return `<div class="custom-tooltip"><span>${targetName}</span></div>`;
    },
    template: (text, row) => {
      return row?.targetObject?.name;
    },
  };
};

export const getSourcePathColumn = (field, maxLength, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    sortable: false,
    class: className ? className : undefined,
    tooltipTemplate: function (value, row) {
      const sourcePath = `${row?.sourceObject?.path}`;
      return `<div class="custom-tooltip"><span>${sourcePath}</span></div>`;
    },
    template: (text, row) => {
      return row?.sourceObject?.path;
    },
  };
};

export const getTargetPathColumn = (field, maxLength, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    sortable: false,
    class: className ? className : undefined,
    tooltipTemplate: function (value, row) {
      const targetPath = `${row?.targetObject?.path}`;
      return `<div class="custom-tooltip"><span>${targetPath}</span></div>`;
    },
    template: (text, row) => {
      return row?.targetObject?.path;
    },
  };
};

export const getSourceTypeColumn = (field, maxLength, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    sortable: false,
    class: className ? className : undefined,
    tooltipTemplate: function (value, row) {
      const sourceType = `${row?.sourceObject?.type}`;
      return `<div class="custom-tooltip"><span>${sourceType}</span></div>`;
    },
    template: (text, row) => {
      return row?.sourceObject?.type;
    },
  };
};

export const getTargetTypeColumn = (field, maxLength, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    sortable: false,
    class: className ? className : undefined,
    tooltipTemplate: function (value, row) {
      const targetType = `${row?.targetObject?.type}`;
      return `<div class="custom-tooltip"><span>${targetType}</span></div>`;
    },
    template: (text, row) => {
      return row?.targetObject?.type;
    },
  };
};

function InformaticaImportLogSummaryTable({ informaticaDeployObjs }) {
  const fields = informaticaImportObjectLogResultMetaData?.fields;
  
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "id")),
      getSourceNameColumn(getField(fields, "sourceObject.name")),
      getSourcePathColumn(getField(fields, "sourceObject.path")),
      getSourceTypeColumn(getField(fields, "sourceObject.type")),
      getTargetNameColumn(getField(fields, "targetObject.name")),
      getTargetPathColumn(getField(fields, "targetObject.path")),
      getTargetTypeColumn(getField(fields, "targetObject.type")),
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

InformaticaImportLogSummaryTable.propTypes = {
  informaticaDeployObjs: PropTypes.array,
};

export default InformaticaImportLogSummaryTable;