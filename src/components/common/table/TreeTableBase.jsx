import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import { TreeGrid } from "@opsera/dhx-suite-package";
import {useWindowSize} from "components/common/hooks/useWindowSize";
import TableBodyLoadingWrapper from "components/common/table/TableBodyLoadingWrapper";

// TODO: extract table loading as we noticed issues, make VanityTreeTable
function TreeTableBase(
  {
    columns,
    data,
    noDataMessage,
    onRowSelect,
    rowStyling,
    isLoading,
    groupBy,
    sort,
    handleExpansion,
    height
  }) {
  const containerRef = useRef(null);
  const [treeGrid, setTreeGrid] = useState(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    const treeGrid = setUpTreeGrid();

    return () => {
      treeGrid.destructor();
    };
  }, [data]);

  // Refresh width on resize
  useEffect(() => {
    if (treeGrid && data) {
      treeGrid.config.width = null;
    }
  }, [windowSize, treeGrid]);


  const setUpTreeGrid = () => {
    let treeGrid = new TreeGrid(containerRef.current, {
      columns: columns,
      autoWidth: true,
      data: Array.isArray(data) && data.length > 0 ? data : [],
      htmlEnable: true,
      resizable: true,
      headerRowHeight: 30,
      rowHeight: 30,
      rowCss: (row) => {
        rowStyling ? rowStyling(row) : "";
      },
    });

    if (groupBy) {
      treeGrid.groupBy(groupBy);
    }

    if (onRowSelect) {
      treeGrid.events.on("cellClick", (row, column, e) => {
        onRowSelect(treeGrid, row, column, e);
      });
    }

    if (sort) {
      treeGrid.data.sort(sort);
    }

    if (handleExpansion) {
      handleExpansion(treeGrid);
      treeGrid.config.width = null;
    }

    setTreeGrid(treeGrid);
    return treeGrid;
  };

  const getTableBody = () => {
    return (
      <div
        id="treegrid"
        style={{minHeight: height}}
        ref={el => (containerRef.current = el)}
      />
    );
  };

  return (
    <TableBodyLoadingWrapper
      isLoading={isLoading}
      data={data}
      tableHeight={height}
      noDataMessage={noDataMessage}
      tableComponent={getTableBody()}
    />
  );
}

TreeTableBase.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  noDataMessage: PropTypes.string,
  onRowSelect: PropTypes.func,
  rowStyling: PropTypes.func,
  isLoading: PropTypes.bool,
  scrollOnLoad: PropTypes.bool,
  groupBy: PropTypes.string,
  sort: PropTypes.any,
  handleExpansion: PropTypes.func,
  height: PropTypes.string
};

TreeTableBase.defaultProps = {
  data: [],
  isLoading: false,
  height: "500px"
};

export default TreeTableBase;