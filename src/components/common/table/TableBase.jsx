import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Grid} from "dhx-suite-package";
import "dhx-suite-package/codebase/suite.css";
import {useWindowSize} from "components/common/hooks/useWindowSize";

function TableBase({ columns, data, onRowSelect, rowStyling, sort, height }) {
  const containerRef = useRef(null);
  const [grid, setGrid] = useState(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    setUpGrid();
  }, [columns]);

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
      css: "vanity-table",
      headerRowHeight: 30,
      rowHeight: 30,
      // TODO: Wire up custom row styling
      rowCss: (row) => {
        let styling = onRowSelect != null ? "main-text pointer" : "main-text hide-grid-pointer";

        if (rowStyling) {
          styling = `${styling} ${rowStyling(row)}`;
        }

        return styling;
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

  return (
    <div style={{minHeight: height}}>
      <div
        className={"w-100 h-100"}
        id="grid"
        style={{minHeight: height}}
        ref={el => (containerRef.current = el)}
      />
    </div>
  );
}

TableBase.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  onRowSelect: PropTypes.func,
  rowStyling: PropTypes.func,
  sort: PropTypes.string,
  height: PropTypes.string
};

TableBase.defaultProps = {
  data: [],
  height: "500px"
};

export default TableBase;