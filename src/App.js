import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title : 'Simple Country Application',
      country: []
    }
  }

  // MAKE AJAX CALL HERE
  componentDidMount(){
    console.log('COMPONENT HAS MOUNTED');
    var that = this;
    fetch('http://localhost:3000/api/countries')
      .then(function(response){
        response.json()
        .then(function(data){
          let country = that.state.country;
          country.concat(data);
          that.setState({
            country: data
          })
        })
      })
  }

  removeCountry(id){
    var that = this;
    var country = this.state.country;
    var country_mem = country.find(function(country_mem){
      return country_mem.id === id
    });

    // console.log(country); // check the country selected
    // console.log(countries.indexOf(country));

    var request = new Request('http://localhost:3000/api/remove/'+id, {
      method: 'DELETE'
    });

    fetch(request)
      .then(function(response){

        country.splice(country.indexOf(country_mem), 1);

        that.setState({
          country: country
        })
        response.json()
          .then(function(data){
            console.log(data);
          })
      })
  }

  addCountry(event){
    var that = this;
    event.preventDefault();
    console.log("in method");
    let country_data = {
      country_name: this.refs.country_name.value,
      continent_name: this.refs.continent_name.value,
      id: Math.floor( Math.random() * ( 1000 - 0 + 1 ) ) + 0
    };

    var request = new Request('http://localhost:3000/api/new-country', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(country_data)
    });


    let country = that.state.country;
    country.push(country_data);
    that.setState({
      country: country
    })

    //xmlhttprequest()
    fetch(request)
      .then(function(response){
        response.json()
          .then(function(data){

          })
      })
      .catch(function(err){
        console.log(err);
      })

  }

  render() {
    let title = this.state.title;
    let country = this.state.country;

    return (
      <div className="App">
        <h1>{title}</h1>
        <form ref="countryForm">
          <input type="text" ref="country_name" placeholder="country name "/>
          <input type="text" ref="continent_name" placeholder="continent name "/>
          <button onClick={this.addCountry.bind(this)}>Add Country</button>
        </form>
        <ul>
          {country.map(country => <li key={country.id}>{country.country_name} - {country.continent_name}
            <button onClick={this.removeCountry.bind(this, country.id)}>Remove</button></li>)}
        </ul>
      </div>
    )
  }
}

export default App;
