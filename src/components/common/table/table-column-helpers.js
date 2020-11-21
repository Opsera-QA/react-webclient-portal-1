// TODO: Create field helper class
import { format } from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faPause, faSpinner, faStop, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PipelineHelpers from "../../workflow/pipelineHelpers";
import PipelineStatus from "../../workflow/pipelines/PipelineStatus";

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

export const getTableTextColumn = (field) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field)
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

export const getTablePipelineStatusColumn = (field) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (workflow) => {
      let pipelineStatus = PipelineHelpers.getPipelineStatus(workflow.row.original);

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
        default:
          return (
            <PipelineStatus innerText={"This pipeline is not currently running."} icon={faStop}
                            statusText={"Stopped"} tableColumn={true}/>
          );
      }
    },
    class: "text-center"
  };
};

export const getTableBooleanIconColumn = (field) => {
  return {
    Header: getTableHeader(field),
    accessor: getTableAccessor(field),
    Cell: (props) => {
      return props.value ?  <div className="text-center"><FontAwesomeIcon icon={faCheckCircle} className="green mx-auto" /></div> :  <div className="text-center"><FontAwesomeIcon icon={faTimesCircle} className="red mx-auto" /></div>;
    },
    class: "no-wrap-inline"
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