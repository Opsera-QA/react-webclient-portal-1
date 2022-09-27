import React from "react";
import PropTypes from "prop-types";
import {Nav} from "react-bootstrap";
import ClientSideSearchFilterTextInput from "components/common/filters/search/ClientSideSearchFilterTextInput";

// TODO: Add pagination support and finish before implmenting
export default function VanitySetClientSidePaginatedVerticalTabContainer(
  {
    children,
    className,
    title,
    filterModel,
    setFilterModel,
    isLoading,
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
      <div
        style={{
          backgroundColor: "#F3F3F1",
        }}
      >
        <ClientSideSearchFilterTextInput
          disabled={isLoading}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          className={"m-1"}
        />
      </div>
    );
  };

  return (
    <div className={className}>
      <div
        className={"h-100 w-100"}
        style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}
      >
        {getTitleBar()}
        {getSearchBar()}
        <Nav
          variant={"pills"}
          style={{flex: "1 1 auto", overflow: 'hidden'}} className={"h-100"}
        >
          <div className={"h-100 w-100"}>
            <div
              className={"makeup-tree-container-body p-2 h-100"}
              style={{overflowX: "hidden"}}
            >
              {children}
            </div>
          </div>
        </Nav>
      </div>
    </div>
  );
}

VanitySetClientSidePaginatedVerticalTabContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  title: PropTypes.any,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  isLoading: PropTypes.bool,
};

VanitySetClientSidePaginatedVerticalTabContainer.defaultProps = {
  className: "h-100 w-100",
};