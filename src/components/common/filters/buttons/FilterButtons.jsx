import React from "react";
import PropTypes from "prop-types";
import {Button, Col, Row} from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {faFilter, faTimes} from "@fortawesome/pro-light-svg-icons";
import StackedFilterRemovalIcon from "components/common/icons/StackedFilterRemovalIcon";
import Popover from "react-bootstrap/Popover";
import Model from "core/data_model/model";
import IconBase from "components/common/icons/IconBase";

function FilterButtons(
  {
    dropdownFilters,
    filterDto,
    loadData,
    className,
    isLoading,
    filterBtnClassName,
    includeButtonText,
    filterDropdownTitle,
    inlineFilters,
  }) {
  const loadFilters = async () => {
    if (isLoading === true) {
      return;
    }

    filterDto?.setData("currentPage", 1);
    loadData(filterDto);
    document.body.click();
  };

  const resetFilters = async () => {
    if (isLoading === true) {
      return;
    }

    let newFilterModel;
    const sortOption = filterDto?.getData("sortOption");
    const pageSize = filterDto?.getData("pageSize");

    if (filterDto?.getNewInstance) {
      newFilterModel = filterDto.getNewInstance();
    } else {
      newFilterModel = new Model({...filterDto.getNewObjectFields()}, filterDto.getMetaData(), false);
    }

    if (sortOption) {
      newFilterModel.setData("pageSize", pageSize);
    }

    if (pageSize) {
      newFilterModel.setData("sortOption", sortOption);
    }

    if (loadData) {
      await loadData(newFilterModel);
    }
  };

  const resetFiltersAndCloseItem = async () => {
    resetFilters();
    document.body.click();
  };

  const getInnerFilters = () => {
    if (dropdownFilters) {
      if (Array.isArray(dropdownFilters)) {
        return (dropdownFilters.map((child, index) => {
          return (<div key={index} className="mb-2">{child}</div>);
        }));
      }
      else {
        return <div className="mb-2">{dropdownFilters}</div>;
      }
    }
  };

  const getPopover = () => {
    if (filterDto == null || isLoading) {
      return <></>;
    }

    return (
      <Popover id="popover-basic" className="popover-filter">
        <Popover.Title as="h3" className="filter-title">
          <Row>
            <Col sm={10} className="my-auto">{filterDropdownTitle ? filterDropdownTitle : 'Filters'}</Col>
            <Col sm={2} className="text-right">
              <IconBase
                icon={faTimes}
                className={"pointer"}
                onClickFunction={() => {
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
              <Button variant="secondary" disabled={isLoading} size="sm" onClick={() => loadFilters()} className="w-100">
                <span className="pr-3"><IconBase icon={faFilter} className={"mr-2"}/>Filter</span>
              </Button>
            </div>
            <div className="w-50 ml-1">
              <Button variant="outline-secondary" size="sm" onClick={() => resetFiltersAndCloseItem()} className="w-100"
                      disabled={isLoading || filterDto == null || filterDto?.getData("activeFilters").length === 0}>
                <span><span className="mr-2"><StackedFilterRemovalIcon/></span>Remove</span>
              </Button>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    );
  };

  const getFilterButton = () => {
    if (dropdownFilters) {
      return (
        <OverlayTrigger trigger={isLoading === true ? undefined : "click"} rootClose placement="bottom" overlay={getPopover()} className="filter-popover">
          <div className={"mr-2"}>
            <Button className={filterBtnClassName} disabled={filterDto == null || isLoading} variant="secondary" size="sm">
              <span><IconBase icon={faFilter}/></span>
              {includeButtonText && <span>Filter Results</span>}
            </Button>
          </div>
        </OverlayTrigger>
      );
    }
  };

  if (dropdownFilters == null && inlineFilters == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className="d-flex">
        {getFilterButton()}
        <div>
          <Button
            className={`${filterBtnClassName}`}
            disabled={filterDto == null || filterDto?.getArrayData("activeFilters").length === 0 || isLoading}
            variant={"secondary"}
            size={"sm"}
            onClick={() => resetFilters()}
          >
            <StackedFilterRemovalIcon />
            {includeButtonText && <span className={'ml-1'}>Clear Results</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}

FilterButtons.propTypes = {
  isLoading: PropTypes.bool,
  filterDto: PropTypes.object,
  dropdownFilters: PropTypes.any,
  inlineFilters: PropTypes.any,
  loadData: PropTypes.func,
  className: PropTypes.string,
  filterBtnClassName: PropTypes.string,
  includeButtonText: PropTypes.bool,
  filterDropdownTitle: PropTypes.string
};

export default FilterButtons;