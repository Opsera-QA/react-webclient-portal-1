import { format } from "date-fns";
import React from "react";
import {convertFutureDateToDhmsFromNowString} from "components/common/helpers/date/date.helpers";
import {
  getScriptLanguageDisplayText,
} from "components/common/list_of_values_input/inventory/scripts/ScriptLanguageSelectInput";
import {ACCESS_ROLES_FORMATTED_LABELS} from "components/common/helpers/role-helpers";
import {capitalizeFirstLetter, truncateString} from "components/common/helpers/string-helpers";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import {getTaskTypeLabel} from "components/tasks/task.types";
import {THRESHOLD_LEVELS} from "components/common/list_of_values_input/pipelines/thresholds/PipelineThresholdLevelSelectInputBase";
import {getCustomTableAccessor, getCustomTableHeader} from "components/common/table/table-column-helpers";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
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

export const getOwnerNameField = (maxWidth, headerText = "Owner Name") => {
  return {
    header: [{ text: headerText }],
    id: "owner_name",
    maxWidth: maxWidth,
  };
};

export const getTableTextColumnWithoutField = (header, id) => {
  return {
    header: header,
    id: id
  };
};

export const getTableTextColumn = (field, className, maxWidth = undefined, filterType, tooltipTemplateFunction ) => {
  let header = getColumnHeader(field);

  if (filterType) {
    header.push({ content: filterType });
  }

  return {
    header: header,
    id: getColumnId(field),
    tooltipTemplate: tooltipTemplateFunction,
    class: className,
    maxWidth: maxWidth
  };
};

export const getUppercaseTableTextColumn = (field, className, maxWidth = undefined, filterType, tooltipTemplateFunction ) => {
  let header = getColumnHeader(field);

  if (filterType) {
    header.push({ content: filterType });
  }

  return {
    header: header,
    id: getColumnId(field),
    tooltipTemplate: tooltipTemplateFunction,
    template: (value) => {
      return capitalizeFirstLetter(value);
    },
    class: className,
    maxWidth: maxWidth
  };
};

export const getTableTextColumnBase = (field, className, maxWidth = undefined, filterType, tooltipTemplateFunction, formatDataFunction, ) => {
  let header = getColumnHeader(field);

  if (filterType) {
    header.push({ content: filterType });
  }

  return {
    header: header,
    id: getColumnId(field),
    tooltipTemplate: tooltipTemplateFunction,
    template: formatDataFunction,
    class: className,
    maxWidth: maxWidth
  };
};

export const getLimitedTableTextColumn = (field, maxLength, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    class: className ? className : undefined,
    tooltipTemplate: function (value) {
      return `<div class="custom-tooltip"><span>${value}</span></div>`;
    },
    template: function (text) {
      if (text != null) {
        const truncatedString = truncateString(text, maxLength);

        if (truncatedString !== text) {
          return (truncatedString);
        }

        return text;
      }

      return "";
    },
  };
};

export const getTableIdColumn = (headerText = "ID", className) => {
  return {
    header:  [{ text: headerText }],
    id: "_id",
    class: className,
    maxWidth: 200
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

export const getTableDateColumn = (field, className, width = 150) => {
  let header = getColumnHeader(field);

  return {
    header: header,
    id: getColumnId(field),
    width: width,
    // TODO: Figure out why using date-type right aligns stuff. Documentation says it should be left aligned.
    template: function (text, row, col) {
      try {
        const newDate = text ? new Date(text) : undefined;
        return newDate ? format(new Date(text), "yyyy-MM-dd") : "";
      }
      catch (error) {
        return "";
      }
    },
    class: className ? className : ""
  };
};

export const getTableDateTimeColumn = (field, className, width = 175, showFilter, tooltipTemplateFunction, convertToLocalTimezone) => {
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
    tooltipTemplate: tooltipTemplateFunction,
    template: function (text, row, col) {
      try {
        const property = col?.id;
        let dateString = dataParsingHelper.safeObjectPropertyParser(row, property, "");

        if (dateString == null) {
          return "";
        }

        if (convertToLocalTimezone === true) {
          let date = new Date(dateString);
          dateString = date.toLocaleString("en-us");
        }

        return format(new Date(dateString), "yyyy-MM-dd', 'hh:mm a");
      } catch(error) {
        console.log(error?.message);
        return "";
      }
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

export const getPipelineActivityStatusColumn = (field, className) => {
  let header = getColumnHeader(field);

  return {
    header: header,
    id: getColumnId(field),
    width: 105,
    template: function (text) {
      if (text == null || text === "") {
        return (
          `<span>
          <i class="fal fa-question-circle cell-icon vertical-align-item"></i>
          <span class="ml-1">Unknown</span>
        </span>`
        );
      }

      return (
        `<span>
          <i class="fal ${getPipelineStatusIconCss(text)} cell-icon vertical-align-item"></i>
          <span class="ml-1">${capitalizeFirstLetter(text)}</span>
        </span>`
      );
    },
    class: className ? className : undefined
  };
};

export const getPipelineThresholdLevelColumn = (field, className) => {
  let header = getColumnHeader(field);

  return {
    header: header,
    id: getColumnId(field),
    template: function (text) {
      if (text != null && text !== "") {
        const formattedText = THRESHOLD_LEVELS.find((thresholdLevel) => thresholdLevel?.value === text)?.text;

        if (formattedText) {
          return formattedText;
        }
      }

      return "";
    },
    class: className ? className : undefined
  };
};

export const getTaskStatusColumn = (field, className) => {
  let header = getColumnHeader(field);

  return {
    header: header,
    id: getColumnId(field),
    width: 105,
    template: function (text) {
      if (text == null || text === "") {
        return (
          `<span>
          <i class="fal fa-play-circle green cell-icon vertical-align-item"></i>
          <span class="ml-1">Created</span>
        </span>`
        );
      }

      return (
        `<span>
          <i class="fal ${getPipelineStatusIconCss(text)} cell-icon vertical-align-item"></i>
          <span class="ml-1">${capitalizeFirstLetter(text)}</span>
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
    case "pending":
      return ("fa-pause-circle yellow");
    case "unknown":
      return ("fa-circle yellow");
    case "rejected":
      return ("fa-stop-circle red");
    case "running":
    case "processing event":
    case "created":
      return ("fa-play-circle green");
    case "queued":
      return ("fa-pause-circle green");
    case "stopped":
    case "aborted":
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
    template: function (text) {
      if (text == null || text === "") {
        return (
          `<span>
          <i class="fal fa-question-circle cell-icon vertical-align-item"></i>
          <span class="ml-1">Unknown</span>
        </span>`
        );
      }

      return (
        `<span>
          <i class="fal ${getPipelineStatusIconCss(text)} cell-icon vertical-align-item"></i>
          <span class="ml-1">${capitalizeFirstLetter(text)}</span>
        </span>`
      );
    },
    class: className ? className : undefined
  };
};

// TODO: Get salesforce css to work
const getPipelineTypeColumnCss = (type) => {
  if (!type) {
    return ("fal fa-drafting-compass");
  }

  switch (type[0]) {
    case "sfdc":
      return ("fab fa-salesforce");
    case "ai-ml":
      return ("fal fa-microchip");
    case "sdlc":
      return ("fal fa-brackets-curly");
    default:
      return ("fal fa-drafting-compass");
  }
};

// TODO: Move all pipeline related columns to their own helper file
export const getPipelineTypeColumn = (field, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    template: function (text) {
      const iconCss = getPipelineTypeColumnCss(text);
      return (
        `<i class="${iconCss} cell-icon vertical-align-item"></i>`
      );
    },
    maxWidth: 50,
    class: className
  };
};

export const getFormattedLabelWithFunctionColumnDefinition = (field, formatFunction, className = "no-wrap-inline", tooltipTemplateFunction) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    template: function (text, row, column) {
      const property = column?.id;
      const parsedText = dataParsingHelper.safeObjectPropertyParser(row, property, "");
      return formatFunction(parsedText);
    },
    tooltipTemplate: tooltipTemplateFunction,
    class: className,
  };
};


export const getPipelineRunCountColumn = (field, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    maxWidth: 100,
    template: function (text, row) {
      return `${row?.workflow?.run_count}`;
    },
    class: className
  };
};

export const getTablePipelineStatusColumn = (field, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    // eslint-disable-next-line react/display-name
    template: function (text) {
      let pipelineStatus = pipelineHelpers.getPipelineStatus(text);

      switch (pipelineStatus) {
        case "failed":
          return (`
            <span class="red">
              <i class="fal fa-times-circle cell-icon vertical-align-item"></i>
              <span class="ml-1">${capitalizeFirstLetter(text)}</span>
            </span>
          `);
        case "error":
          return (`
            <span class="red">
              <i class="fal fa-exclamation-circle cell-icon vertical-align-item"></i>
              <span class="ml-1">${capitalizeFirstLetter(text)}</span>
            </span>
          `);
        case "running":
          return (`
            <span class="green">
              <i class="fal fa-spinner cell-icon vertical-align-item"></i>
              <span class="ml-1">${capitalizeFirstLetter(text)}</span>
            </span>
          `);
        case "paused":
          return (`
            <span class="yellow">
              <i class="fal fa-pause cell-icon vertical-align-item"></i>
              <span class="ml-1">${capitalizeFirstLetter(text)}</span>
            </span>
          `);
        case "success":
          return (`
            <span class="green">
              <i class="fal fa-check-circle cell-icon vertical-align-item"></i>
              <span class="ml-1">${capitalizeFirstLetter(text)}</span>
            </span>
          `);
        default:
          return (`
            <span>
              <i class="fal fa-stop cell-icon vertical-align-item"></i>
              <span class="ml-1">Stopped</span>
            </span>
          `);
      }
    },
    class: className ? className :  "text-left"
  };
};

export const getTableBooleanIconColumn = (field, className, width = 60) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    align: "center",
    width: width,
    template: function (text) {
      const iconCss = text === true ? "fa-check-circle green" : "fa-times-circle red";
      return (
        `<i class="fal ${iconCss} cell-icon vertical-align-item"></i>`
      );
    },
    htmlEnable: true,
    class: className ? className : "text-left"
  };
};

export const getTableActiveBooleanIconColumn = (field, className, width = 60, tooltipTemplateFunction) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    align: "center",
    width: width,
    tooltipTemplate: tooltipTemplateFunction,
    template: function (text) {
      if (text === true) {
        return (
          `<i class="fal fa-check-circle green cell-icon vertical-align-item"></i>`
        );
      }

      return "";
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

export const getRoleAccessLevelColumn = (field, className, width = 200) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    width: width,
    template: function (text, row, col) {
      const roles = row?.roles;

      if (text == null) {
        return `${ACCESS_ROLES_FORMATTED_LABELS.no_roles_assigned}`;
      }

      const accessLevel = ACCESS_ROLES_FORMATTED_LABELS[text];

      if (accessLevel) {
        return `${accessLevel}`;
      }

      if (!Array.isArray(roles) || roles.length === 0) {
        return `${ACCESS_ROLES_FORMATTED_LABELS.no_access_rules}`;
      }

      return "ROLE ACCESS LEVEL UNKNOWN";
    },
    class: className ? className : ""
  };
};

export const getStaticInfoColumn = (className) => {
  return {
    header: "Info",
    id: "fake",
    template: function () {
      return (`
        <span>
          <i class="fal fa-search-plus cell-icon vertical-align-item"></i>
        </span>
      `);
    },
    maxWidth: 50,
    class: className
  };
};

export const getSalesforceSumamryTableBooleanIconColumn = (field, className, width = 60) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    align: "center",
    width: width,
    template: function (text) {
      const iconCss = text === true ? "fa-check-circle green" : "fa-minus";
      return (
        `<i class="fal ${iconCss} cell-icon vertical-align-item"></i>`
      );
    },
    htmlEnable: true,
    class: className ? className : "text-left"
  };
};