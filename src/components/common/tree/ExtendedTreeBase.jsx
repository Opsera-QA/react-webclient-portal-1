import React, {useState} from "react";
import PropTypes from "prop-types";
import TreeBase from "components/common/tree/TreeBase";
import VanityBottomPaginatorBase from "components/common/pagination/VanityBottomPaginatorBase";

function ExtendedTreeBase(
  {
    selectedId,
    selectTreeItemFunction,
    mainTreeData,
    secondaryTreeData,
  }) {
  const [mainTreeWidget, setMainTreeWidget] = useState(undefined);
  const [secondaryTreeWidget, setSecondaryTreeWidget] = useState(undefined);

  const onMainTreeItemClick = (treeItem) => {
    if (secondaryTreeWidget) {
      secondaryTreeWidget?.selection?.remove();
    }

    if (treeItem) {
      selectTreeItemFunction(treeItem);
    }
  };

  const onSecondaryTreeItemClick = (treeItem) => {
    if (mainTreeWidget) {
      mainTreeWidget?.selection?.remove();
    }

    if (treeItem) {
      selectTreeItemFunction(treeItem);
    }
  };

  if (mainTreeData == null || secondaryTreeData == null) {
    return null;
  }

  return (
    <div className={"table-tree"}>
      <div className={"scroll-y hide-x-overflow table-tree-with-paginator-and-secondary-tree"}>
        <TreeBase
          data={mainTreeData}
          onItemClick={onMainTreeItemClick}
          setParentWidget={setMainTreeWidget}
          selectedId={selectedId}
        />
      </div>
      <div className={"secondary-table-tree"}>
        <TreeBase
          data={secondaryTreeData}
          onItemClick={onSecondaryTreeItemClick}
          setParentWidget={setSecondaryTreeWidget}
          treeId={"secondary-table-tree"}
          selectedId={selectedId}
        />
      </div>
      <div>
        <VanityBottomPaginatorBase
          widgetData={mainTreeWidget?.data}
          pageSize={20}
        />
      </div>
    </div>
  );
}

ExtendedTreeBase.propTypes = {
  mainTreeData: PropTypes.array,
  secondaryTreeData: PropTypes.array,
  selectTreeItemFunction: PropTypes.func,
  selectedId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default ExtendedTreeBase;