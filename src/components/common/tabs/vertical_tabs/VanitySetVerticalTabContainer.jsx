import React from "react";
import PropTypes from "prop-types";
import {Nav} from "react-bootstrap";
import InlineClientSideSearchFilter from "../../filters/search/InlineClientSideSearchFilter";
import SearchFilter from "../../filters/search/SearchFilter";
import InlineSearchFilter from "../../filters/search/InlineSearchFilter";

function VanitySetVerticalTabContainer(
  {
    children,
    className,
    title,
    filterModel,
    setFilterModel,
    isLoading,
    supportSearch,
    loadData,
    metadata
  }) {
  const getTitleBar = () => {
    if (title != null) {
      return (
        <div className={"makeup-tree-title d-flex"} style={{flex: "0 0 auto"}}>
          <div className={"my-auto m-2"}>{title}</div>
        </div>
      );
    }
  };

  const getSearchBar = () => {
    return (
      <div style={{flex: "0 0 auto"}}>
        <InlineSearchFilter
          isLoading={isLoading}
          supportSearch={supportSearch}
          filterDto={filterModel}
          setFilterDto={setFilterModel}
          loadData={loadData}
          className={loadData != null ? "px-2 pt-2 d-none d-md-block vertical-tab-container-search" : "vertical-tab-container-search"}
          metadata={metadata}
        />
      </div>
    );
  };

  return (
    <div className={className}>
      <div className={"h-100 w-100"} style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        {getTitleBar()}
        {getSearchBar()}
        <Nav variant={"pills"} style={{flex: "1 1 auto", overflow: 'hidden'}} className={"h-100"}>
          <div className={"h-100 w-100"}>
            <div
              className={"makeup-tree-container-body p-2 h-100"}
              // style={{overflowX: "hidden"}}
            >
              {children}
            </div>
          </div>
        </Nav>
      </div>
    </div>
  );
}

VanitySetVerticalTabContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  title: PropTypes.any,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  supportSearch: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  metadata: PropTypes.object,
};

VanitySetVerticalTabContainer.defaultProps = {
  className: "h-100 w-100",
};

export default VanitySetVerticalTabContainer;