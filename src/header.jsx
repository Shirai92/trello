import React from 'react';

const styleX = () => {
    return {
        backgroundColor: 'red',
        color: 'blue'

    }
}

export default class Header extends React.Component {
    render() {
        return (
            <div style={styleX()}>
                <p> Navigacja </p>
            </div>
        );
    }
}