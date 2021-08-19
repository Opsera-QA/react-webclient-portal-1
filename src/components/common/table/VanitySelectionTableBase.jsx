import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Grid} from "dhx-suite-package";
import "dhx-suite-package/codebase/suite.css";
import {useWindowSize} from "components/common/hooks/useWindowSize";

function VanitySelectionTableBase({columns, data, onRowSelect, rowStyling, sort, height, onCellEdit, selectedItem, rowSelection}) {
  const containerRef = useRef(null);
  const [grid, setGrid] = useState(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    setUpGrid();
  }, [columns]);

  useEffect(() => {
    if (grid && Array.isArray(data)) {
      grid.data.parse(data);

      grid.selection.removeCell();

      if (selectedItem) {
        const parsedObject = JSON.parse(selectedItem);
        const selection = grid.data.find((item) => {return item.getData("_id") === parsedObject?._id;});

        if (selection) {
          grid.selection.setCell(selection);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (grid && selectedItem) {
      const parsedObject = JSON.parse(selectedItem);

      grid.selection.removeCell();

      const selection = grid.data.find((item, index) => {
        return item.getData("_id") === parsedObject?._id;
      });

      if (selection) {
        grid.selection.setCell(selection);
      }
    }

  }, [selectedItem]);

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
        const response = await onRowSelect(grid, row, column, e);
        return response === true;
      });
    }

    if (onCellEdit) {
      grid.events.on("BeforeEditEnd", (value, row, column) => {
        return onCellEdit(value, row, column);
      });
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
  selectedItem: PropTypes.any,
  rowStyling: PropTypes.func,
  sort: PropTypes.string,
  height: PropTypes.string,
  onCellEdit: PropTypes.func,
  rowSelection: PropTypes.string
};

VanitySelectionTableBase.defaultProps = {
  data: [],
  isLoading: false,
  height: "500px",
  rowSelection: "row"
};

export default VanitySelectionTableBase;