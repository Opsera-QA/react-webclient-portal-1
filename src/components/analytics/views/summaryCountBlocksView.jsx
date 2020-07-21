/* This controls layout of the "count" blocks at the top of a dashboard layout
 this accepts a data object with the necessary block values and is only for UI rendering

Expecting data in this format:
[{ name: "Successful Builds", value: "1" footer: "footer text", status: "success" }]

 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";

function SummaryCountBlocksView( { data, view } ) {

  useEffect(() => {
    console.log("Rendering Blocks for data", data);
  }, [data]);

  const setStatusLevel = (status) => {
    if (status === "danger") {
      return "red";
    } else if (status === "warning") {
      return "yellow";
    } else if (status === "success") {
      return "green";
    } else {
      return null;
    }
  };

  return (
    <>
      {data !== undefined && data.length > 0 ? 
        <div className="w-100">
          <div className="d-flex justify-content-center">  
          
            {data.map(function(item, index){
              return <div key={ index } className="count-block m-2 w-100 text-center align-self-center" 
                style={view !== "small" ? { maxWidth: "250px", height: "150px" } : {}}>
                <div style={{ width: "100%" }}>
                  <div className="count-block-primary-text">{item.value}</div>
                  <div className={"count-block-subtext mt-2 "+ setStatusLevel(item.status)}>{item.name}</div>
                  {item.footer && <div className="count-block-footer w-100 text-muted mb-1">{item.footer}</div>}
                </div>
              </div>;
            })}

          </div></div> : null }
    </>
  );
}

SummaryCountBlocksView.propTypes = {
  data: PropTypes.array,
  view: PropTypes.string
};


export default SummaryCountBlocksView;
