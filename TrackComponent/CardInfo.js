import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import "./cardInfo.css";


function CardInfo({title , isRed, active, cases, total,styleColor, ...props}) {
  
 return (
   <Card onClick={props.onClick} className={`track_cards_cases ${active && "selected_card"} ${isRed && "selected_red"}`}>
     <CardContent className="track_cards_cases_content">
       <Typography className="track_cards_cases_content" color="textSecondary">
         {title}
       </Typography>
       <h2
         style={{ color: styleColor }}
         id="track_cards_cases_h2"
         className="track_cards_cases_h2"
       >
         <strong>{cases}</strong>
       </h2>
       <Typography className="track_cards_cases_content" color="textSecondary">
         {total}
       </Typography>
     </CardContent>
   </Card>
 );
}

export default CardInfo
