import React from 'react';

export default class Form extends React.Component {
    render() {
        return (
            <div id="formWrapper">
                <h1>Location: </h1>
                <form onSubmit={this.props.getWeather}>
                    <input type="text" name="city" placeholder="city" />
                    <input type="text" name="country" placeholder="country" />
                    <button>Get weather</button>
                </form>
            </div>
        );
    }
}