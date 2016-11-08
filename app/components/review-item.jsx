import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class ReviewItem extends Component {
  constructor() {
    super()
  }

  render() {
    const review = this.props.review
    return (
      <div className="row">
        <div className="col-md-12">
          <h4>{ review.title } -- { review.rating } Stars</h4>
          <p>By {review.user.name }</p>
          <p>{ review.content }</p>
        </div>
      </div>
    )
  }
}
