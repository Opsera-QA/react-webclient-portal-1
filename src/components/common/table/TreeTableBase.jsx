import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import { TreeGrid } from "dhx-suite-package";
import "dhx-suite-package/codebase/suite.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faSpinner} from "@fortawesome/pro-light-svg-icons";
import {useWindowSize} from "components/common/hooks/useWindowSize";

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
    handleExpansion
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
    if (isLoading && (data == null || data.length === 0)) {
      return (
        <div className={"h-100 w-100 table-border"}>
          <div className="w-100 info-text text-center p-3">
            <div className="row" style={{height: "150px", width: "100%"}}>
              <div className="col-sm-12 my-auto text-center">
                <span><FontAwesomeIcon icon={faSpinner} spin className="mr-2 mt-1"/>Loading Data</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (!isLoading && (data == null || data.length === 0)) {
      return (
        <div className={"h-100 w-100 table-border"}>
          <div className="w-100 info-text text-center p-3">
            <div className="row" style={{height: "150px", width: "100%"}}>
              <div className="col-sm-12 my-auto text-center">
                <span><FontAwesomeIcon icon={faExclamationCircle} className="mr-2 mt-1"/>{noDataMessage}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        id="treegrid"
        style={{minHeight: "500px"}}
        ref={el => (containerRef.current = el)}
      />
    );
  };

  return (getTableBody());
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
  handleExpansion: PropTypes.func
};

TreeTableBase.defaultProps = {
  data: [],
  isLoading: false,
};

export default TreeTableBase;