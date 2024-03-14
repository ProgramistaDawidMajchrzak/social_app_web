import React from 'react';
import { useParams } from "react-router-dom";

function UserView() {
    let { id } = useParams();

    return (
        <div><h2>User ID: {id}</h2></div>
    )
}

export default UserView