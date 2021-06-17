import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, generatePath } from 'react-router-dom';

import Layout from '../../../pages/Layout';

import BasedRecipeCard from '../../../components/BasedRecipeCard';

import { Container, HorizontalList } from './styles';
import FindRecipesCard from '../../../components/FindRecipesCard';

import AppTitle from '../../../components/AppTitle';
import InputSearch from '../../../components/InputSearch';

import { useSelector, useDispatch } from 'react-redux';
import RandomRecipeCard from '../../../components/RandomRecipeCard';

import RecipesGrid from '../../../components/RecipesGrid';

import dietSvg from '../../../assets/diet.svg';
import chefSvg from '../../../assets/chef.svg';
import tutorialSvg from '../../../assets/tutorial.svg';

import {
  recipesType,
  recipesCuisines,
  recipesCookingTime,
} from '../../../config';
import { activePageAction } from '../../../store/activePage';

export default function Discover() {
  const dispatch = useDispatch();
  const history = useHistory();

  // set active page
  useEffect(() => dispatch(activePageAction('discover')));

  // search recipe input
  const [inputData, setInputData] = useState('');

  // format input data
  function formatInputString(inputString) {
    const recipeString = inputString;
    const recipeFormatted = recipeString
      .replace(/\s+/g, ' ')
      .trim()
      .replace(' ', '+');

    return recipeFormatted;
  }

  // send recipe name formatted to its state
  function handleRecipesByName() {
    const recipeName = formatInputString(inputData);

    return history.push({
      pathname: '/discover/results',
      search: `?query=${recipeName}`,
    });
  }

  function handleRecipesByType(e) {
    const type = e.target.dataset.type;

    // return history.push({
    //   pathname: '/discover/results',
    //   search: `?type=${type}`,
    // });
  }

  function handleRecipesByCuisine(e) {
    console.log(e.target);
    const cuisine = e.target.dataset.cuisine;

    // return history.push({
    //   pathname: '/discover/results',
    //   search: `?cuisine=${cuisine}`,
    // });
  }

  function handleRecipesByTiming(e) {
    const maxReadyTime = e.target.dataset.timing;

    // return history.push({
    //   pathname: '/discover/results',
    //   search: `?maxReadyTime=${maxReadyTime}`,
    // });
  }

  const greetingByTime = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'Good Morning!';
    } else if (currentHour >= 12 && currentHour < 19) {
      return 'Good Afternoon!';
    } else {
      return 'Good Night!';
    }
  };

  return (
    <Layout defaultHeader>
      <Container>
        <main>
          <section>
            <AppTitle>{greetingByTime()} Adalberto</AppTitle>
            <FindRecipesCard
              image={dietSvg}
              direction="/search"
              text="Find recipes based on what you already have on your kitchen"
            />
            <FindRecipesCard
              image={chefSvg}
              direction="/upload"
              text="Make lots of recipes and build an amazing progress until become a chef!"
            />
          </section>

          <section>
            <AppTitle>Looking for a specific recipe?</AppTitle>
            <InputSearch
              handleInputChange={e => setInputData(e.target.value)}
              handleSearch={() => handleRecipesByName()}
              placeholder="We have tasty pizzas, try it :)"
            />
            <FindRecipesCard
              image={tutorialSvg}
              direction="/favorites" // change later
              text="Watch any tutorial you want, anytime, anywhere"
            />
          </section>

          <section>
            <AppTitle>Try to get a random recipe</AppTitle>
            <RandomRecipeCard />
          </section>

          <section>
            <AppTitle>Find a recipe by its type</AppTitle>
            <HorizontalList>
              {recipesType.map(type => {
                return (
                  <li key={type.id}>
                    <button
                      data-type={type.id}
                      onClick={e => handleRecipesByType(e)}
                    >
                      {type.text}
                    </button>
                  </li>
                );
              })}
            </HorizontalList>
          </section>

          <section>
            <AppTitle>Or more, get a quick recipe</AppTitle>
            <HorizontalList>
              {recipesCookingTime.map(time => {
                return (
                  <li key={time.id}>
                    <button
                      data-timing={time.id}
                      onClick={e => handleRecipesByTiming(e)}
                    >
                      {time.text}
                    </button>
                  </li>
                );
              })}
            </HorizontalList>
          </section>

          <section>
            <AppTitle>Curious about some other cuisines?</AppTitle>
            <RecipesGrid>
              {recipesCuisines.map(cuisine => {
                return (
                  <BasedRecipeCard
                    key={cuisine.id}
                    data={cuisine.id}
                    image={cuisine.id}
                    title={cuisine.id}
                    text={cuisine.info}
                    handleClick={e => handleRecipesByCuisine(e)}
                  />
                );
              })}
            </RecipesGrid>
          </section>
        </main>
      </Container>
    </Layout>
  );
}
