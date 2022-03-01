import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Pagination} from "@opsera/dhx-suite-package";

function VanityBottomPaginatorBase({ widgetData, pageSize, onPageChange }) {
  const containerRef = useRef(null);
  const [paginator, setPaginator] = useState(null);

  useEffect(() => {
    let paginator;
    if (widgetData) {
      paginator = setUpPaginator();
    }

    return () => {
      paginator?.destructor();
    };
  }, [widgetData]);

  const setUpPaginator = () => {
    const paginator = new Pagination(containerRef?.current, {
      data: widgetData,
      pageSize: pageSize
    });

    if (onPageChange) {
      paginator.events.on("change", (activePage) => {
        onPageChange(activePage);
      });
    }

    setPaginator(paginator);
    return paginator;
  };

  return (
    <div id="bottom_paginator" className={"w-100"} ref={el => (containerRef.current = el)} />
  );
}

VanityBottomPaginatorBase.propTypes = {
  widgetData: PropTypes.object,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default VanityBottomPaginatorBase;