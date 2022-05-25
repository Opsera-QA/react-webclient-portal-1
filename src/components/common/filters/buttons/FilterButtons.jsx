import React from "react";
import PropTypes from "prop-types";
import {Button, Col, Row} from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {faFilter, faTimes} from "@fortawesome/pro-light-svg-icons";
import StackedFilterRemovalIcon from "components/common/icons/StackedFilterRemovalIcon";
import Popover from "react-bootstrap/Popover";
import Model from "core/data_model/model";
import IconBase from "components/common/icons/IconBase";

function FilterButtons({
  dropdownFilters,
  filterDto,
  loadData,
  className,
  isLoading,
  filterBtnClassName,
  includeButtonText,
  filterDropdownTitle
}) {
  const loadFilters = async () => {
    filterDto?.setData("currentPage", 1);
    loadData(filterDto);
    document.body.click();
  };

  const resetFilters = async () => {
    let newFilterModel;

    if (filterDto?.getNewInstance) {
      newFilterModel = filterDto.getNewInstance();
    }
    else {
      newFilterModel = new Model({...filterDto.getNewObjectFields()}, filterDto.getMetaData(), false);
    }

    let pageSize = filterDto.getData("pageSize");
    newFilterModel.setData("pageSize", pageSize);
    let sortOption = filterDto.getData("sortOption");
    newFilterModel.setData("sortOption", sortOption);
    document.body.click();
    await loadData(newFilterModel);
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
            <Button variant="primary" disabled={isLoading} size="sm" onClick={() => loadFilters()} className="w-100">
              <span className="pr-3"><IconBase icon={faFilter} className={"mr-2"}/>Filter</span>
            </Button>
          </div>
          <div className="w-50 ml-1">
            <Button variant="outline-secondary" size="sm" onClick={() => resetFilters()} className="w-100"
                    disabled={isLoading || filterDto == null || filterDto?.getData("activeFilters").length === 0}>
              <span><span className="mr-2"><StackedFilterRemovalIcon/></span>Remove</span>
            </Button>
          </div>
        </div>
      </Popover.Content>
    </Popover>
    );
  };

  if (dropdownFilters == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className="d-flex">
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={getPopover()} className="filter-popover">
          <div>
            <Button className={filterBtnClassName} disabled={filterDto == null || isLoading} variant="outline-primary" size="sm">
              <span><IconBase icon={faFilter}/></span>
              {includeButtonText && <span>Filter Results</span>}
            </Button>
          </div>
        </OverlayTrigger>
        <div>
          <Button className={`ml-2 ${filterBtnClassName}`} disabled={filterDto == null || filterDto?.getData("activeFilters").length === 0 || isLoading} variant="outline-primary" size="sm" onClick={() => resetFilters()}>
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
  loadData: PropTypes.func,
  className: PropTypes.string,
  filterBtnClassName: PropTypes.string,
  includeButtonText: PropTypes.bool,
  filterDropdownTitle: PropTypes.string
};

export default FilterButtons;