import React, { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContextProvider';
import { Link } from 'react-router-dom';

import {
  IoCompassOutline,
  IoSearchOutline,
  IoAddCircleOutline,
  IoHeartOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import styles from '../styles/components/Navigation.module.scss';

export default function Navigation() {
  const { activePage } = useContext(GlobalContext);
  const buttonActive = styles.buttonActive;

  return (
    <nav className={styles.navigation}>
      <Link to="/discover">
        <button
          className={activePage === 'Discover' ? buttonActive : undefined}
        >
          <IoCompassOutline size={26} />
        </button>
      </Link>

      <Link to="/search">
        <button className={activePage === 'Search' ? buttonActive : undefined}>
          <IoSearchOutline size={26} />
        </button>
      </Link>

      <Link to="/upload">
        <button className={activePage === 'Upload' ? buttonActive : undefined}>
          <IoAddCircleOutline size={26} />
        </button>
      </Link>

      <Link to="/favorites">
        <button
          className={activePage === 'Favorites' ? buttonActive : undefined}
        >
          <IoHeartOutline size={26} />
        </button>
      </Link>

      <Link to="/profile">
        <button className={activePage === 'Profile' ? buttonActive : undefined}>
          <IoPersonOutline size={26} />
        </button>
      </Link>
    </nav>
  );
}