import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TodayPage from './components/forecasts/TodayPage';
import AboutPage from './components/about/AboutPage';
import Form from './components/forms/FormPage';
const API_KEY = '218bb6778b149b1cdd63b367b162c3dd';

class App extends React.Component {
  // can also just be state = {} instead of constructor!
  constructor(props) {
    super(props);
    this.state = {
      img: undefined,
      temperature: undefined,
      mintemp: undefined,
      maxtemp: undefined,
      wind: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      decsription: undefined,
      error: undefined
    }
  }

  componentDidMount() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_KEY}&units=metric`) 
    .then(response => response.json())
    .then(location => this.setState({
      img: location.weather[0].icon,
        temperature: location.main.temp,
        mintemp: location.main.temp_min,
        maxtemp: location.main.temp_max,
        wind: location.wind.speed,
        city: location.name,
        country: location.sys.country,
        humidity: location.main.humidity,
        description: location.weather[0].description
    }));
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const getApi =  await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`) 
    const data = await getApi.json();
    
    // if statement so the app does not break without input.
    if (city && country) {
      console.log(data);
      this.setState({
        img: data.weather[0].icon,
        temperature: data.main.temp,
        mintemp: data.main.temp_min,
        maxtemp: data.main.temp_max,
        wind: data.wind.speed,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description
      });
      // document.querySelector('#weatherToday').style.display = 'grid';
    } else {
      this.setState({
        img: undefined,
        temperature: undefined,
        mintemp: undefined,
        maxtemp: undefined,
        wind: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Sorry, please enter correct values."
      });
    }
  }

  render() {
    return (
      <Router basename="/weather-app">
      <div className="wrapper">
        <nav>
          <ul>
              <Link to="/">Weather now</Link>
              <div>//</div>
              <Link to="/about">About</Link>
          </ul>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/about" component={AboutPage} />
          {/* <Route exact path="/" component={TodayPage, Form} /> */}
          <Route exact path="/">
            <Form getWeather={this.getWeather} />
            <TodayPage 
              img={this.state.img}
              temperature={this.state.temperature}
              mintemp={this.state.mintemp}
              maxtemp={this.state.maxtemp}
              wind={this.state.wind}
              city={this.state.city}
              country={this.state.country}
              humidity={this.state.humidity}
              description={this.state.description}
              error={this.state.error}
            />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
