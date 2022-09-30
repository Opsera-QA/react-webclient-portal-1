import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Grid} from "@opsera/dhx-suite-package";
import {useWindowSize} from "components/common/hooks/useWindowSize";
import {hasStringValue} from "components/common/helpers/string-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

function VanitySelectionTableBase(
  {
    columns,
    data,
    onRowSelect,
    rowStyling,
    sort,
    height,
    onCellEdit,
    selectedId,
    selectedModel,
    rowSelection,
    sortable,
  }) {
  const containerRef = useRef(null);
  const [grid, setGrid] = useState(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    const gridInstance = setUpGrid();

    return () => {
      gridInstance?.destructor();
    };
  }, [columns, selectedModel]);

  useEffect(() => {
    if (grid && Array.isArray(data)) {
      grid.data.parse(data);

      grid.selection.removeCell();

      if (hasStringValue(selectedId)) {
        const selection = grid.data.find((item) => {
          return item?._id === selectedId;
        });

        if (selection) {
          grid.selection.setCell(selection);
        }
      }
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
      data: Array.isArray(data) && data.length > 0 ? data : [],
      htmlEnable: true,
      resizable: true,
      sortable: sortable,
      selection: rowSelection,
      headerRowHeight: 30,
      rowHeight: 30,
      // TODO: Wire up custom row styling
      rowCss: (row) => {
        let styling = onRowSelect != null ? "pointer" : "hide-grid-pointer";

        if (rowStyling) {
          styling = `${styling} ${rowStyling(row)}`;
        }

        return styling;
      },
    });

    if (onRowSelect) {
      grid.selection.events.on("beforeSelect", async (row, column, e) => {
        if (row._id === selectedId) {
          return true;
        }

        const response = await onRowSelect(selectedModel, grid, row);
        return response === true;
      });
    }

    // TODO: Don't use for now
    if (onCellEdit) {
      grid.events.on("BeforeEditEnd", (value, row, column) => {
        return onCellEdit(value, row, column);
      });
    }

    if (isMongoDbId(selectedId)) {
      const selection = grid.data.find((item, index) => {
        return item?._id === selectedId;
      });

      if (selection) {
        grid.selection.setCell(selection);
      }
    }

    if (sort) {
      grid.data.sort(sort);
    }

    setGrid(grid);
    return grid;
  };

  return (
    <div
      className={"w-100"}
      id="grid"
      style={{minHeight: height}}
      ref={el => (containerRef.current = el)}
    />
  );
}

VanitySelectionTableBase.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  onRowSelect: PropTypes.func,
  selectedId: PropTypes.any,
  rowStyling: PropTypes.func,
  sort: PropTypes.string,
  height: PropTypes.string,
  onCellEdit: PropTypes.func,
  rowSelection: PropTypes.string,
  selectedModel: PropTypes.object,
  sortable: PropTypes.bool,
};

VanitySelectionTableBase.defaultProps = {
  data: [],
  isLoading: false,
  height: "500px",
  rowSelection: "row",
  sortable: true,
};

export default VanitySelectionTableBase;