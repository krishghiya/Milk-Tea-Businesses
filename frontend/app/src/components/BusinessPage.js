import React from "react";
import ListItemText from "@material-ui/core/ListItemText";

function BusinessPage(props){
    return(
        <div>
            <img src={props.image_url} />
            <ListItemText primary={props.name}></ListItemText>
            <ListItemText primary={props.address}></ListItemText>
            <ListItemText primary={props.rating}></ListItemText>
            <ListItemText primary={props.display_phone}></ListItemText>
            <ListItemText primary={props.review_count}></ListItemText>
        </div>
    );
}

export default BusinessPage;