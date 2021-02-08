import React from "react";
import PropTypes from "prop-types";
import {Button, Col, Row} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {faFilter, faTimes} from "@fortawesome/pro-light-svg-icons";
import StackedFilterRemovalIcon from "components/common/icons/StackedFilterRemovalIcon";
import Popover from "react-bootstrap/Popover";
import Model from "core/data_model/model";

function FilterButton({ dropdownFilters, filterDto, loadData, className }) {
  const loadFilters = async () => {
    loadData(filterDto);
    document.body.click();
  };

  const resetFilters = async () => {
    let newFilterDto = new Model({...filterDto.getNewObjectFields()}, filterDto.getMetaData(), false);
    let pageSize = filterDto.getData("pageSize");
    newFilterDto.setData("pageSize", pageSize);
    let sortOption = filterDto.getData("sortOption");
    newFilterDto.setData("sortOption", sortOption);
    document.body.click();
    await loadData(newFilterDto);
  };

  const getInnerFilters = () => {
    if (dropdownFilters) {
      if (Array.isArray(dropdownFilters)) {
        return (dropdownFilters.map((child, index) => {
          return (<div key={index} className="mb-2">{child}</div>);
        }))
      }
      else {
        return <div className="mb-2">{dropdownFilters}</div>;
      }
    }
  }

  const getPopover = () => {
    return (
      <Popover id="popover-basic" className="popover-filter">
        <Popover.Title as="h3" className="filter-title">
          <Row>
            <Col sm={10} className="my-auto">Filters</Col>
            <Col sm={2} className="text-right">
              <FontAwesomeIcon
                icon={faTimes}
                className="pointer"
                onClick={() => {
                  document.body.click();
                }}
              />
            </Col>
          </Row>
        </Popover.Title>
        <Popover.Content className="filter-body">
          {getInnerFilters()}
          <div className="d-flex justify-content-between">
            <div className="w-50 mr-1">
              <Button variant="primary" size="sm" onClick={() => loadFilters()} className="w-100">
                <span className="pr-3"><FontAwesomeIcon icon={faFilter} fixedWidth className="mr-2"/>Filter</span>
              </Button>
            </div>
            <div className="w-50 ml-1">
              <Button variant="outline-secondary" size="sm" onClick={() => resetFilters()} className="w-100"
                      disabled={filterDto.getData("activeFilters").length === 0}>
                <span><span className="mr-2"><StackedFilterRemovalIcon/></span>Remove</span>
              </Button>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    );
  };

  if (dropdownFilters === undefined) {
    return null;
  }

  return (
    <div className={className}>
      <div className="d-flex">
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={getPopover()} className="filter-popover">
          <div>
            <Button variant="outline-primary" size="sm"><span><FontAwesomeIcon icon={faFilter} fixedWidth/></span></Button>
          </div>
        </OverlayTrigger>
        <div>
          <Button className={"ml-1"} disabled={filterDto?.getData("activeFilters").length === 0} variant="outline-primary" size="sm" onClick={() => resetFilters()}>
            <StackedFilterRemovalIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

FilterButton.propTypes = {
  isLoading: PropTypes.bool,
  filterDto: PropTypes.object,
  dropdownFilters: PropTypes.any,
  loadData: PropTypes.func,
  className: PropTypes.string
};

export default FilterButton;