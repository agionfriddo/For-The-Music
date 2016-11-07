import React, { Component } from 'react';
import { connect } from 'ract-redux';

export default class ReviewItem extends Component {
  constructor() {
    super()
  }

  render() {
    const reviewObj = this.props.reviewObj
    return (
      <div className="row">
        <div className="col-md-6">
          <h4>{ reviewObj.title } -- { reviewObj.rating } Stars</h4>
          <p>By {reviewObj.user.name }</p>
          <p>{ reviewObj.content }</p>
        </div>
      </div>
    )
  }
}
