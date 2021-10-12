import React from "react";
import {getOctopusApplicationTypeLabel} from "components/common/list_of_values_input/tools/octopus/applications/type/octopus.application.types";
import {getCustomTableAccessor, getCustomTableHeader} from "components/common/table/table-column-helpers";

export const getOctopusApplicationTypeColumnDefinition = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function formatOctopusApplicationTypeLabel(row) {
      return getOctopusApplicationTypeLabel(row?.value);
    },
    class: className,
  };
};