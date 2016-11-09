import React, {Component} from 'react'
// import {addEventOnDatabase} from '../../reducers/events'
import { connect } from 'react-redux'

class ControlPanelVenuesComponent extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
      imageurl: '',
      description: '',
      selected: 0
    }
    this.updateSelected = this.updateSelected.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.createVenue = this.createVenue.bind(this);
  }
  updateSelected(e) {
    this.setState({selected: e.target.value})
    console.log(e.target.value)
  }
  updateName(e) {
    this.setState({name: e.target.value})
  }
  updateAddress(e) {
    this.setState({address: e.target.value})
  }
  updateImage(e) {
    this.setState({imageurl: e.target.value})
  }
  updateDescription(e) {
    this.setState({description: e.target.value})
  }
  createVenue(e) {
    e.preventDefault()
    console.log(this.state)
    // this.props.addEventOnDatabase(this.state)
  }

    render() {
      return (
          <div className='row'>
            <div className="col-md-6">
              <h3>Add/Edit a Venue Below</h3>
              <form name="editOrCreateArtist" onSubmit={this.createVenue}>
                <div className="form-group">
                  <label name="artists">Choose a Venue :</label>
                  <select className="form-control" onChange={this.updateSelected}>
                  <option value="0">Create New Venue</option>
                  {
                    this.props.venuesList && this.props.venuesList.map(venue => (
                      <option key={venue.id} value={venue.id}>Update - {venue.name}</option>
                    )
                  )
                  }
                  </select>
                </div>
                <div className="form-group">
                  <label name="name">Name:</label>
                  <input type="text" className="form-control" onChange={this.updateName} />
                </div>
                <div className="form-group">
                  <label name="address">Address:</label>
                  <input type="text" className="form-control" onChange={this.updateAddress} />
                </div>
                <div className="form-group">
                  <label name="imageurl">Image:</label>
                  <input type="text" className="form-control" onChange={this.updateImage} />
                </div>
                <div className="form-group">
                  <label name="description">Description:</label>
                  <input type="text" className="form-control" onChange={this.updateDescription} />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
            <div className="col-md-6">
              {
                this.props.venuesList && this.props.venuesList.map(venue =>{
                  if(venue.id == this.state.selected) {
                    return (
                      <div key={venue.id}>
                        <h3>Name: {venue.name}</h3>
                        <p>Address: {venue.address}</p>
                        <img src={venue.imageurl} />
                        <p>Description: {venue.description}</p>
                      </div>
                      )
                  }
                })
              }
            </div>
        </div>
      )
    }

}
const mapDispatchToProps = {  }
const mapStateToProps = state => ({venuesList: state.venuesList})

const ControlPanelVenues = connect(mapStateToProps, mapDispatchToProps)(ControlPanelVenuesComponent)

export default ControlPanelVenues;
