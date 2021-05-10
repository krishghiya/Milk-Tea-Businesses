import React from "react";
import "../BusinessPage.css";

function BusinessPage(props){
    return(
        <div class="center">
            <h1>{props.name}</h1>
            <img src={props.image_url} alt={props.name} width="25%" height="25%"/>
            <div>
            <br/>
            <h2>Address</h2>
            <p>{props.address}</p>
            </div>
            <br/>
            <div>
            <h2>Rating</h2>
            <p>{props.rating} stars</p>
            </div>
            <br/>
            <div>
            <h2>Phone Number</h2>
            <p>{props.display_phone}</p>
            </div>
            <br/>
            <div>
            <h2>Number of Reviews</h2>
            <p>{props.review_count}</p>
            </div>
        </div>
    );
}

export default BusinessPage;