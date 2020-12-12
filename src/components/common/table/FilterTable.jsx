import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faTimes} from "@fortawesome/pro-solid-svg-icons";
import Model from "../../../core/data_model/model";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import {Col, Row} from "react-bootstrap";
import {faPlus, faSpinner} from "@fortawesome/free-solid-svg-icons";
import ActiveFilterDisplayer from "../filters/ActiveFilterDisplayer";
import {faSync} from "@fortawesome/pro-solid-svg-icons/faSync";
import FilterTitleBar from "../panels/table_screen_container/FilterTitleBar";

function FilterTable(
  {
    filterDto,
    setFilterDto,
    titleIcon,
    filters,
    tableTitle,
    dropdownFilters,
    children,
    loadData,
    isLoading,
    table,
    addRecordFunction
  }) {
  const resetFilters = async () => {
    let newFilterDto = new Model({...filterDto.getNewObjectFields()}, filterDto.getMetaData(), false);
    let pageSize = filterDto.getData("pageSize");
    newFilterDto.setData("pageSize", pageSize);
    let sortOption = filterDto.getData("sortOption");
    newFilterDto.setData("sortOption", sortOption);
    document.body.click();
    await loadData(newFilterDto);
  };

  const getStackedFilterRemovalIcon = () => {
    return (
      <span className="fa-layers fa-fw">
        <FontAwesomeIcon icon={faFilter}/>
        <FontAwesomeIcon icon={faTimes} transform="right-9 down-5 shrink-4" />
      </span>
    );
  };

  const loadFilters = async () => {
    loadData(filterDto);
    document.body.click();
  };

  const getFilterPopover = () => {
    if (dropdownFilters == null) {
      return null;
    }

    return (
      <Popover id="popover-basic">
        <Popover.Title as="h3" className="filter-title">
          <Row>
            <Col sm={10} className="my-auto">Filters</Col>
            <Col sm={2} className="text-right">
              <FontAwesomeIcon
                icon={faTimes}
                className="pointer"
                onClick={() => { document.body.click();}}
              />
            </Col>
          </Row>
          </Popover.Title>
        <Popover.Content className="filter-body">
          {dropdownFilters}
          <div className="d-flex justify-content-between">
            <div className="w-50 mr-1">
              <Button type="primary" size="sm" onClick={() => loadFilters()} className="w-100">
                <span className="pr-3"><FontAwesomeIcon icon={faFilter} fixedWidth className="mr-2"/>Filter</span>
              </Button>
            </div>
            <div className="w-50 ml-1">
              <Button type="primary" size="sm" onClick={() => resetFilters()} className="w-100">
                <span><span className="mr-2">{getStackedFilterRemovalIcon()}</span>Remove</span>
              </Button>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    );
  };

  const getNewRecordButton = () => {
    if (addRecordFunction == null) {
      return <></>;
    }

    return (
      <Button variant="primary" size="sm" onClick={() => {addRecordFunction();}} className="mr-2">
        <span><FontAwesomeIcon icon={faPlus} className="mr-1" fixedWidth/>New {filterDto.getType()}</span>
      </Button>
    )
  };

  const getRefreshButton = () => {
    if (loadData == null) {
      return <></>;
    }

    return (
      <Button variant="primary" size="sm" onClick={() => {loadData();}} className="mr-2">
        <span><FontAwesomeIcon icon={faSync} fixedWidth/></span>
      </Button>
    )
  };

  const getFilterButtons = () => {
    // Only show filter buttons, if filters exists
    if (dropdownFilters === undefined) {
      if (children !== null) {
        return (
          <div>
            <Button type="primary" size="sm" onClick={() => resetFilters()}>
              <span>{getStackedFilterRemovalIcon()}</span>
            </Button>
          </div>
        );
      }

      return null;
    }

    return (
      <div className="d-flex">
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={getFilterPopover()} className="filter-popover">
          <div>
            <Button type="primary" size="sm"><span><FontAwesomeIcon icon={faFilter} fixedWidth/></span></Button>
          </div>
        </OverlayTrigger>
        <div><Button className={"ml-2"} type="primary" size="sm" onClick={() => resetFilters()}><span>{getStackedFilterRemovalIcon()}</span></Button></div>
      </div>
    )
  };

  const getTableFilters = () => {
    return (
      <div className="ml-auto d-flex">
        <div className="d-flex">{children}</div>
        <div>{getNewRecordButton()}</div>
        <div>{getRefreshButton()}</div>
        <div>{getFilterButtons()}</div>
      </div>
    )
  };

  if (filterDto == null) {
    return <></>;
  }

  return (
    <div>
      <div className="filter-table content-container content-card-1 w-100">
        <div className="px-2 d-flex content-block-header">
          <FilterTitleBar isLoading={isLoading} title={tableTitle} titleIcon={titleIcon} tableFilters={getTableFilters()}/>
        </div>
        <Row className="d-flex mx-0 active-filter-bar">
          <ActiveFilterDisplayer filterDto={filterDto} setFilterDto={setFilterDto} loadData={loadData} filters={filters}/>
        </Row>
      </div>
      <div>
        {table}
      </div>
    </div>
  );
}

FilterTable.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  dropdownFilters: PropTypes.any,
  isLoading: PropTypes.bool,
  titleIcon: PropTypes.object,
  tableTitle:PropTypes.string,
  children: PropTypes.any,
  table: PropTypes.object,
  loadData: PropTypes.func,
  addRecordFunction: PropTypes.func,
  filters: PropTypes.array
};

export default FilterTable;


