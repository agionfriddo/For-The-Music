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
      selected: 0
    }
    this.updateSelected = this.updateSelected.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateBio = this.updateBio.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.updateYoutube = this.updateYoutube.bind(this);
    this.createArtist = this.createArtist.bind(this);
  }
  updateSelected(e) {
    this.setState({selected: e.target.value})
    console.log(e.target.value)
  }
  updateName(e) {
    this.setState({name: e.target.value})
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
  createArtist(e) {
    e.preventDefault()
    console.log(this.state)
    // this.props.addEventOnDatabase(this.state)
  }

    render() {
      return (
          <div className='row'>
            <div className="col-md-6">
              <h3>Add/Edit an Artist Below</h3>
              <form name="editOrCreateArtist" onSubmit={this.createArtist}>
                <div className="form-group">
                  <label name="artists">Choose an Artist:</label>
                  <select className="form-control" onChange={this.updateSelected}>
                  <option value="0">Create New Artist</option>
                  {
                    this.props.artistsList && this.props.artistsList.map(artist => (
                      <option key={artist.id}  value={artist.id}>Update - {artist.name}</option>
                    )
                  )
                  }
                  </select>
                </div>
                <div className="form-group">
                  <label name="name">Name:</label>
                  <input type="text" className="form-control" onChange={this.updateBio} />
                </div>
                <div className="form-group">
                  <label name="bio">Bio:</label>
                  <input type="text" className="form-control" onChange={this.updateImage} />
                </div>
                <div className="form-group">
                  <label name="imageurl">Image:</label>
                  <input type="text" className="form-control" onChange={this.updateImage} />
                </div>
                <div className="form-group">
                  <label name="youtube">Youtube Embed Link:</label>
                  <input type="text" className="form-control" onChange={this.updateYoutube} />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
            <div className="col-md-6">
              {
                this.props.artistsList && this.props.artistsList.map(artist =>{
                  if(artist.id == this.state.selected) {
                    return (
                      <div key={artist.id}>
                        <h3>Name: {artist.name}</h3>
                        <p>Bio: {artist.bio}</p>
                        <img src={artist.imageurl} />
                        <p>Youtube: {artist.youtube}</p>
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
const mapStateToProps = state => ({artistsList: state.artistsList})

const ControlPanelArtists = connect(mapStateToProps, mapDispatchToProps)(ControlPanelArtistsComponent)

export default ControlPanelArtists;
