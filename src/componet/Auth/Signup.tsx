import { Link } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useState } from "react";

export default function Signup() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: `${country.flag} ${country.name} `,
  }));
  const states = State.getStatesOfCountry(selectedCountry).map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));
  const cities = City.getCitiesOfState(selectedCountry, selectedState).map(
    (city) => ({
      value: city.name,
      label: city.name,
    }),
  );

  const selectedCountryOption =
    countries.find((country) => country.value === selectedCountry) || null;

  const selectedStateOption =
    states.find((state) => state.value === selectedState) || null;

  const selectedCityOption =
    cities.find((city) => city.value === selectedCity) || null;

  console.log(selectedCity);

  //   console.log(States);

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1 className="heading">Get started with AdventureLand</h1>
        <div className="">
          <form className="signup-form">
            <h3>Personal Information</h3>
            <div className="signup-input-container">
              <input className="input-feild" type="text" placeholder="Name" />
              <input className="input-feild" type="text" placeholder="Email" />
            </div>
            <div className="signup-input-container">
              <input
                className="input-feild"
                type="text"
                placeholder="Password"
              />
              <input
                className="input-feild"
                type="text"
                placeholder="Confirm password"
              />
            </div>
            <h3>Address</h3>
            <div>
              <div className="signup-input-container">
                <input
                  className="input-feild"
                  type="text"
                  placeholder="Street"
                />
                <Select
                  className="country-select"
                  classNamePrefix="country"
                  options={countries}
                  placeholder="Serach Country"
                  isSearchable
                  value={selectedCountryOption}
                  onChange={(option) => {
                    setSelectedCountry(option?.value || "");
                    setSelectedState("");
                    setSelectedCity("");
                  }}
                />
              </div>
              <div className="signup-input-container">
                <Select
                  className="country-select"
                  classNamePrefix="country"
                  options={states}
                  placeholder="Serach State"
                  isDisabled={!selectedCountry}
                  isSearchable
                  value={selectedStateOption}
                  onChange={(option) => {
                    setSelectedState(option?.value || "");
                    setSelectedCity("");
                  }}
                />
                <Select
                  className="country-select"
                  classNamePrefix="country"
                  options={cities}
                  placeholder="Serach City"
                  value={selectedCityOption}
                  isDisabled={!selectedState}
                  isSearchable
                  onChange={(option) => setSelectedCity(option?.value || "")}
                />
                <input
                  className="input-feild"
                  type="text"
                  placeholder="Pincode"
                />
              </div>
            </div>
            <button className="input-feild button-field ">Submit</button>
            <button className="input-feild button-field">
              <Link to="/login">Back to Login</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
