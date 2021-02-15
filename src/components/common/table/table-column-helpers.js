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
  faTimesCircle, faTrash
} from "@fortawesome/pro-light-svg-icons";
import React from "react";
import Model from "core/data_model/model";
import PipelineTypesField from "components/common/form_fields/pipelines/PipelineTypesField";
import PipelineStatus from "components/workflow/pipelines/PipelineStatus";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import DashboardFavoritesIcon from "components/common/icons/DashboardFavoritesIcon";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import {Button} from "react-bootstrap";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";

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

export const getTableTextColumn = (field, classNames) => {
  if (classNames) {
    return {
      Header: getTableHeader(field),
      accessor: getTableAccessor(field),
      class: classNames
    };
  }

  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field)
  };
};

export const getStringifiedArrayColumn = (field) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (props) => {
      const array = props?.value;

      if (Array.isArray(array) && array.length > 0) {
        return JSON.stringify(array);
      }

      return "";
    },
    class: "no-wrap-inline"
  };
};

export const getNameValueArrayColumn = (field) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (props) => {
      const array = props?.value;

      if (Array.isArray(array) && array.length > 0) {
        return array.map((item, index) => {
          return (`${item.name}:${item.value}${array.length > index + 1 ? ',' : ''}`);
        });
      }

      return "";
    },
    class: "no-wrap-inline"
  };
};

export const getRoleArrayColumn = (field) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (props) => {
      const array = props?.value;

      if (Array.isArray(array) && array.length > 0) {
        return array.map((item, index) => {
          return (`${item.role}:${item.user}:${item.group}${array.length > index + 1 ? ',' : ''}`);
        });
      }

      return "";
    },
    class: "no-wrap-inline"
  };
};

export const getContactArrayColumn = (field) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (props) => {
      const array = props?.value;

      if (Array.isArray(array) && array.length > 0) {
        return array.map((item, index) => {
          return (`${item.name}:${item.email}:${item.user_id}${array.length > index + 1 ? ',' : ''}`);
        });
      }

      return "";
    },
    class: "no-wrap-inline"
  };
};

export const getTagArrayColumn = (field) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (props) => {
      const array = props?.value;

      if (Array.isArray(array) && array.length > 0) {
        return array.map((tag, index) => {
          return (`${tag.type}: ${tag.value}${array.length > index + 1 ? ',' : ''}`);
        });
      }

      return "";
    },
    class: "no-wrap-inline"
  };
};

export const getTableDateColumn = (field) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (props) => {
      return props.value ? format(new Date(props.value), "yyyy-MM-dd") : "";
    },
    class: "no-wrap-inline"
  };
};

export const getTableDateTimeColumn = (field) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (props) => {
      return props.value ? format(new Date(props.value), "yyyy-MM-dd', 'hh:mm a") : "";
    },
    class: "no-wrap-inline"
  };
};

export const getPipelineActivityStatusColumn = (field) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (props) => {
      return (
        <div className="d-flex flex-nowrap">
          <div>{getPipelineStatusIcon(props)}</div>
          <div className="ml-1">{props.value}</div>
        </div>
      );
    }
  }
};

export const getPipelineStatusIcon = (props) => {
  switch (props.value) {
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
}

export const getPipelineTypeColumn = (field) => {
  return {
    Header: "",
    accessor: getTableAccessor(field),
    Cell: (workflow) => {
      return <PipelineTypesField fieldName={field.id} dataObject={new Model(workflow.row.original, pipelineMetadata, false)} />;
    },
    class: "cell-center"
  };
};

export const getTablePipelineStatusColumn = (field) => {
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
    class: "text-left"
  };
};

export const getTableFavoriteColumn = (field, getAccessToken) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (props) => {
      return <DashboardFavoritesIcon key={props.row.original._id} dashboard={props.row.original} dashboardsActions={dashboardsActions} getAccessToken={getAccessToken}/>
    },
    class: "no-wrap-inline"
  };
};

export const getTableDeleteColumn = (headerText, deleteFunction) => {
  return {
    Header: headerText,
    Cell: (props) => {
      return <FontAwesomeIcon icon={faTrash} className="pointer danger-red" onClick={() => {deleteFunction(props?.data[props?.row?.index]); }}/>
    },
    class: "no-wrap-inline"
  };
};

export const getTableButtonColumn = (accessor = "row", headerText, variant, buttonText, buttonFunction) => {
  return {
    Header: headerText,
    accessor: accessor,
    Cell: (props) => {
      return <Button variant={variant} onClick={() => {buttonFunction(props?.data[props?.row?.index])}}>{buttonText}</Button>
    },
    class: "no-wrap-inline"
  };
};

export const getTableBooleanIconColumn = (field) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (props) => {
      return props.value ? <div><FontAwesomeIcon icon={faCheckCircle} className="green ml-2" /></div> :  <div><FontAwesomeIcon icon={faTimesCircle} className="red ml-2" /></div>;
    },
    class: "text-left"
  };
};

export const getTableInfoIconColumn = (showInformationFunction, accessor = "row") => {
  return {
    Header: "Info",
    accessor: "row",
    Cell: (props) => {
      return <FontAwesomeIcon icon={faSearchPlus} className="pointer" onClick={() => {showInformationFunction(props?.data[props?.row?.index]); }}/>;
    },
  };
};

// This just takes the data field and returns the count inside the array
export const getTableArrayCountColumn = (field) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (props) => {
      return props.value.length;
    },
    class: "no-wrap-inline"
  };
};

export const getCountColumnWithoutField = (header, accessor) => {
  return {
    Header: header,
    accessor: accessor,
    Cell: (props) => {
      return props.value.length;
    },
    class: "no-wrap-inline"
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
}

export const getCheckBoxColumn = (handleChange) => {
  return {
    Header: "",
    accessor: "row",
    Cell: (props) => {      
      const idx = props.row["index"];      
      const item = props["data"][idx];
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
}