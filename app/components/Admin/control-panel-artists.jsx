import React, {Component} from 'react'
// import {addEventOnDatabase} from '../../reducers/events'
import { connect } from 'react-redux'

class ControlPanelArtistsComponent extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      bio: '',
      imageurl: '',
      youtube: '',
      genre: ''
    }
    this.updateName = this.updateArtists.bind(this);
    this.updateBio = this.updateVenue.bind(this);
    this.updateImage = this.updateDate.bind(this);
    this.updateYoutube = this.updateInitialTickets.bind(this);
    this.updateGenre = this.updateTicketPrice.bind(this);
    this.createArtist = this.createEvent.bind(this);
  }
  updateName(e) {
    this.setState({name: e.target.value.split(' ')})
  }
  updateBio(e) {
    this.setState({bio: e.target.value})
  }
  updateImage(e) {
    this.setState({imageurl: e.target.value})
  }
  updateYoutube(e) {
    this.setState({youtube: e.target.value})
  }
  updateGenre(e) {
    this.setState({genre: e.target.value})
  }
  createArtist(e) {
    e.preventDefault()
    console.log(this.state)
    // this.props.addEventOnDatabase(this.state)
  }

    render() {
      return (
          <div className='row'>
            <div className="col-md-12">
              <h3>Add an Event Below</h3>
              <form name="editOrCreateEvent" onSubmit={this.createEvent}>
                <div className="form-group">
                  <label name="name">Name:</label>
                  <input type="text" className="form-control" onChange={this.updateArtists} />
                </div>
                <div className="form-group">
                  <label name="bio">Bio:</label>
                  <input type="text" className="form-control" onChange={this.updatebio} />
                </div>
                <div className="form-group">
                  <label name="imageurl">Image:</label>
                  <input type="text" className="form-control" onChange={this.updateDate} />
                </div>
                <div className="form-group">
                  <label name="youtube">Youtube Embed Link:</label>
                  <input type="text" className="form-control" onChange={this.updateInitialTickets} />
                </div>
                <div className="form-group">
                  <label name="genre">Genre:</label>
                  <input type="text" className="form-control" onChange={this.updateTicketPrice} />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
          </div>
      )
    }

}
const mapDispatchToProps = {  }
const ControlPanelArtists = connect(null, mapDispatchToProps)(ControlPanelEventsComponent)

export default ControlPanelArtists;
