import React, {Component} from 'react';
import './AppBody.css';
import ResultBody from './ResultBody';
import axios from 'axios';

class AppBody extends Component{
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      specialty: '',
      specialty_dropdown: [],
      loadingResults: true,
      showsearch: true
    };

    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleSpecialtyChange = this.handleSpecialtyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get('http://127.0.0.1:8081/specialties')
      .then(res => {
        //console.log(res.data);
        const results = res.data.map(obj => obj);
        this.setState({
          specialty_dropdown: results,
          loadingResults: false
        });
      })
      .catch(err => {
        this.setState({
          loadingResults: false
        });
        console.log(err);
      });
  }

  renderLoading(){
    return <div>Loading...</div>;
  }

  renderSpecialties(){
    return(
      <label>
        Doctor Specialty<br/>
        <select className="search-bar" value={this.state.specialty} onChange={this.handleSpecialtyChange}>
          <option value="">Select One</option>
          {this.state.specialty_dropdown.map(doc => {
            //console.log({doc});
            return <option key={doc} value={doc}>{doc}</option>
            }
          )}
        </select>
      </label>
    );
  }

  handleZipChange(event){
    this.setState({city: event.target.value});
  }

  handleSpecialtyChange(event){
    this.setState({specialty: event.target.value});
  }

  handleSubmit(event){
    //alert('specialty: ' + this.state.specialty);
    event.preventDefault();
    this.setState({ showsearch: false});
  }


  render(){
    if(this.state.showsearch){
      return(
        <div className="App-body">
        <div className="App-form">
          <form onSubmit={this.handleSubmit}>
            <label>
              ZIP<br/>
              <input className="search-bar" type="text" placeholder="  i.e. 29403" value={this.state.city}  onChange={this.handleZipChange}/>
            </label>
            {this.state.loadingResults ?
              this.renderLoading()
              : this.renderSpecialties()}
            <input className="search-button" type="Submit" value="Submit"/>
          </form>
        </div>

        </div>
      );
    }else {
      return (
        <ResultBody location={this.state.city} specialty={this.state.specialty}/>
      );
    }
  }
}

export default AppBody;
