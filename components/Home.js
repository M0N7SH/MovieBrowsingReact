import React from "react";

//Config
import { POSTER_SIZE,BACKDROP_SIZE,IMAGE_BASE_URL} from '../config';
import API from '../API';

//Components
import Grid from "./Grid";
import HeroImage from "./HeroImages";
import {useHomeFetch} from '../hooks/useHomeFetch';
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button";
//Hooks

//Image

import NoImage from '../images/no_image.jpg';

const Home = () => {
    const { state, loading, error,setSearchTerm,searchTerm,setIsLoadingMore } = useHomeFetch();
    console.log(state);
  
    if (loading) {
      // You can render a loading indicator here
      return <Spinner/>;
    }
  
    if (error) {
      // You can render an error message here
      return <div>Error loading data</div>;
    }
  
    return (
      <>
        {state && state.results && state.results.length > 0 ? (
          <>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
              title={state.results[0].original_title}
              text={state.results[0].overview}
            />
            <SearchBar setSearchTerm={setSearchTerm}/>
            <Grid header={searchTerm ? 'Search results' : 'Popular Movies'}>
              {state.results.map(movie => (
                <Thumb
                  key={movie.id}
                  clickable
                  image={
                    movie.poster_path
                      ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                      : NoImage
                  }
                  movieId={movie.id}
                />
              ))}
            </Grid>
            { loading && <Spinner/>}
            { state.page < state.total_pages && !loading && (
              <Button text='Load More' callback={() => setIsLoadingMore(true)}/>
            )}
          </>
        ) : (
          <div>No data available</div>
        )}
      </>
    );
  };
  
  export default Home;
  


