import React, { Component } from 'react';
import axios from '../../axios';

import './Dashboard.css';
import Loader from 'react-loader-spinner'

const SELECT_BUILDING = 'Select Building'

class Dashboard extends Component {
  state = {
    buildings : null,
    selected: SELECT_BUILDING,
    loading: true,
    meetingRooms: null
  }

  fetchBuildingsData = () => {
    if(!this.state.buildings){
      const queryBody = '{ Buildings { name meetingRooms{ name meetings{ title date startTime endTime}}}}'
      const data = {
        query: queryBody
      };
      axios.post('/', data)
        .then(response => {
          console.log(response.data.data.Buildings);
          this.setState({
            buildings: response.data.data.Buildings,
            loading: false
          })
        })
        .catch(error => {
          // console.log(error);
          this.setState({ error: true });
        });
      }
  }

  componentDidMount() {
    this.fetchBuildingsData();
  }

  handleBuildingSelection = (event) => {
    const selected = event.target.value;
    if(selected === SELECT_BUILDING){
      return;
    }
    const buildingData = this.state.buildings.find(building => {
          return building.name === selected;
    })

    console.log('Meeting Room',buildingData.meetingRooms);
    this.setState({
      selected,
      meetingRooms:buildingData.meetingRooms
    })
  }

  handleMeeting = () => {
    this.props.history.push( '/addmeeting');
  }

  render() {
    let buildings = null
    if(this.state.buildings && this.state.buildings.length > 0){
      buildings = this.state.buildings.map(building => {
        return <option key={building.name} value={building.name}>{building.name}</option>
      })
    }
    
    const select = (buildings? 
                      <select 
                        value={this.state.selected} 
                        onChange={(event) => this.handleBuildingSelection(event)}>
                        <option key={SELECT_BUILDING} value={SELECT_BUILDING}>{SELECT_BUILDING}</option>
                              {buildings}
                      </select> : null )

    let loading = null
    if(this.state.loading){
      loading = (<Loader 
                  type="ThreeDots"
                  color="#00BFFF"
                  height="100"	
                  width="100"
                  />)   
    }else{
      const showSelectedBuilding = 
        (this.state.selected !== SELECT_BUILDING)?
        <div>
          <div className='Rooms'>
              <h4>Rooms</h4>
              <h5>Total: {this.state.meetingRooms? this.state.meetingRooms.length: null}</h5>
              <h5>Free Now: 5</h5>
          </div>
          <div className='Meetings'>
                <h4>Meetings</h4>
                <h5>Total 100 Today</h5>
                <h5>Total 10 going on now</h5>
          </div>
          <button onClick={() => this.handleMeeting()}>Add a Meeting</button>
          </div>: null
    

      loading =  <div>{select}
                <div>
                  <h3>{this.state.selected ? this.state.selected : null}</h3>
                </div>
                {showSelectedBuilding}
                </div>;
    }
    return (
      <div className='Dashboard'>
        {loading}
      </div>
     
    );
  }
}

export default Dashboard;
