import React, {useState} from "react";
import PropTypes from "prop-types";
import {INSIGHTS_HELP_DOCUMENT_TREE} from "components/common/help/documentation/insights/insights.help_documents";
import TreeBase from "components/common/tree/TreeBase";

const HELP_DOCUMENTATION_TREE = [
...INSIGHTS_HELP_DOCUMENT_TREE,
];

function HelpDocumentationTree({ setCurrentView }) {
  const [treeWidget, setTreeWidget] = useState(undefined);

  const onTreeItemClick = (treeItem) => {
    if (treeItem) {
      setCurrentView(treeItem.id);
    }
  };

  return (
    <div className={"h-100 scroll-y hide-x-overflow"}>
      <TreeBase
        data={HELP_DOCUMENTATION_TREE}
        onItemClick={onTreeItemClick}
        setParentWidget={setTreeWidget}
        expanded={true}
      />
    </div>
  );
}

HelpDocumentationTree.propTypes = {
  setCurrentView: PropTypes.func,
};


export default HelpDocumentationTree;
