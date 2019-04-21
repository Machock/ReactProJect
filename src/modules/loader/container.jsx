import React from "react";

function getDom(uri) {
    let dom = import(`modules/${uri}`);
    return dom;
}

const uri = ["auth", "todo"];

class V extends React.Component {
    render() {
        return (
            <div>
                {uri.map(i => {
                    return getDom(i);
                })}
            </div>
        );
    }
}

export default V;
