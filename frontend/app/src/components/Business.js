import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function Business(props) {
    const linkName = "/business/" + props.id;

    return(
    <div>
        <ListItem button component="a" href={linkName}>
            <ListItemText primary={props.name}></ListItemText>
            <ListItemText primary={props.address} style={{display:'flex', justifyContent:'flex-end'}}></ListItemText>

        </ListItem>
    </div>
    );
}



export default Business;