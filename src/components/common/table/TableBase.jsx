import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Grid} from "dhx-suite-package";
import "dhx-suite-package/codebase/suite.css";
import {useWindowSize} from "components/common/hooks/useWindowSize";
import TableBodyLoadingWrapper from "components/common/table/TableBodyLoadingWrapper";

function TableBase({ columns, data, noDataMessage, onRowSelect, rowStyling, isLoading, sort }) {
  const containerRef = useRef(null);
  const [grid, setGrid] = useState(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    const grid = setUpGrid();

    return () => {
      grid.destructor();
    };
  }, []);

  useEffect(() => {
    if (grid && Array.isArray(data)) {
      grid.data.parse(data);
    }
  }, [data]);

  // Refresh width on resize
  useEffect(() => {
    if (grid) {
      grid.config.width = null;
    }
  }, [windowSize, grid]);


  const setUpGrid = () => {
    let grid = new Grid(containerRef.current, {
      columns: columns,
      autoWidth: true,
      data: data && Array.isArray(data) && data.length > 0 ? data : [],
      htmlEnable: true,
      resizable: true,
      headerRowHeight: 30,
      rowHeight: 30,
      rowCss: (row) => {
        rowStyling ? rowStyling(row) : "";
      },
    });

    if (onRowSelect) {
      grid.events.on("cellClick", (row, column, e) => {
        onRowSelect(grid, row, column, e);
      });
    }

    if (sort) {
      grid.data.sort(sort);
    }

    setGrid(grid);
    return grid;
  };

  const getTableBody = () => {
    return (
      <div
        className={"w-100"}
        id="grid"
        style={{minHeight: "500px"}}
        ref={el => (containerRef.current = el)}
      />
    );
  };

  return (
    <TableBodyLoadingWrapper
      isLoading={isLoading}
      data={data}
      noDataMessage={noDataMessage}
      tableComponent={getTableBody()}
    />
  );
}

TableBase.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  noDataMessage: PropTypes.string,
  onRowSelect: PropTypes.func,
  rowStyling: PropTypes.func,
  isLoading: PropTypes.bool,
  sort: PropTypes.string,
  handleExpansion: PropTypes.func
};

TableBase.defaultProps = {
  data: [],
  isLoading: false,
};

export default TableBase;