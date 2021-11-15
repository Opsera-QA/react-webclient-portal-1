import React, {useContext, useState} from "react";
import TableCardView from "components/common/table/TableCardView";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TaskVerticalTabContainer from "components/tasks/TaskVerticalTabContainer";
import NewToolIdentifierOverlay from "components/admin/tools/tool_identifier/NewToolIdentifierOverlay";
import ToolIdentifierTable from "components/admin/tools/tool_identifier/ToolIdentifierTable";
import ToolIdentifierCardView from "components/admin/tools/tool_identifier/ToolIdentifierCardView";
import toolIdentifierMetadata from "components/admin/tools/tool_identifier/tool-identifier-metadata";

function ToolIdentifierTableCardView(
  {
    toolIdentifierFilterModel,
    setToolIdentifierFilterModel,
    isLoading,
    loadData,
    toolIdentifiers,
    isMounted, taskMetadata
  }) {
  const toastContext = useContext(DialogToastContext);
  const isTrue = useState(true);

  const getCardView = () => {
    return (
      <ToolIdentifierCardView
        toolIdentifierMetadata={toolIdentifierMetadata}
        toolIdentifiers={toolIdentifiers}
        isLoading={isLoading}
        loadData={loadData}
      />
    );
  };

  const getTableView = () => {
    return (
      <ToolIdentifierTable
        isMounted={isMounted}
        toolIdentifiers={toolIdentifiers}
        isLoading={isLoading}
        loadData={loadData}
        taskMetadata={taskMetadata}
        taskFilterModel={toolIdentifierFilterModel}
        setTaskFilterModel={setToolIdentifierFilterModel}
      />
    );
  };


  const getTableCardView = () => {
    if (isTrue) {
      return (
        <TableCardView
          filterModel={toolIdentifierFilterModel}
          data={toolIdentifiers}
          isLoading={isLoading}
          cardView={getCardView()}
          tableView={getTableView()}
        />
      );
    }

    return (
      <Row className={"mx-0"}>
        <Col sm={2} className={"px-0"}>
          <TaskVerticalTabContainer
            isLoading={isLoading}
            loadData={loadData}
            taskFilterModel={toolIdentifierFilterModel}
          />
        </Col>
        <Col sm={10} className={"px-0"}>
          <TableCardView
            filterModel={toolIdentifierFilterModel}
            data={toolIdentifiers}
            isLoading={isLoading}
            cardView={getCardView()}
            tableView={getTableView()}
          />
        </Col>
      </Row>
    );
  };


  const createToolIdentifier = () => {
    toastContext.showOverlayPanel(<NewToolIdentifierOverlay loadData={loadData} isMounted={isMounted} />);
  };

  return (
      <FilterContainer
        loadData={loadData}
        addRecordFunction={createToolIdentifier}
        filterDto={toolIdentifierFilterModel}
        setFilterDto={setToolIdentifierFilterModel}
        supportViewToggle={true}
        isLoading={isLoading}
        metadata={taskMetadata}
        body={getTableCardView()}
        titleIcon={faTools}
        title={"Tool Identifiers"}
        type={"Tool Identifier"}
        className="px-2 pb-2"
      />
  );
}

ToolIdentifierTableCardView.propTypes = {
  toolIdentifiers: PropTypes.array,
  isLoading: PropTypes.bool,
  toolIdentifierFilterModel: PropTypes.object,
  setToolIdentifierFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  taskMetadata: PropTypes.object,
};

export default ToolIdentifierTableCardView;