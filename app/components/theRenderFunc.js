  renderImage() {
    if(!location.href.includes('venues')) {
      return (
        <div className="col-md-4">
          <img width="250" src={this.props.event.venue.imageurl} />
        </div>
      )
    } else return null
  }


