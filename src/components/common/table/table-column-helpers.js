import { format } from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import {
  faCheckCircle,
  faCircle, faOctagon,
  faPauseCircle, faPlayCircle, faSearchPlus,
  faSpinner,
  faStopCircle,
  faTimesCircle, faTrash, faPlay, faTag, faExclamationCircle, faSearch
} from "@fortawesome/pro-light-svg-icons";
import SuccessIcon from "../../common/icons/table/SuccessIcon";
import WarningIcon from "../../common/icons/table/WarningIcon";
import FailIcon from "../../common/icons/table/FailIcon";
import ArrowCircleDown from "../../common/icons/table/ArrowCircleDown";
import ArrowCircleUp from "../../common/icons/table/ArrowCircleUp";
import MinusCircle from "../../common/icons/table/MinusCircle";
import PauseCircle from "../../common/icons/table/PauseCircle";
import React from "react";
import Model from "core/data_model/model";
import PipelineTypesField from "components/common/fields/pipelines/PipelineTypesField";
import DashboardFavoritesIcon from "components/common/icons/dashboards/DashboardFavoritesIcon";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import {Button} from "react-bootstrap";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import {convertFutureDateToDhmsFromNowString} from "components/common/helpers/date-helpers";
import {capitalizeFirstLetter, truncateString} from "components/common/helpers/string-helpers";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import CustomBadge from "components/common/badges/CustomBadge";
import {ACCESS_ROLES_FORMATTED_LABELS} from "components/common/helpers/role-helpers";
import {getTaskTypeLabel} from "components/tasks/task.types";
import { getPipelineStateFieldBase} from "components/common/fields/pipelines/state/PipelineStateField";
import IconBase from "components/common/icons/IconBase";
import TagDisplayer from "components/common/fields/multiple_items/tags/TagDisplayer";

export const getCustomTableHeader = (field) => {
  return field ? field.label : "";
};

export const getCustomTableAccessor = (field) => {
  return field ? field.id : "";
};

export const getTableTextColumnWithoutField = (header, accessor) => {
  return {
    Header: header,
    accessor: accessor
  };
};

export const getTableTextColumn = (field, className) => {
  if (className) {
    return {
      Header: getCustomTableHeader(field),
      accessor: getCustomTableAccessor(field),
      class: className
    };
  }

  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    class: className ? className : undefined
  };
};

export const getOwnerNameField = (headerText = "Owner Name") => {
  return {
    Header: headerText,
    accessor: "owner_name",
  };
};

export const getLimitedTableTextColumn = (field, maxLength, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    class: className ? className : undefined,
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

export const getStringifiedArrayColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        return JSON.stringify(array);
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTaskTypeColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function formatTaskTypeLabel(row) {
      return getTaskTypeLabel(row?.value);
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTaskStatusColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    width: 105,
    Cell: function getTaskStatus(row) {
      const taskStatus = row?.value;
      if (taskStatus == null || taskStatus === "") {
        return (
          <div className="d-flex flex-nowrap">
            <div>{getPipelineStatusIcon("created")}</div>
            <div className="ml-1">Created</div>
          </div>
        );
      }

      return (
        <div className="d-flex flex-nowrap">
          <div>{getPipelineStatusIcon(row)}</div>
          <div className="ml-1">{capitalizeFirstLetter(taskStatus)}</div>
        </div>
      );
    },
    class: className ? className : undefined
  };
};

export const getLimitedStringifiedArrayColumn = (field, maxLength, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        const value = JSON.stringify(array);
        const truncatedString = truncateString(value ,maxLength);
        
        if (truncatedString !== value) {
          return (<TooltipWrapper innerText={value}><span>{truncatedString}</span></TooltipWrapper>);
        }

        return value;
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getNameValueArrayColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        return array.map((item, index) => {
          return (`${item.name}:${item.value}${array.length > index + 1 ? ',' : ''}`);
        });
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getRoleArrayColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
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

export const getContactArrayColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        return array.map((item, index) => {
          return (`${item.name}:${item.email}:${item.user_id}${array.length > index + 1 ? ',' : ''}`);
        });
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getLimitedContactArrayColumn = (field, maxLength, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
          const valueArr = array.map((item, index) => {
            return (`${item.name}:${item.email}:${item.user_id}${array.length > index + 1 ? ',' : ''}`);
          });

          const value = JSON.stringify(valueArr).replace(/[["\]]/g,'');

          const truncatedString = truncateString(value, maxLength);
          
          if (truncatedString !== value) {
            return (<TooltipWrapper innerText={value}><span>{truncatedString}</span></TooltipWrapper>);
          }
  
          return value;
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTagColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function stringifyArray(row) {
      const tags = row?.value;

      return (
        <TagDisplayer
          tags={tags}
        />
      );
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTagArrayColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        return array.map((tag, index) => {
          return (`${tag.type}: ${tag.value}${array.length > index + 1 ? ',' : ''}`);
        });
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getLimitedTagArrayColumn = (field, maxLength, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        const valueArr = array.map((tag, index) => {
          return (`${tag.type}: ${tag.value}${array.length > index + 1 ? ',' : ''}`);
        });

        const value = JSON.stringify(valueArr).replace(/[["\]]/g,'');

        const truncatedString = truncateString(value, maxLength);

        if (truncatedString !== value) {
          return (<TooltipWrapper innerText={value}><span>{truncatedString}</span></TooltipWrapper>);
        }

        return value;
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableLeaderColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseLeader(row) {
      return row.value ? `${row.value.name} (${row.value.email})` : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableDateColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseDate(row) {
      return row.value ? format(new Date(row.value), "yyyy-MM-dd") : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableDateTimeColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseDateTime(row) {
      return row.value ? format(new Date(row.value), "yyyy-MM-dd', 'hh:mm a") : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableDateAndTimeUntilValueColumn = (header, id, fakeColumn = "fakeColumn", className) => {
  return {
    Header: header,
    accessor: fakeColumn,
    Cell: function parseDate(row) {
      const originalRow = row.row.original;
      return originalRow[id] ? convertFutureDateToDhmsFromNowString(new Date(originalRow[id])) : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getPipelineActivityStatusColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseStatus(row) {
      if (row?.value == null || row?.value === "") {
        return (
          <div className="d-flex flex-nowrap">
            <div><FontAwesomeIcon icon={faCircle} className="cell-icon yellow my-auto" fixedWidth/></div>
            <div className="ml-1">Unknown</div>
          </div>
        );
      }

      return (
        <div className="d-flex flex-nowrap">
          <div>{getPipelineStatusIcon(row)}</div>
          <div className="ml-1">{capitalizeFirstLetter(row.value)}</div>
        </div>
      );
    },
    class: className ? className : undefined
  };
};

export const getPipelineStatusIcon = (row) => {
  switch (row.value) {
    case "failure":
    case "failed":
      return (<FontAwesomeIcon icon={faTimesCircle} className="cell-icon red my-auto" fixedWidth />);
    case "error":
      return (<FontAwesomeIcon icon={faExclamationCircle} className="cell-icon red my-auto" fixedWidth />);
    case "unknown":
      return (<FontAwesomeIcon icon={faCircle} className="cell-icon yellow my-auto" fixedWidth/>);
    case "rejected":
      return (<FontAwesomeIcon icon={faStopCircle} className="cell-icon red my-auto" fixedWidth/>);
    case "running":
    case "processing event":
      return (<FontAwesomeIcon icon={faPlayCircle} className="cell-icon green my-auto" fixedWidth/>);
    case "queued":
      return (<FontAwesomeIcon icon={faPauseCircle} className="cell-icon green my-auto" fixedWidth/>);
    case "stopped":
    case "halted":
      return (<FontAwesomeIcon icon={faOctagon} className="cell-icon red my-auto" fixedWidth/>);
    case "created":
    default:
      return (<FontAwesomeIcon icon={faCheckCircle} className="cell-icon green my-auto" fixedWidth/>);
  }
};

export const getAssociatedPipelineStatusIcon = (pipelineStatus) => {
  switch (pipelineStatus) {
    case "failure":
    case "failed":
      return (<FontAwesomeIcon icon={faTimesCircle} className="red" fixedWidth />);
    case "error":
      return (<FontAwesomeIcon icon={faExclamationCircle} className="red" fixedWidth />);
    case "unknown":
      return (<FontAwesomeIcon icon={faCircle} className="yellow" fixedWidth/>);
    case "rejected":
      return (<FontAwesomeIcon icon={faStopCircle} className="red" fixedWidth/>);
    case "running":
    case "processing event":
      return (<FontAwesomeIcon icon={faPlayCircle} className="green" fixedWidth/>);
    case "queued":
    case "pending":
      return (<FontAwesomeIcon icon={faPauseCircle} className="green" fixedWidth/>);
    case "stopped":
    case "halted":
      return (<FontAwesomeIcon icon={faOctagon} className="red" fixedWidth/>);
    default:
      return (<FontAwesomeIcon icon={faCheckCircle} className="green" fixedWidth/>);
  }
};

export const getPipelineTypeColumn = (field, className) => {
  return {
    Header: "",
    accessor: getCustomTableAccessor(field),
    Cell: function parseType(workflow) {
      return <PipelineTypesField fieldName={field.id} dataObject={new Model(workflow.row.original, pipelineMetadata, false)} />;
    },
    class: className ? className : "cell-center"
  };
};

export const getCustomTablePipelineStateColumnDefinition = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseStatus(tableRow) {
      const pipelineState = tableRow.row.original[field?.id];

      return (getPipelineStateFieldBase(pipelineState));
    },
    class: className
  };
};

export const getChartPipelineStatusColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseStatus(row) {
      let status = typeof row?.value === "string" ? row.value.toLowerCase() : status;
      switch (status) {
        case "failure":
        case "failed":
          return (<FailIcon />);
        case "unknown":
          return (<WarningIcon/>);
        case "passed":
        case "success":
        case "successful":
          return (<SuccessIcon/>);
        default:
          return status;
      }
    },
    class: className ? className :  undefined
  };
};

export const getChartTrendStatusColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseStatus(row) {
      let status = typeof row?.value === "string" ? row.value.toLowerCase() : status;
      switch (status) {
        case "red":
          return (<ArrowCircleUp />);
        case "neutral":
          return (<PauseCircle/>);
        case "green":
        return (<ArrowCircleDown/>);
        case "-":
          return (<MinusCircle/>);
        default:
          return status;
      }
    },
    class: className ? className :  undefined
  };
};

export const getTableFavoriteColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getFavoritesIcon(row) {
      return <DashboardFavoritesIcon key={row.row.original._id} dashboard={row.row.original} dashboardsActions={dashboardsActions} />;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getTableDeleteColumn = (headerText, deleteFunction, className) => {
  return {
    Header: headerText,
    Cell: function getDeleteIcon(row) {
      return <FontAwesomeIcon icon={faTrash} className="pointer danger-red" onClick={() => {deleteFunction(row?.data[row?.row?.index]); }}/>;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getTableButtonColumn = (accessor = "row", headerText, variant, buttonText, buttonFunction, className, buttonClassName) => {
  return {
    Header: headerText,
    accessor: accessor,
    Cell: function getTableButton(row) {
      return <Button size={"sm"} variant={variant} className={buttonClassName} onClick={() => {buttonFunction(row?.data[row?.row?.index]);}}>{buttonText}</Button>;
    },
    class: className ? className :  "no-wrap-inline py-1"
  };
};

export const getGitTaskTableRunButtonColumn = (accessor = "row", headerText, variant, buttonText, buttonFunction, className) => {
  return {
    Header: headerText,
    accessor: accessor,
    Cell: function getRunButton(row) {
      return <Button size={"sm"} variant={variant} disabled={row?.data[row?.row?.index].status === "running"} onClick={() => {buttonFunction(row?.data[row?.row?.index]);}} >
        {row?.data[row?.row?.index].status === "running" ? (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> Running </span>) : (<span><FontAwesomeIcon icon={faPlay} className="mr-1" fixedWidth/> {buttonText} </span> ) }
        </Button>;
    },
    class: className ? className :  "no-wrap-inline py-1"
  };
};

export const getDeletePlatformToolTableButtonColumn = (accessor = "row", headerText, variant, buttonText, buttonFunction, className) => {
  return {
    Header: headerText,
    accessor: accessor,
    Cell: function getDeleteButton(row) {
      return <Button size={"sm"} variant={variant} disabled={row?.data[row?.row?.index].toolStatus !== "ACTIVE"} onClick={() => {buttonFunction(row?.data[row?.row?.index]);}} >
                {buttonText}
            </Button>;
    },
    class: className ? className :  "no-wrap-inline py-1"
  };
};
export const getTableBooleanIconColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getStatusIcon(row) {
      return row.value ? <div><FontAwesomeIcon icon={faCheckCircle} className="green ml-2" /></div> :  <div><FontAwesomeIcon icon={faTimesCircle} className="red ml-2" /></div>;
    },
    class: className ? className : "text-left"
  };
};

export const getGitTasksStatusColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseStatus(row) {
      return (        
        <div>{getPipelineStatusIcon(row)}</div>        
      );
    },
    class: className ? className : undefined
  };
};

export const getTableInfoIconColumn = (showInformationFunction, accessor = "row", className) => {
  return {
    Header: "Info",
    accessor: accessor,
    Cell: function getInfoIcon(row) {
      return <FontAwesomeIcon icon={faSearchPlus} className="pointer" onClick={() => {showInformationFunction(row?.data[row?.row?.index]); }}/>;
    },
    class: className ? className : undefined
  };
};

// This just takes the data field and returns the count inside the array
export const getTableArrayCountColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getCount(row) {
      return row.value.length;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getCountColumnWithoutField = (header, accessor, className) => {
  return {
    Header: header,
    accessor: accessor,
    Cell: function getCount(row) {
      return row.value.length;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getRoleAccessLevelColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getRoleAccessLevel(row) {
      const roles = row?.data[row?.row?.index]?.roles;
      const text = row?.value;

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
    class: className ? className :  "no-wrap-inline"
  };
};

export const getValueColumn = (field, valueFormat) => {
  switch (valueFormat) {
    case "boolean":
      return getTableBooleanIconColumn(field);
    case "date":
      return getTableDateColumn(field);
    case "count":
      return getTableArrayCountColumn(field);
    case "text":
    default:
      return getTableTextColumn(field);
  }
};

export const getCheckBoxColumn = (handleChange) => {
  return {
    Header: "",
    accessor: "row",
    Cell: function getCheckboxForRow(row) {
      const idx = row.row["index"];
      const item = row["data"][idx];
      return <Form.Check
        inline
        type={"checkbox"}
        name={item.committedFile}
        id={idx}
        disabled={item.checkAll}
        checked={!!item.isChecked}
        onChange = {() => {
          item.isChecked = !item.isChecked;
          handleChange(item);
        }}
      />;
    },
  };
};

export const getStaticIconColumn = (icon, accessor = "row", className) => {
  return {
    Header: "",
    accessor: accessor,
    Cell: function StaticIcon(){
      return <FontAwesomeIcon icon={icon} />;
    },
    class: className ? className : undefined
  };
};

export const getStaticInfoColumn = (icon, accessor = "row", className) => {
  return {
    Header: "",
    accessor: accessor,
    Cell: function StaticIcon(){
      return <FontAwesomeIcon icon={faSearchPlus} />;
    },
    class: className ? className : undefined
  };
};