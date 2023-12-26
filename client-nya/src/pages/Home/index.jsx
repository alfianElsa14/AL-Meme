import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { createStructuredSelector } from 'reselect';

import { selectMemes, selectMemesCount } from './selectors';
import { getAllMeme } from './actions';
import { selectRole, selectUser } from '@containers/Client/selectors';

import Card from '@components/Card';
import classes from './style.module.scss'

const Home = ({ memes, memesCount, role }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getAllMeme(page))
  }, [page])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterMemesBySearch = () => {
    return memes.filter(el => el.title.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const fetchMoreData = () => {
    if (memes.length < memesCount) {
      setPage((prevPage) => prevPage + 1);
    }
  };


  return (
    <div
      data-testid={`homeContainer`}
      className={classes.container}
    >
      <div className={classes.search}>
        <input
          type="search"
          placeholder="Search Meme . . ."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <InfiniteScroll
        dataLength={memes.length}
        next={fetchMoreData}
        hasMore={memes.length < memesCount}
        endMessage={<p>Tidak ada meme lebih lanjut untuk dimuat</p>}
      >
        <Card memes={filterMemesBySearch()} role={role} />
      </InfiniteScroll>
    </div>
  );
};

Home.propTypes = {
  memes: PropTypes.array,
  user: PropTypes.object,
  role: PropTypes.string,
  memesCount: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  memes: selectMemes,
  user: selectUser,
  role: selectRole,
  memesCount: selectMemesCount
});

export default connect(mapStateToProps)(Home);
