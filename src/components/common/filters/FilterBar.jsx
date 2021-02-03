import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faTimes} from "@fortawesome/pro-solid-svg-icons";
import Model from "core/data_model/model";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import {Col, Row} from "react-bootstrap";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ActiveFilterDisplayer from "./ActiveFilterDisplayer";
import {faSync} from "@fortawesome/pro-solid-svg-icons/faSync";
import InlineSearchFilter from "components/common/filters/search/InlineSearchFilter";
import ViewToggle from "components/common/view/ViewToggle";

function FilterBar({ filterDto, setFilterDto, filters, children, loadData, saveCookies, addRecordFunction, customButtons, supportSearch, leftAlignCustomButtons, supportViewToggle}) {
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

  const getInnerFilters = () => {
    if (children) {
      if (Array.isArray(children)) {
        return (children.map((child, index) => {
          return (<div key={index} className="mb-2">{child}</div>);
        }))
      }
      else {
        return <div className="mb-2">{children}</div>;
      }
    }
  }

  const getViewToggle = () => {
    if (supportViewToggle) {
      return <ViewToggle filterDto={filterDto} setFilterDto={setFilterDto} saveCookies={saveCookies} />
    }
  };

  const popover = (
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
        {getInnerFilters()}
        <div className="d-flex justify-content-between">
          <div className="w-50 mr-1">
            <Button type="primary" size="sm" onClick={() => loadFilters()} className="w-100">
              <span className="pr-3"><FontAwesomeIcon icon={faFilter} fixedWidth className="mr-2"/>Filter</span>
            </Button>
          </div>
          <div className="w-50 ml-1">
            <Button type="primary" size="sm" onClick={() => resetFilters()} className="w-100" disabled={filterDto.getData("activeFilters").length === 0}>
              <span><span className="mr-2">{getStackedFilterRemovalIcon()}</span>Remove</span>
            </Button>
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );

  const getNewRecordButton = () => {
    if (!addRecordFunction) {
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

  const getSearchBar = () => {
    if (supportSearch) {
      return (
        <div className="mr-2 inline-search-filter">
          <InlineSearchFilter filterDto={filterDto} setFilterDto={setFilterDto} loadData={loadData} />
        </div>
      )
    }
  };

  const getFilterButtons = () => {
    // Only show filter buttons, if filters exists
    if (children === undefined) {
      return null;
    }

    return (
      <div className="d-flex">
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover} className="filter-popover">
          <div>
            <Button type="primary" size="sm"><span><FontAwesomeIcon icon={faFilter} fixedWidth/></span></Button>
          </div>
        </OverlayTrigger>
        <div>
          <Button className={"ml-2"} disabled={filterDto.getData("activeFilters").length === 0} type="primary" size="sm" onClick={() => resetFilters()}>
            <span>{getStackedFilterRemovalIcon()}</span>
          </Button>
        </div>
      </div>
    )
  };

  const getCustomButtons = () => {
    if (children === undefined) {
      return null;
    }

    return (<div className="mr-2">{customButtons}</div>);
  };

  if (leftAlignCustomButtons) {
    return (
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          {getCustomButtons()}
          {getViewToggle()}
          <ActiveFilterDisplayer filterDto={filterDto} setFilterDto={setFilterDto} loadData={loadData} filters={filters} />
        </div>
        <div className="d-flex">
          {getSearchBar()}
          <div>{getNewRecordButton()}</div>
          <div>{getRefreshButton()}</div>
          <div>{getFilterButtons()}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-between filter-bar mb-2">
      <div className="d-flex">
        {getViewToggle()}
        <ActiveFilterDisplayer filterDto={filterDto} setFilterDto={setFilterDto} loadData={loadData} filters={filters} />
      </div>
      <div className="d-flex">
        {getCustomButtons()}
        {getSearchBar()}
        <div>{getNewRecordButton()}</div>
        <div>{getRefreshButton()}</div>
        <div>{getFilterButtons()}</div>
      </div>
    </div>
  );
}


FilterBar.propTypes = {
  filterDto: PropTypes.object,
  activeFilterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  supportSearch: PropTypes.bool,
  supportViewToggle: PropTypes.bool,
  saveCookies: PropTypes.func,
  customButtons: PropTypes.any,
  children: PropTypes.any,
  loadData: PropTypes.func,
  addRecordFunction: PropTypes.func,
  leftAlignCustomButtons: PropTypes.bool,
  filters: PropTypes.array
};

export default FilterBar;


