import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import simpleNumberLocalizer from "react-widgets-simple-number";
import pipelineActivityMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-activity-metadata";
import {
  FILTER_TYPES,
  getPipelineActivityStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import PipelineRunFilter from "components/common/filters/pipelines/activity_logs/pipeline_run/PipelineRunFilter";
import FilterContainer from "components/common/table/FilterContainer";
import PipelineTaskDetailViewer from "components/common/modal/PipelineTaskDetailViewer";
import ExportPipelineActivityLogButton from "components/common/buttons/export/pipelines/ExportPipelineActivityLogButton";
import BooleanFilter from "components/common/filters/boolean/BooleanFilter";
import TableBase from "components/common/table/TableBase";
import TreeBase from "components/common/tree/TreeBase";
import TreeAndTableBase from "components/common/table/TreeAndTableBase";
import PaginationContainer from "components/common/pagination/PaginationContainer";

function PipelineActivityLogTable({ formattedActivityData, unformattedData, loadData, isLoading, pipeline, pipelineActivityFilterDto, setPipelineActivityFilterDto }) {
  const fields = pipelineActivityMetadata.fields;
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  simpleNumberLocalizer();

  const columns = useMemo(
    () => [
      {...getTableTextColumn(fields.find(field => { return field.id === "run_count";}), undefined, 100, FILTER_TYPES.SELECT_FILTER)},
        // , class: "cell-center no-wrap-inline"},
      getTableTextColumn(fields.find(field => { return field.id === "step_name";}), undefined, 200, FILTER_TYPES.SELECT_FILTER),
      getTableTextColumn(fields.find(field => { return field.id === "action";}), undefined, 200, FILTER_TYPES.SELECT_FILTER),
      // getTableTextColumn(fields.find(field => { return field.id === "tool_identifier";})),
      getTableTextColumn(fields.find(field => { return field.id === "message";})),
      getPipelineActivityStatusColumn(fields.find(field => { return field.id === "status";})),
      getTableDateTimeColumn(fields.find(field => { return field.id === "createdAt";}))
    ],
    [],
  );

  const onRowSelect = (treeGrid, row, column, e) => {
    if (column.id === "run_count") {
      return;
    }

    if (row._id == null) {
      const isExpanded = row.$opened;

      if (isExpanded === true) {
        treeGrid.collapse(row.id);
      }
      else {
        treeGrid.expand(row.id);
      }

      return;
    }

    setModalData(row);
    setShowModal(true);
  };

  const handleExpansion = (treeGrid) => {
    const lastRun = formattedActivityData[0]?.run_count;

    if (lastRun) {
      treeGrid.collapseAll();
      treeGrid.expand(lastRun);
    }
  };

  const getNoDataMessage = () => {
    if (pipelineActivityFilterDto?.getData("search") !== "") {
      return ("Could not find any results with the given keywords.");
    }

    return ("Pipeline activity data has not been generated yet. Once this pipeline begins running, it will publish details here.");
  };

  const getTable = () => {
    return (
      <TableBase
        columns={columns}
        data={formattedActivityData}
        isLoading={isLoading}
        noDataMessage={getNoDataMessage()}
        onRowSelect={onRowSelect}
        handleExpansion={handleExpansion}
        treeComponent={<TreeBase data={dataset}/>}
      />
    );
  };

  const getTree = () => {
    return (
      <div className={"w-25"}>
        <TreeBase data={dataset}/>
      </div>
    );
  };

  const getPipelineActivityTable = () => {
    return (
      <PaginationContainer
        loadData={loadData}
        setFilterDto={setPipelineActivityFilterDto}
        filterDto={pipelineActivityFilterDto}
        isLoading={isLoading}
      >
        <div className={"d-flex w-100"}>
          {getTable()}
        </div>
      </PaginationContainer>
    );


    // return (
    //   <TreeAndTableBase
    //     data={formattedActivityData}
    //     isLoading={isLoading}
    //     noDataMessage={getNoDataMessage()}
    //     tableComponent={getTable()}
    //     loadData={loadData}
    //     paginationModel={pipelineActivityFilterDto}
    //     setPaginationModel={setPipelineActivityFilterDto}
    //     treeComponent={getTree()}
    //   />
    // );
  };

  const getDropdownFilters = () => {
    return (
      <div className="pb-2 w-100">
        <PipelineRunFilter filterDto={pipelineActivityFilterDto} setFilterDto={setPipelineActivityFilterDto} maximumRunCount={pipeline?.workflow?.run_count} className={"pb-2"}/>
        <BooleanFilter filterDto={pipelineActivityFilterDto} setFilterDto={setPipelineActivityFilterDto} fieldName={"hide_status"} />
      </div>
      // {/*TODO: Make specific pipeline activity version when pulling specific tool identifiers is known*/}
      // {/*<ToolIdentifierFilter filterDto={pipelineActivityFilterDto}  setFilterDto={setPipelineActivityFilterDto} />*/}
    );
  };

  const dataset = [
    {
      "value": "Books",
      "id": "books",
      "opened": true,
      "items": [
        {
          "value": "History",
          "id": "history",
          "items": [{
            "value": "John Mack Faragher",
            "id": "jmf",
            "icon": {
              "folder": "fas fa-book",
              "openFolder": "fas fa-book-open",
              "file": "fas fa-file"
            }
          },
            {
              "value": "Jim Dwyer",
              "id": "jd"
            },
            {
              "value": "Larry Schweikart",
              "id": "ls"
            }]
        },
        {
          "value": "Fiction & Fantasy",
          "id": "fantasy",
          "items": [{
            "value": "Audrey Niffenegger",
            "id": "af"
          },
            {
              "value": "Philip Roth",
              "id": "pr"
            }]
        },
        {
          "value": "Teens",
          "id": "teens",
          "items": [{
            "value": "Joss Whedon",
            "id": "jw"
          },
            {
              "value": "Meg Cabot",
              "id": "mc"
            },
            {
              "value": "Garth Nix",
              "id": "gn"
            }]
        }
      ]
    }
  ];

  return (
    <div className={"mr-2"}>
      <FilterContainer
        showBorder={false}
        loadData={loadData}
        filterDto={pipelineActivityFilterDto}
        setFilterDto={setPipelineActivityFilterDto}
        isLoading={isLoading}
        title={"Pipeline Logs"}
        titleIcon={faClipboardList}
        body={getPipelineActivityTable()}
        dropdownFilters={getDropdownFilters()}
        supportSearch={true}
        exportButton={<ExportPipelineActivityLogButton className={"ml-2"} isLoading={isLoading} activityLogData={unformattedData} />}
      />
      <PipelineTaskDetailViewer
        pipelineData={pipeline}
        pipelineTaskData={modalData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

PipelineActivityLogTable.propTypes = {
  formattedActivityData: PropTypes.array,
  unformattedData: PropTypes.array,
  isLoading: PropTypes.bool,
  pipelineActivityFilterDto: PropTypes.object,
  setPipelineActivityFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  pipeline: PropTypes.object
};

export default PipelineActivityLogTable;