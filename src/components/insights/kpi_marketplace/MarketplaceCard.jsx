import React from 'react';
import PropTypes from 'prop-types';
import { Card } from "react-bootstrap";
import { formatDistanceToNowStrict } from "date-fns";
import "./marketplace.css";

export default function MarketplaceCard({ data, openModal }) {
  return (
    <Card className="card"  onClick={()=> openModal(data)}>
      {/* TODO: card image needs to be changed once done, for now using a placeholder */}
      <Card.Img variant="top"
        // src={data.img} 
        src="https://via.placeholder.com/800x500.png" 
      />
      <Card.Body>
      <Card.Title>{data.name}</Card.Title>
        <Card.Text>
          <span className="overflow-text">
            {data.description}
          </span>
        </Card.Text>
        {/* <Card.Text> */}
          <ul className="tags">
            {data.tools.map((tool,idx)=>{
              return (idx < 8) ? <li key={idx}><span className="tag">{tool}</span></li> : null
            })}
          </ul>
        {/* </Card.Text> */}
        <Card.Text>
          <small className="text-muted">Last updated {formatDistanceToNowStrict(new Date(data.updatedAt))} ago.</small>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

MarketplaceCard.propTypes = {
  data: PropTypes.object,
  openModal: PropTypes.func
};
