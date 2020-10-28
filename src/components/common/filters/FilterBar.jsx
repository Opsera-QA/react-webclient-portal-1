import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faTimes} from "@fortawesome/pro-solid-svg-icons";
import Model from "../../../core/data_model/model";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import {Col, Row} from "react-bootstrap";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ActiveFilterDisplayer from "./ActiveFilterDisplayer";
import {faSync} from "@fortawesome/pro-solid-svg-icons/faSync";

function FilterBar({ filterDto, setFilterDto, filters, children, loadData, addRecordFunction, activeFilterDto}) {
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
    loadData();
    document.body.click();
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
        {children && children.map((child, index) => {
          return (<div key={index} className="mb-2">{child}</div>);
        })}
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
        <div><Button className={"ml-2"} type="primary" size="sm" onClick={() => resetFilters()}><span>{getStackedFilterRemovalIcon()}</span></Button></div>
      </div>
    )
  };

  return (
    <div className="d-flex justify-content-between filter-bar">
      <div className="d-flex">
        <ActiveFilterDisplayer filterDto={activeFilterDto} setFilterDto={setFilterDto} loadData={loadData} filters={filters} />
      </div>
      <div className="d-flex">
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
  children: PropTypes.any,
  loadData: PropTypes.func,
  addRecordFunction: PropTypes.func,
  filters: PropTypes.array
};

export default FilterBar;


