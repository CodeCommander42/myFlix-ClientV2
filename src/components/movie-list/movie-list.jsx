import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function moviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }
  if (!movies) return <div className="main-view" />;

  return <>
    <Col md={12} style={{ margin: '10px' }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    {
      filteredMovies.map(m => (
        <Col sm="7" md="4" lg="2" key={m._id} >
          <MovieCard movie={m} />
        </Col>
      ))
    };
  </>
}

export default connect(mapStateToProps)(moviesList);