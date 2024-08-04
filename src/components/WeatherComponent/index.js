import { Component } from 'react'

import axios from 'axios'

import { IoSearchSharp } from "react-icons/io5";

import './index.css'

class WeatherComponent extends Component {
    state = {
        weatherData: "",
        searchInput: ""
    }

    onChangeSearchInput = (event) => {
        this.setState({ searchInput: event.target.value })
    }

    componentDidMount() {
        this.getWeatherData()
    }

    getWeatherData = async () => {
        const { searchInput } = this.state

        if (!searchInput) {
            return;
        }

        try {
            const response = await axios.get(`https://adapt-nxt-backend-weather-srinivas-assignment.vercel.app/weather?city=${searchInput}`);
            this.setState({ weatherData: response.data });
        } catch (e) {
            console.log(e.message);
        }
    }

    onClickKeyDown = (event) => {
        if (event.key === "Enter") {
            this.getWeatherData();
        }
    }

    getWeatherImage = (description) => {
        switch (description.toLowerCase()) {
            case 'clear sky':
                return 'https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1722764410/d68y78yejj8q89sk5drl.png';
            case 'sunny':
                return 'https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1722764410/d68y78yejj8q89sk5drl.png';
            case 'overcast clouds':
                return 'https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1722764356/r0uut4gufpnyeqhgbeea.png';
            case 'broken clouds':
                return 'https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1722764732/obdpaxikjb83m6ruxry6.png';
            case 'cloudy':
                return 'https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1722764356/r0uut4gufpnyeqhgbeea.png';
            case 'shower rain':
                return 'https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1722764343/sevmlmkl9mgha0nalkvt.png';
            case 'rain':
                return 'https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1722764343/sevmlmkl9mgha0nalkvt.png';
            case 'thunderstorm':
                return 'https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1722764343/sevmlmkl9mgha0nalkvt.png';
            default:
                return 'https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1722764370/zkuuogazyaztmlu6vz38.png'; // Add a default image if needed
        }
    };


    render() {
        const { searchInput, weatherData } = this.state
        console.log(weatherData);

        const weatherImage = weatherData && weatherData.weather
            ? this.getWeatherImage(weatherData.weather[0].description)
            : '';

        const temperature = weatherData && weatherData.main
            ? Math.ceil(weatherData.main.temp)
            : null;

        return (
            <div className='weather-page-container'>
                <div className='weather-page-header'>
                    <h1 className='heading'>Weather</h1>
                    <div className='input-search-and-search-icon-container'>
                        <input
                            type="search"
                            className='input-search'
                            placeholder='search for location'
                            onChange={this.onChangeSearchInput}
                            value={searchInput}
                            onKeyDown={this.onClickKeyDown}
                        />
                        <button className='search-button' onClick={this.getWeatherData}><IoSearchSharp /></button>
                    </div>
                </div>
                <div className='weather-page-content'>
                    {weatherData ? (
                        <>
                            <div className='temperature-card-and-weather-img'>
                                <div className='temperature-card'>
                                    <h2 className='location-name'>{weatherData.name}</h2>
                                    <p className='temp'>{temperature}°C</p>
                                    <p className='description'>{weatherData.weather[0].description}</p>
                                </div>
                                {weatherImage && <img src={weatherImage} alt={weatherData.weather[0].description} className='weather-image' />}
                            </div>
                        </>
                    ) : (
                        <div className='no-response-container'>
                            <p className='no-data-available'>No data available. Please search for a location.</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default WeatherComponent