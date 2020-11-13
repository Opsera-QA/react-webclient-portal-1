// TODO: Create field helper class
import { format } from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import React from "react";

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