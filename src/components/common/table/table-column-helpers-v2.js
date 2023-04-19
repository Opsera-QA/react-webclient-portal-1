import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
import React from "react";
import {
  getScriptLanguageDisplayText,
} from "components/common/list_of_values_input/inventory/scripts/ScriptLanguageSelectInput";
import {ACCESS_ROLES_FORMATTED_LABELS} from "components/common/helpers/role-helpers";
import { capitalizeFirstLetter, hasStringValue, truncateString } from "components/common/helpers/string-helpers";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import {THRESHOLD_LEVELS} from "components/common/list_of_values_input/pipelines/thresholds/PipelineThresholdLevelSelectInputBase";
import {getCustomTableAccessor, getCustomTableHeader} from "components/common/table/table-column-helpers";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import { getDurationInDaysAndHours } from "components/insights/charts/gitscrapper/git-scraper-utility";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

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
    id: id,
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
    maxWidth: maxWidth,
    template: function (value, row, col) {
      const property = col?.id;
      if (hasStringValue(property) === true) {
        const parsedValue = dataParsingHelper.safeObjectPropertyParser(
          row,
          property,
          "",
        );

        if (hasStringValue(parsedValue) === true || typeof parsedValue === "number") {
          return `${parsedValue}`;
        }
      }

      return "";
    },
  };
};

export const getEncodedTableTextColumn = (field, className, maxWidth = undefined, filterType, tooltipTemplateFunction ) => {
  let header = getColumnHeader(field);

  if (filterType) {
    header.push({ content: filterType });
  }

  return {
    header: header,
    id: getColumnId(field),
    tooltipTemplate: tooltipTemplateFunction,
    class: className,
    maxWidth: maxWidth,
    template: function (value, row, col) {
      const property = col?.id;
      if (hasStringValue(property) === true) {
        const parsedValue = dataParsingHelper.safeObjectPropertyParser(
          row,
          property,
          "",
        );

        if (hasStringValue(parsedValue) === true || typeof parsedValue === "number") {
          return (
            encodeURIComponent(parsedValue)
          );
        }
      }

      return "";
    },
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

export const getEncodedUppercaseTableTextColumn = (field, className, maxWidth = undefined, filterType, tooltipTemplateFunction ) => {
  let header = getColumnHeader(field);

  if (filterType) {
    header.push({ content: filterType });
  }

  return {
    header: header,
    id: getColumnId(field),
    tooltipTemplate: tooltipTemplateFunction,
    template: (value) => {
      return capitalizeFirstLetter(encodeURIComponent(value));
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
    maxWidth: 200,
    template: function (id) {
      if (id == null) {
        return "";
      }

      const parsedId = DataParsingHelper.parseMongoDbId(id);

      return parsedId ? parsedId : "INVALID ID";
    },
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
        return newDate ? DateFormatHelper.formatDateAsTimestampWithoutSeconds(new Date(text), "yyyy-MM-dd") : "";
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

        return DateFormatHelper.formatDateAsTimestampWithoutSeconds(new Date(dateString));
      } catch(error) {
        console.log(error?.message);
        return "";
      }
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableDateTimeColumnWithTimeZone = (field, className, width = 175, showFilter, tooltipTemplateFunction, convertToLocalTimezone) => {
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

        if (dateString == null || dateString === "") {
          return "";
        }

        let date = new Date(dateString);
        dateString = date.toLocaleString("en-us", {timeZoneName:"short"});

        return dateString;
      } catch(error) {
        console.log(error?.message);
        return "";
      }
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
          <i class="fal fa-question-circle cell-icon my-auto"></i>
          <span class="ml-1">Unknown</span>
        </span>`
        );
      }

      return (
        `<span>
          <i class="fal ${getPipelineStatusIconCss(text)} cell-icon my-auto"></i>
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

export const getLookupIconColumn = (field, className, width = 60) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    align: "center",
    width: width,
    template: function (text) {
      let iconCss = "";
      console.log("text", text);

      if(text === "true"){
        iconCss = "fa-check-circle green";
      }
      else if(text === "false"){
        iconCss = "fa-times-circle red";
      }
      else if(text === "neutral"){
        iconCss = "fa-minus";
      }
      else if(text === "unit"){
        return `<i class="fal ${("fa-check-circle green")} cell-icon vertical-align-item"></i><i class="fal ${("fa-shield-check green")} cell-icon vertical-align-item"></i>`;
      }
      else{
        iconCss = "fa-minus";
      }

      // const iconCss = text === true ? "fa-check-circle green" : "fa-times-circle red";
      return (
          `<i class="fal ${iconCss} cell-icon vertical-align-item"></i>`
      );
    },
    class: className
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

export const getDurationInDaysHours = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    class: className ? className : undefined,
    Cell: function parseText(row) {
      const value = row?.value;
      return getDurationInDaysAndHours(value);
    }
  };
};

export const getExternalLinkWithIcon = (field, className, width) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    class: className,
    width: width,
    tooltipTemplate: function (value) {
      return `<div class="custom-tooltip"><span>${value?.key || value}</span></div>`;
    },
    template: function (value) {
      return (`
        <a href=${value?.url || value} target="_blank" className="text-muted console-text-invert-modal">
          <i class="fal fa-external-link cell-icon my-auto"></i>
          <span>${value?.key || value}</span>
        </a>
      `);      
    },
  };
};

export const getConnectionStatus = (field, className, width=200) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    class: className,
    width: width,
    tooltipTemplate: function (value) {
      return `<div class="custom-tooltip"><span>${value?.message ? value?.message : value?.status}</span></div>`;
    },
    template: function (value) {
      return (`
        <span>
          <i class="fal ${getPipelineStatusIconCss(String(value?.status).toLowerCase())} cell-icon my-auto"></i>
          <span class="ml-1">${capitalizeFirstLetter(value?.status)}</span>
        </span>
      `);      
    },
  };
};
