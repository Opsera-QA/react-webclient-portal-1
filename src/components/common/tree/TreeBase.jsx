import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Tree} from "dhx-suite-package";
import "dhx-suite-package/codebase/suite.css";
import {useWindowSize} from "components/common/hooks/useWindowSize";

function TreeBase({ data, onItemClick, setParentWidget, expanded }) {
  const containerRef = useRef(null);
  const [tree, setTree] = useState(null);
  const windowSize = useWindowSize();
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const treeGrid = setUpTree();

    return () => {
      treeGrid.destructor();
    };
  }, []);

  useEffect(() => {
    if (tree && Array.isArray(data)) {
      tree.data.parse(data);

      if (selectedId) {
        tree.selection.remove();
        tree.selection.add(selectedId);
      }
      else {
        const id = tree.data.getId(0);

        if (id) {
          tree.selection.add(id);
          setSelectedId(id);
          onItemClick(tree.data.getItem(id));
        }
      }
    }
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

    // TODO: This might cause issues, remove if so
    if (Array.isArray(data) && data.length > 0 && tree.selection.getId() == null && selectedId == null && onItemClick) {
      const id = tree.data.getId(0);
      tree.selection.add(id);
      setSelectedId(id);
      onItemClick(tree.data.getItem(id));
    }

    if (expanded === true) {
      tree.expandAll();
    }

    if (selectedId) {
      tree.selection.remove();
      tree.selection.add(selectedId);
    }

    if (onItemClick) {
      tree.events.on("afterSelect", (id) => {
        setSelectedId(id);
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
      id="tree_container"
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
};

TreeBase.defaultProps = {
  data: [],
};

export default TreeBase;