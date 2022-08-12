import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableCardView from "components/common/table/TableCardView";
import WorkspaceVerticalTabContainer from "components/workspace/views/WorkspaceVerticalTabContainer";

export default function WorkspaceViewContainer() {
  const [activeView, setActiveView] = useState("pipelines");

  const getViews = () => {
    return (
      <Row className={"mx-0"}>
        <Col sm={2} className={"px-0 makeup-tree-container"}>
          <WorkspaceVerticalTabContainer
            isLoading={isLoading}
            loadData={loadData}
            taskFilterModel={taskFilterModel}
          />
        </Col>
        <Col sm={10} className={"px-0"}>
          <TableCardView
            filterModel={taskFilterModel}
            data={taskData}
            isLoading={isLoading}
            cardView={getCardView()}
            tableView={getTableView()}
          />
        </Col>
      </Row>
    );
  };

  return (
    <div>
      test
    </div>
  );
}

WorkspaceViewContainer.propTypes = {};
