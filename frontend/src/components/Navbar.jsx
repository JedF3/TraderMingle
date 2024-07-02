import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useContext, useEffect, useRef, useState } from 'react';
import searchTermContext from '../context/searchTermContext';
import { useUserProfileContext } from '../hooks/useUserProfileContext';
import no_avatar from '../images/pain.jpg';

// react-icons
import {
  FaUser,
  FaGear,
  FaArrowRightFromBracket,
  FaChevronDown,
} from 'react-icons/fa6';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  // const { profiles, dispatch } = useUserProfileContext();
  const { userProfile, dispatch } = useUserProfileContext();
  const [searchText, setSearchText] = useState('');
  const { searchTerm, setSearchTerm } = useContext(searchTermContext);
  // dropdown menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();
  let firstRun = useRef(true);

  const handleSearch = () => {
    setSearchTerm(searchText);
  };

  useEffect(() => {
    if (!firstRun.current) {
      navigate('/search/');
    } else {
      firstRun.current = false;
    }
  }, [searchTerm]);

  useEffect(() => {
    if (user && user.token) {
      const fetchProfiles = async () => {
        const response = await fetch('/api/v1/user/profile', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: 'SET_PROFILES', payload: json });
        }
      };

      fetchProfiles();
    }
  }, [user, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  // menu buttons
  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>TM!</h1>
        </Link>
        <div className="searchDiv">
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <button onClick={handleSearch}>Search</button>
        </div>
        <nav>
          <button onClick={() => navigate('/addListing')}>
            Have something to sell?
          </button>
          {user ? (
            <div ref={menuRef}>
              <button
                className="drop-down-menu custom-link outline"
                onClick={toggleMenu}
              >
                {userProfile ? userProfile.username : 'Profile'}
                <img src={no_avatar} alt="no-avatar" />
                <FaChevronDown className="react-icons icon-small" />
              </button>
              <div
                className={`sub-menu-wrap ${menuOpen ? 'open-menu' : ''}`}
                id="subMenu"
              >
                <div className="sub-menu">
                  <Link
                    to="/profile"
                    className="sub-menu-link"
                    onClick={handleMenuItemClick}
                  >
                    <FaUser className="react-icons" />
                    <p>Profile</p>
                  </Link>
                  <Link
                    to="/settings"
                    className="sub-menu-link"
                    onClick={handleMenuItemClick}
                  >
                    <FaGear className="react-icons" />
                    <p>Settings</p>
                  </Link>
                  <Link
                    to="/"
                    onClick={() => {
                      handleLogout();
                      handleMenuItemClick();
                    }}
                    className="sub-menu-link"
                  >
                    <FaArrowRightFromBracket className="react-icons" />
                    <p>Logout</p>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link to="/login" className="custom-link outline">
                Login
              </Link>
              <Link to="/signup" className="custom-link outline">
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

// font awesome react icons:
// guide: https://www.youtube.com/watch?v=LDB4uaJ87e0&t=4562s
// finding react-icon names: https://react-icons.github.io/react-icons/icons/fa6/
// finding font-awesome icon names: https://fontawesome.com/search?q=settings&o=r
