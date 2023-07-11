import React from "react";
import PropTypes from "prop-types";
import {Button, Col, Row} from "react-bootstrap";
import {faFilter, faTimes} from "@fortawesome/pro-light-svg-icons";
import StackedFilterRemovalIcon from "components/common/icons/StackedFilterRemovalIcon";
import Popover from "react-bootstrap/Popover";
import IconBase from "components/common/icons/IconBase";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function FilterSelectionPopoverButton(
  {
    dropdownFilters,
    filterDto,
    loadFilters,
    isLoading,
    resetFiltersAndCloseItem,
    filterDropdownTitle,
    filterBtnClassName,
    includeButtonText,
  }) {
  const {
    isFreeTrial,
  } = useComponentStateReference();

  const getInnerFilters = () => {
    if (dropdownFilters) {
      if (Array.isArray(dropdownFilters)) {
        return (dropdownFilters.map((child, index) => {
          return (<div key={index} className="mb-2">{child}</div>);
        }));
      } else {
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
            <Col sm={10} className="my-auto">{filterDropdownTitle}</Col>
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
              <Button variant={isFreeTrial === true ? "secondary" : "primary"} disabled={isLoading} size="sm" onClick={() => loadFilters()} className="w-100">
                <span className="pr-3"><IconBase icon={faFilter} className={"mr-2"}/>Filter</span>
              </Button>
            </div>
            <div className="w-50 ml-1">
              <Button variant="outline-secondary" size="sm" onClick={() => resetFiltersAndCloseItem()} className="w-100"
                disabled={isLoading || filterDto?.getData("activeFilters").length === 0}>
                <span><span className="mr-2"><StackedFilterRemovalIcon/></span>Remove</span>
              </Button>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    );
  };

  return (
    <OverlayTrigger trigger={isLoading === true ? undefined : "click"} rootClose placement="bottom" overlay={getPopover()} className="filter-popover">
      <div className={"mr-2"}>
        <Button className={filterBtnClassName} disabled={filterDto == null || isLoading} variant={isFreeTrial === true ? "secondary" : "outline-primary"} size="sm">
          <span><IconBase icon={faFilter}/></span>
          {includeButtonText && <span>Filter Results</span>}
        </Button>
      </div>
    </OverlayTrigger>
  );
}

FilterSelectionPopoverButton.propTypes = {
  isLoading: PropTypes.bool,
  filterDto: PropTypes.object,
  dropdownFilters: PropTypes.any,
  loadFilters: PropTypes.func,
  resetFiltersAndCloseItem: PropTypes.func,
  filterDropdownTitle: PropTypes.string,
  filterBtnClassName: PropTypes.string,
  includeButtonText: PropTypes.bool,
};

FilterSelectionPopoverButton.defaultProps = {
  filterDropdownTitle: "Filter Selection",
};