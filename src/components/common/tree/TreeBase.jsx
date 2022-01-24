import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Tree} from "dhx-suite-package";
import "dhx-suite-package/codebase/suite.css";
import {useWindowSize} from "components/common/hooks/useWindowSize";

function TreeBase({ data, onItemClick, setParentWidget, expanded, treeId, selectedId }) {
  const containerRef = useRef(null);
  const [tree, setTree] = useState(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    const treeGrid = setUpTree();

    if (treeGrid && Array.isArray(data)) {
      treeGrid.data.parse(data);

      if (selectedId) {
        treeGrid.selection.remove();
        treeGrid.selection.add(selectedId);
      }
    }

    return () => {
      treeGrid.destructor();
    };
  }, [data]);

  useEffect(() => {
    if (tree) {
      if (selectedId) {
        tree.selection.remove();
        tree.selection.add(selectedId);
      }
    }
  }, [selectedId]);

  // Refresh width on resize
  useEffect(() => {
    if (tree) {
      tree.config.width = null;
    }
  }, [windowSize, tree]);

  const setUpTree = () => {
    const tree = new Tree(treeId, {
      data: Array.isArray(data) && data.length > 0 ? data : [],
    });

    if (expanded === true) {
      tree.expandAll();
    }

    if (selectedId) {
      tree.selection.remove();
      tree.selection.add(selectedId);
    }

    if (onItemClick) {
      tree.events.on("afterSelect", (id) => {
        onItemClick(tree.data.getItem(id));
      });
    }

    if (setParentWidget) {
      setParentWidget(tree);
    }

    setTree(tree);
    return tree;
  };

  return (
    <div
      id={treeId}
      className={"w-100 h-100"}
      ref={el => (containerRef.current = el)}
    />
  );
}

TreeBase.propTypes = {
  data: PropTypes.array,
  onItemClick: PropTypes.func,
  setParentWidget: PropTypes.func,
  expanded: PropTypes.bool,
  treeId: PropTypes.string,
  selectedId: PropTypes.string,
};

TreeBase.defaultProps = {
  data: [],
  treeId: "tree-container",
};

export default TreeBase;