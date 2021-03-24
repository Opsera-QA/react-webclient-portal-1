import { format } from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import {
  faCheckCircle,
  faCircle, faOctagon,
  faPause, faPauseCircle, faPlayCircle, faSearchPlus,
  faSpinner,
  faStop,
  faStopCircle,
  faTimesCircle, faTrash, faPlay
} from "@fortawesome/pro-light-svg-icons";
import React from "react";
import Model from "core/data_model/model";
import PipelineTypesField from "components/common/form_fields/pipelines/PipelineTypesField";
import PipelineStatus from "components/workflow/pipelines/PipelineStatus";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import DashboardFavoritesIcon from "components/common/icons/dashboards/DashboardFavoritesIcon";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import {Button} from "react-bootstrap";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import {convertFutureDateToDhmsFromNowString} from "components/common/helpers/date-helpers";
import {truncateString} from "components/common/helpers/string-helpers";

const getTableHeader = (field) => {
  return field["label"];
};

const getTableAccessor = (field) => {
  return field["id"];
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
      Header: getTableHeader(field),
      accessor: getTableAccessor(field),
      class: className
    };
  }

  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    class: className ? className : undefined
  };
};

export const getLimitedTableTextColumn = (field, maxLength, className) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    class: className ? className : undefined,
    Cell: (row) => {
      return row.value ? truncateString(row.value, maxLength) : "";
    },
  };
};

export const getStringifiedArrayColumn = (field, className) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (row) => {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        return JSON.stringify(array);
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getNameValueArrayColumn = (field, className) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (row) => {
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
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (row) => {
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
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (row) => {
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

export const getTagArrayColumn = (field, className) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (row) => {
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

export const getTableDateColumn = (field, className) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (row) => {
      return row.value ? format(new Date(row.value), "yyyy-MM-dd") : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableDateTimeColumn = (field, className) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (row) => {
      return row.value ? format(new Date(row.value), "yyyy-MM-dd', 'hh:mm a") : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableDateAndTimeUntilValueColumn = (header, id, fakeColumn = "fakeColumn", className) => {
  return {
    Header: header,
    accessor: fakeColumn,
    Cell: (row) => {
      const originalRow = row.row.original;
      return originalRow[id] ? convertFutureDateToDhmsFromNowString(new Date(originalRow[id])) : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getPipelineActivityStatusColumn = (field, className) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (row) => {
      return (
        <div className="d-flex flex-nowrap">
          <div>{getPipelineStatusIcon(row)}</div>
          <div className="ml-1">{row.value}</div>
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
      return (<FontAwesomeIcon icon={faTimesCircle} className="cell-icon red vertical-align-item" fixedWidth />);
    case "unknown":
      return (<FontAwesomeIcon icon={faCircle} className="cell-icon yellow vertical-align-item" fixedWidth/>);
    case "rejected":
      return (<FontAwesomeIcon icon={faStopCircle} className="cell-icon red vertical-align-item" fixedWidth/>);
    case "running":
    case "processing event":
      return (<FontAwesomeIcon icon={faPlayCircle} className="cell-icon green vertical-align-item" fixedWidth/>);
    case "queued":
      return (<FontAwesomeIcon icon={faPauseCircle} className="cell-icon green vertical-align-item" fixedWidth/>);
    case "stopped":
    case "halted":
      return (<FontAwesomeIcon icon={faOctagon} className="cell-icon red vertical-align-item" fixedWidth/>);
    default:
      return (<FontAwesomeIcon icon={faCheckCircle} className="cell-icon green vertical-align-item" fixedWidth/>);
  }
};

export const getAssociatedPipelineStatusIcon = (pipelineStatus) => {
  switch (pipelineStatus) {
    case "failure":
    case "failed":
      return (<FontAwesomeIcon icon={faTimesCircle} className="red" fixedWidth />);
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
    accessor: getTableAccessor(field),
    Cell: (workflow) => {
      return <PipelineTypesField fieldName={field.id} dataObject={new Model(workflow.row.original, pipelineMetadata, false)} />;
    },
    class: className ? className : "cell-center"
  };
};

export const getTablePipelineStatusColumn = (field, className) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (workflow) => {
      let pipelineStatus = pipelineHelpers.getPipelineStatus(workflow.row.original);

      switch (pipelineStatus) {
      case "failed":
        return (
          <div className="red">
            <PipelineStatus className="red"
                            innerText={"An error has occurred in this pipeline.  See activity logs for details."}
                            icon={faTimesCircle} statusText={"Failed"} tableColumn={true}/>
          </div>
        );
      case "running":
        return (
          <div className="green">
            <PipelineStatus innerText={"A pipeline operation is currently in progress."} icon={faSpinner}
                            statusText={"Running"} tableColumn={true}/>
          </div>
        );
      case "paused":
        return (
          <div className="yellow">
            <PipelineStatus innerText={"The pipeline operation is currently paused."} icon={faPause}
                            statusText={"Paused"} tableColumn={true}/>
          </div>
        );
      case "success":
        return (
          <div className="green">
            <PipelineStatus innerText={"The most recent run of this pipeline was successful."} icon={faCheckCircle}
                            statusText={"Successful"} tableColumn={true}/>
          </div>
        );
      default:
        return (
          <PipelineStatus innerText={"This pipeline is not currently running."} icon={faStop}
                          statusText={"Stopped"} tableColumn={true}/>
        );
      }
    },
    class: className ? className :  "text-left"
  };
};

export const getChartPipelineStatusColumn = (field, className) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (row) => {
      return row.value ? (
        row.value === "FAILURE" || row.value === "failed" || row.value === "failure" ? (
          <>
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
              <div>
                <FontAwesomeIcon icon={faTimesCircle} className="cell-icon red" />
              </div>
              <div className="ml-1">{row.value}</div>
            </div>
          </>
        ) : (
          row.value === "UNSTABLE" || row.value === "unstable" ? (
            <>
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <div>
                  <FontAwesomeIcon icon={faCircle} className="cell-icon yellow" />
                </div>
                <div className="ml-1">{row.value}</div>
              </div>
            </>
          ) : (
          <>
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
              <div>
                <FontAwesomeIcon icon={faCheckCircle} className="cell-icon green" />
              </div>
              <div className="ml-1">{row.value}</div>
            </div>
          </>
          )
      )) : (
        "unknown"
      );
    },
    class: className ? className :  undefined
  };
};

export const getTableFavoriteColumn = (field, className) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (row) => {
      return <DashboardFavoritesIcon key={row.row.original._id} dashboard={row.row.original} dashboardsActions={dashboardsActions} />;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getTableDeleteColumn = (headerText, deleteFunction, className) => {
  return {
    Header: headerText,
    Cell: (row) => {
      return <FontAwesomeIcon icon={faTrash} className="pointer danger-red" onClick={() => {deleteFunction(row?.data[row?.row?.index]); }}/>;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getTableButtonColumn = (accessor = "row", headerText, variant, buttonText, buttonFunction, className, buttonClassName) => {
  return {
    Header: headerText,
    accessor: accessor,
    Cell: (row) => {
      return <Button size={"sm"} variant={variant} className={buttonClassName} onClick={() => {buttonFunction(row?.data[row?.row?.index]);}}>{buttonText}</Button>;
    },
    class: className ? className :  "no-wrap-inline py-1"
  };
};

export const getGitTaskTableRunButtonColumn = (accessor = "row", headerText, variant, buttonText, buttonFunction, className) => {
  return {
    Header: headerText,
    accessor: accessor,
    Cell: (row) => {
      return <Button size={"sm"} variant={variant} disabled={row?.data[row?.row?.index].status === "running"} onClick={() => {buttonFunction(row?.data[row?.row?.index]);}} >
        {row?.data[row?.row?.index].status === "running" ? (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> Running </span>) : (<span><FontAwesomeIcon icon={faPlay} className="mr-1" fixedWidth/> {buttonText} </span> ) }
        </Button>;
    },
    class: className ? className :  "no-wrap-inline py-1"
  };
};

export const getTableBooleanIconColumn = (field, className) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (row) => {
      return row.value ? <div><FontAwesomeIcon icon={faCheckCircle} className="green ml-2" /></div> :  <div><FontAwesomeIcon icon={faTimesCircle} className="red ml-2" /></div>;
    },
    class: className ? className : "text-left"
  };
};

export const getTableInfoIconColumn = (showInformationFunction, accessor = "row", className) => {
  return {
    Header: "Info",
    accessor: accessor,
    Cell: (row) => {
      return <FontAwesomeIcon icon={faSearchPlus} className="pointer" onClick={() => {showInformationFunction(row?.data[row?.row?.index]); }}/>;
    },
    class: className ? className : undefined
  };
};

// This just takes the data field and returns the count inside the array
export const getTableArrayCountColumn = (field, className) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (row) => {
      return row.value.length;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getCountColumnWithoutField = (header, accessor, className) => {
  return {
    Header: header,
    accessor: accessor,
    Cell: (row) => {
      return row.value.length;
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
    Cell: (row) => {
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