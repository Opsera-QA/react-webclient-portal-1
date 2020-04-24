/* This controls layout of the "count" blocks at the top of a dashboard layout
 this accepts a data object with the necessary block values and is only for UI rendering

Expecting data in this format:
[{ name: "Successful Builds", value: "1" footer: "footer text", status: "success" }]

 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";

function SummaryCountBlocksView( { data } ) {

  useEffect(() => {
    console.log("Rendering Blocks for data", data);
  }, [data]);

  const setStatusLevel = (status) => {
    if (status === "danger") {
      return "red";
    } else if (status === "warning") {
      return "yellow";
    } else {
      return null;
    }
    

  };

  return (
    <>
      {data !== undefined && data.length > 0 ? 
        <div className="d-flex align-content-stretch justify-content-center w-100 mb-3 count-container mt-3">
          
          {data.map(function(item, index){
            return <div key={ index } className="count-block m-2 w-100 text-center align-self-center h-100">
              <div className="count-block-primary-text">{item.value}</div>
              <div className={"count-block-subtext mt-2 "+ setStatusLevel(item.status)}>{item.name}</div>
              <div className="count-block-footer w-100 text-muted mb-1">{item.footer}</div>
            </div>;
          })}

        </div> : null }
    </>
  );
}

SummaryCountBlocksView.propTypes = {
  data: PropTypes.array
};


export default SummaryCountBlocksView;
