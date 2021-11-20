import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TopPaginator from "components/common/pagination/v2/TopPaginator";
import BottomPaginator from "components/common/pagination/v2/BottomPaginator";
import axios from "axios";

// TODO: Implement
function ClientSidePaginationMakeupTable(
  {
    isLoading,
    children
  }) {
  const [paginationModel, setPaginationModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (newPaginationModel = paginationModel) => {
  };

  if (paginationModel == null || paginationModel?.showPagination() === false) {
    return children;
  }

  return (
    <div className="pagination-container">
      <TopPaginator paginationModel={paginationModel} isLoading={isLoading} loadData={loadData} />
      {children}
      <BottomPaginator nextGeneration={true} loadData={loadData} isLoading={isLoading} paginationModel={paginationModel} />
    </div>
  );
}

ClientSidePaginationMakeupTable.propTypes = {
  isLoading: PropTypes.bool,
  paginationModel: PropTypes.object,
  children: PropTypes.any,
  loadData: PropTypes.func,
};

export default ClientSidePaginationMakeupTable;