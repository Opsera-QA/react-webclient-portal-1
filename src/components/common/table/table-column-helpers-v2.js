import { format } from "date-fns";
import React from "react";
import {convertFutureDateToDhmsFromNowString} from "components/common/helpers/date-helpers";
import {truncateString} from "components/common/helpers/string-helpers";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {
  getScriptLanguageDisplayText,
} from "components/common/list_of_values_input/inventory/scripts/ScriptLanguageSelectInput";

export const FILTER_TYPES = {
  SEARCH_FILTER: "inputFilter",
  SELECT_FILTER: "selectFilter",
};

export const getColumnHeader = (field) => {
  return field ? [{ text: field.label }] : [{ text: "" }];
};

export const getColumnId = (field) => {
  return field ? field.id : "";
};

export const getTableTextColumnWithoutField = (header, id) => {
  return {
    header: header,
    id: id
  };
};

export const getTableTextColumn = (field, className, maxWidth = undefined, filterType ) => {
  let header = getColumnHeader(field);

  if (filterType) {
    header.push({ content: filterType });
  }

  return {
    header: header,
    id: getColumnId(field),
    class: className ? className : undefined,
    maxWidth: maxWidth
  };
};

export const getLimitedTableTextColumn = (field, maxLength, className, autoAdjust = true) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    class: className ? className : undefined,
    adjust: autoAdjust,
    Cell: function parseText(row) {
      const value = row?.value;

      if (value != null) {
        const truncatedString = truncateString(value, maxLength);

        if (truncatedString !== value) {
          return (<TooltipWrapper innerText={value}><span>{truncatedString}</span></TooltipWrapper>);
        }

        return value;
      }

      return "";
    },
  };
};

export const getEditableTextColumn = (field, maxLength, className, editable = true) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    class: className ? className : undefined,
    editable: editable,
  };
};

export const getRoleArrayColumn = (field, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        return array.map((item, index) => {
          return (`${item.role}:${item.user}:${item.group}${array.length > index + 1 ? ',' : ''}`);
        });
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableDateColumn = (field, className, width = 150) => {
  let header = getColumnHeader(field);
  header.push({ content: "inputFilter" });

  return {
    header: header,
    id: getColumnId(field),
    width: width,
    // TODO: Figure out why using date-type right aligns stuff. Documentation says it should be left aligned.
    template: function (text, row, col) {
      return text ? format(new Date(text), "yyyy-MM-dd") : "";
    },
    // type: "date",
    // format: "%Y-%M-%d",
    class: className ? className : ""
  };
};

export const getTableDateTimeColumn = (field, className, width = 175, showFilter) => {
  let header = getColumnHeader(field);

  if (showFilter) {
    header.push({ content: "inputFilter" });
  }

  return {
    header: header,
    id: getColumnId(field),
    width: width,
    // TODO: Figure out why date format isn't working and convert to using that.
    // type: "date",
    // format: "%Y-%M-%d %h:%m %a",/
    template: function (text, row, col) {
      return text ? format(new Date(text), "yyyy-MM-dd', 'hh:mm a") : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableDateAndTimeUntilValueColumn = (header, id, fakeColumn = "fakeColumn", className) => {
  return {
    header: header,
    id: fakeColumn,
    template: row => {
      const originalRow = row.row.original;
      return originalRow[id] ? convertFutureDateToDhmsFromNowString(new Date(originalRow[id])) : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getPipelineActivityStatusColumn = (field, className, showFilter) => {
  let header = getColumnHeader(field);

  if (showFilter) {
    header.push({ content: "selectFilter" });
  }

  return {
    header: header,
    id: getColumnId(field),
    width: 105,
    template: function (text, row, col) {
      if (text == null) {
        return "";
      }

      return (
        `<span>
          <i class="fal ${getPipelineStatusIconCss(text)} cell-icon vertical-align-item"></i>
          <span class="ml-1">${text}</span>
        </span>`
      );
    },
    class: className ? className : undefined
  };
};

export const getPipelineStatusIconCss = (value) => {
  switch (value) {
    case "failure":
    case "failed":
      return ("fa-times-circle red");
    case "unknown":
      return ("fa-circle yellow");
    case "rejected":
      return ("fa-stop-circle red");
    case "running":
    case "processing event":
      return ("fa-play-circle green");
    case "queued":
      return ("fa-pause-circle green");
    case "stopped":
    case "halted":
      return ("fa-octagon red");
    case "passed":
    case "success":
    case "successful":
    default:
      return ("fa-check-circle green");
  }
};

export const getChartPipelineStatusColumn = (field, className, width = 120) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    width: width,
    template: function (text, row, col) {
      if (text == null) {
        return "";
      }

      return (
        `<span>
          <i class="fal ${getPipelineStatusIconCss(text)} cell-icon vertical-align-item"></i>
          <span class="ml-1">${text}</span>
        </span>`
      );
    },
    class: className ? className : undefined
  };
};

export const getTableBooleanIconColumn = (field, className, width = 60) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    align: "center",
    width: width,
    template: function (text, row, col) {
      if (text == null) {
        return "";
      }

      const iconCss = text === true ? "fa-check-circle green" : "fa-times-circle red";
      return (
        `<i class="fa ${iconCss} cell-icon vertical-align-item"></i>`
      );
    },
    htmlEnable: true,
    class: className ? className : "text-left"
  };
};


export const getCountColumnWithoutField = (header, id, className) => {
  return {
    header: header,
    id: id,
    Cell: function getCount(row) {
      return row.value.length;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getScriptLanguageColumn = (field, className, showFilter) => {
  let header = getColumnHeader(field);

  if (showFilter) {
    header.push({ content: "selectFilter" });
  }

  return {
    header: header,
    id: getColumnId(field),
    width: 150,
    template: function (value) {
      return getScriptLanguageDisplayText(value);
    },
    class: className ? className : undefined
  };
};
