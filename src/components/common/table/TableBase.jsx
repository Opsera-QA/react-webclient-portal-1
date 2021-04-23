import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Grid, TreeGrid} from "dhx-suite-package";
import "dhx-suite-package/codebase/suite.css";
import DtoBottomPagination from "components/common/pagination/DtoBottomPagination";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faSpinner} from "@fortawesome/pro-light-svg-icons";
import DtoTopPagination from "components/common/pagination/DtoTopPagination";
import {useWindowSize} from "components/common/hooks/useWindowSize";

function TableBase(
  {
    tableStyleName,
    columns,
    data,
    noDataMessage,
    onRowSelect,
    rowStyling,
    isLoading,
    paginationDto,
    setPaginationDto,
    loadData,
    scrollOnLoad,
    groupBy,
    sort,
    handleExpansion
  }) {
  const containerRef = useRef(null);
  const [grid, setGrid] = useState(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    const treeGrid = setUpTreeGrid();

    return () => {
      treeGrid.destructor();
    };
  }, [data]);

  // Refresh width on resize
  useEffect(() => {
    if (grid) {
      grid.config.width = null;
    }
  }, [windowSize, grid]);


  const setUpTreeGrid = () => {
    let grid = new Grid(containerRef.current, {
      columns: columns,
      autoWidth: true,
      data: data || [],
      htmlEnable: true,
      resizable: true,
      // headerRowHeight: 30,
      rowHeight: 30,
      rowCss: (row) => {
        rowStyling ? rowStyling(row) : "";
      },
    });

    if (groupBy) {
      grid.groupBy(groupBy);
    }

    if (onRowSelect) {
      grid.events.on("cellClick", (row, column, e) => {
        onRowSelect(grid, row, column, e);
      });
    }

    if (sort) {
      grid.data.sort(sort);
    }

    if (handleExpansion) {
      handleExpansion(grid);
      grid.config.width = null;
    }

    setGrid(grid);
    return grid;
  };

  const getTableBody = () => {
    if (isLoading && (data == null || data.length === 0)) {
      return (
        <div className={"h-100 w-100 table-border"}>
          <div className="w-100 info-text text-center p-3">
            <div className="row" style={{ height:"150px", width: "100%"}}>
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
            <div className="row" style={{ height:"150px", width: "100%"}}>
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
        style={{width: "100%", minHeight: "500px"}}
        ref={el => (containerRef.current = el)}
      />
    );
  };

  // TODO: Replace with new paginator
  const getNewPaginator = () => {
    return (
      <DtoBottomPagination paginationDto={paginationDto} setPaginationDto={setPaginationDto} isLoading={isLoading} loadData={loadData} scrollOnLoad={scrollOnLoad} />
    );
  };


  return (
    <div className={tableStyleName}>
      <div className={"top-pagination-grid"}>
        <DtoTopPagination paginationDto={paginationDto} setPaginationDto={setPaginationDto} isLoading={isLoading} loadData={loadData} />
      </div>
      {getTableBody()}
      <div className="table-footer">
        {getNewPaginator()}
      </div>
    </div>
  );
}

TableBase.propTypes = {
  tableStyleName: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  noDataMessage: PropTypes.string,
  onRowSelect: PropTypes.func,
  rowStyling: PropTypes.func,
  initialState: PropTypes.object,
  showHeaderText: PropTypes.bool,
  isLoading: PropTypes.bool,
  tableTitle: PropTypes.string,
  tableFilterBar: PropTypes.object,
  paginationDto: PropTypes.object,
  setPaginationDto: PropTypes.func,
  loadData: PropTypes.func,
  scrollOnLoad: PropTypes.bool,
  groupBy: PropTypes.string,
  sort: PropTypes.any,
  handleExpansion: PropTypes.func
};

TableBase.defaultProps = {
  tableStyleName: "custom-table",
  showHeaderText: true,
  data: [],
  isLoading: false,
  tableTitle: ""
};

export default TableBase;