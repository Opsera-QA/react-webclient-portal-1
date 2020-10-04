import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/pro-solid-svg-icons";
import {faTimes} from "@fortawesome/pro-solid-svg-icons";
import Model from "../../../core/data_model/model";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

function FilterBar({ filterDto, children, loadData}) {
  const resetFilters = async () => {
    let newFilterDto = new Model({...filterDto.getNewObjectFields()}, filterDto.getMetaData(), false);
    let pageSize = filterDto.getData("pageSize");
    newFilterDto.setData("pageSize", pageSize);
    let sortOption = filterDto.getData("sortOption");
    newFilterDto.setData("sortOption", sortOption);
    await loadData(newFilterDto);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3" className="filter-title">Filters</Popover.Title>
      <Popover.Content className="filter-body">
        {children.map((child, index) => {
          return (<div key={index} className="mb-2">{child}</div>);
        })}
        <div className="d-flex justify-content-between">
          <div className="w-50 mr-1">
            <Button type="primary" size="sm" onClick={() => loadData()} className="w-100">
              <span className="pr-3"><FontAwesomeIcon icon={faFilter} fixedWidth className="mr-2"/>Filter</span>
            </Button>
          </div>
          <div className="w-50 ml-1">
            <Button type="primary" size="sm" onClick={() => resetFilters()} className="w-100">
              <span><FontAwesomeIcon icon={faTimes} fixedWidth className="mr-2"/>Remove</span>
            </Button>
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );

  return (
    <div className="d-flex flex-row-reverse filter-bar">
      <div><Button className={"ml-2"} type="primary" size="sm" onClick={() => resetFilters()}><span><FontAwesomeIcon
        icon={faTimes} fixedWidth/></span></Button></div>
      <div className="d-flex">
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover} className="filter-popover">
          <div>
            <Button type="primary" size="sm"><span><FontAwesomeIcon icon={faFilter} fixedWidth/></span></Button>
          </div>
        </OverlayTrigger>
      </div>
    </div>
  );
}


FilterBar.propTypes = {
  filterDto: PropTypes.object,
  children: PropTypes.any,
  loadData: PropTypes.func
};

export default FilterBar;


