import React from "react";
import PropTypes from "prop-types";
import {faSortDown, faSortUp} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function MakeupTableHeader(
  {
    data,
    headerGroups,
    isLoading,
  }) {
  const getHeaderColumn = (column, key) => {
    return (
      <th className="px-2" key={key} {...column.getHeaderProps(column.getSortByToggleProps())}>
        <div style={{display: "flex", flexWrap: "nowrap"}}>
          <div>{column.render("Header")}</div>
          <div className="ml-1">
            {column.isSorted && <IconBase icon={column.isSortedDesc ? faSortDown : faSortUp}/>}
          </div>
        </div>
      </th>
    );
  };

  if ((isLoading === true && !Array.isArray(data) || data.length === 0) || !Array.isArray(headerGroups)) {
    return (
      <thead>
        <tr>
          <th colSpan="12">
            <div className="no-header-text" />
          </th>
        </tr>
      </thead>
    );
  }

  return (
    <thead>
      {headerGroups.map((headerGroup, i) => (
        <tr key={i} {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column, j) => (getHeaderColumn(column, j)))}
        </tr>
      ))}
    </thead>
  );
}

MakeupTableHeader.propTypes = {
  headerGroups: PropTypes.array,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default MakeupTableHeader;