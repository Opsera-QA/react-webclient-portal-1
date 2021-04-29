import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Tree} from "dhx-suite-package";
import "dhx-suite-package/codebase/suite.css";
import {useWindowSize} from "components/common/hooks/useWindowSize";

function TreeBase({ data, onRowSelect }) {
  const containerRef = useRef(null);
  const [tree, setTree] = useState(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    const treeGrid = setUpTree();

    return () => {
      treeGrid.destructor();
    };
  }, [data]);

  // Refresh width on resize
  useEffect(() => {
    if (tree) {
      tree.config.width = null;
    }
  }, [windowSize, tree]);


  const setUpTree = () => {
    const tree = new Tree("tree_container", {
      data: Array.isArray(data) && data.length > 0 ? data : [],
    });

    if (onRowSelect) {
      tree.events.on("cellClick", (row, column, e) => {
        // onRowSelect(grid, row, column, e);
      });
    }

    // if (handleExpansion) {
    //   handleExpansion(tree);
    //   tree.config.width = null;
    // }

    setTree(tree);
    return tree;
  };

  return (
    <div id="tree_container" className={"w-100"} ref={el => (containerRef.current = el)} />
  );
}

TreeBase.propTypes = {
  data: PropTypes.array,
  onRowSelect: PropTypes.func,
};

TreeBase.defaultProps = {
  data: [],
};

export default TreeBase;