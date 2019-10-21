import React from 'react';

export default class TodayPage extends React.Component {
    render() {
        return (
            <div id="weatherToday">
                {/* First part to make sure it is not there without a search. Conditional logic. */}
                { this.props.city && this.props.country && <h2 id="city">{this.props.city}, {this.props.country}</h2> }
                {/* I build mode skal der ikke være slash foran img!! Ellers skal der. */}
                { this.props.img && <img alt="weather" src={`img/${this.props.img}.png`} /> }
                <div>
                    { this.props.temperature && <p>Current temperature: {this.props.temperature} °C</p> }
                    { this.props.mintemp && <p>Lowest temperature: {this.props.mintemp} °C</p> }
                    { this.props.maxtemp && <p>Highest temperature: {this.props.maxtemp} °C</p> }
                    { this.props.wind && <p>Wind speed: {this.props.wind} m/s</p> }
                    { this.props.humidity && <p>Humidity: {this.props.humidity}%</p> }
                    { this.props.description && <p>Conditions: {this.props.description} </p> }
                    { this.props.error && <p>{this.props.error} </p> }
                </ div>

            </div>
        );
    }
}