import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function Business(props) {
    const linkName = "/business/" + props.id;

    return (
        <div>
            <ListItem button component="a" href={linkName} onClick={() => {
                const patchApiUrl = 'http://gimmetea-env.eba-zfp8grcb.us-east-1.elasticbeanstalk.com/increment?id=' + props.id;
                console.log(patchApiUrl);
                fetch(patchApiUrl, {
                    method: 'PATCH',
                    headers: {
                        "Content-type": "application/json"
                    },
                }).then(response => {
                    console.log(response)
                });
            }}>
                <ListItemText primary={props.name}></ListItemText>
                <ListItemText primary={props.address} style={{ display: 'flex', justifyContent: 'flex-end' }}></ListItemText>
            </ListItem>
        </div>
    );
}



export default Business;