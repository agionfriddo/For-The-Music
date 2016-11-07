import React, { Component } from 'react';
import ReviewItemComponent from './review-item';
import { connect } from 'react-redux';

class ReviewList extends Component {

  render () {
    const { reviewsList } = this.props

    return (
      <div>
      <h3>Reviews</h3>
        <div className="list-group">
          {
            reviewsList && reviewsList.map(reviewsList => (
              <div key={ review. id } className="list-group-item">
                <ReviewItemComponent review= { review }/>
              </div>
            )
          )}
        </div>
      </div>
    )
  }
}
