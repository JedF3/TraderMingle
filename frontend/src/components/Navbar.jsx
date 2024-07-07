import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useContext, useEffect, useRef, useState } from 'react';
import searchTermContext from '../context/searchTermContext';
import { useUserProfileContext } from '../hooks/useUserProfileContext';
import no_avatar from '../images/no-avatar.svg';
// react-icons
import {
  FaUser,
  FaGear,
  FaArrowRightFromBracket,
  FaChevronDown,
  FaComment,
} from 'react-icons/fa6';
import { socket } from '../socket';
import MyContext from '../MyContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user, isLoggedIn, setIsLoggedIn } = useContext(MyContext);
  const { userProfile, dispatch } = useUserProfileContext();
  const [searchText, setSearchText] = useState('');
  const { searchTerm, setSearchTerm } = useContext(searchTermContext);
  const [profileImage, setProfileImage] = useState(null);
  // dropdown menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();
  let firstRun = useRef(true);
  const chatDefaultIconClass = 'react-icons standardSize noNew';
  const chatNotifIconClass = 'react-icons standardSize newChat';
  let [chatIconClass, setChatIconClass] = useState(chatDefaultIconClass);
  const handleSearch = () => {
    if (searchText !== searchTerm) {
      setSearchTerm(searchText);
    } else {
      navigate('/search/');
    }
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
      const fetchProfile = async () => {
        try {
          const response = await fetch('/api/v1/user/profile', {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const json = await response.json();
          if (response.ok) {
            dispatch({ type: 'SET_USER_PROFILE', payload: json });
          } else {
            console.error('Failed to fetch profile', json);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };

      fetchProfile();
      if (user.image[0] != null) {
        setProfileImage(user.image[0].path);
      }
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

  // Check if userProfile exists and has image data
  const imagePath =
    userProfile && userProfile.image && userProfile.image.length > 0
      ? userProfile.image[0].path
      : no_avatar;

  socket.on('pvt_msg', (data) => {
    setChatIconClass(chatNotifIconClass);
  });

  return (
    <header>
      <div className="container">
        <button
          className="TMIconButton"
          onClick={() => {
            if (searchTerm) {
              setSearchTerm('');
            } else {
              navigate('/');
            }
          }}
        >
          <h1 className="noPointers">TM!</h1>
        </button>
        <div className="searchDiv">
          <input type="text" onChange={(e) => setSearchText(e.target.value)} />
          <button onClick={handleSearch}>Search</button>
        </div>
        <nav>
          {isLoggedIn && (
            <FaComment
              className={chatIconClass}
              onClick={() => {
                navigate('/messages');
                setChatIconClass(chatDefaultIconClass);
              }}
            />
          )}
          <button onClick={() => navigate('/addListing')}>
            Have something to sell?
          </button>
          {isLoggedIn ? (
            <div ref={menuRef}>
              <button
                className="drop-down-menu custom-link outline"
                onClick={toggleMenu}
              >
                {userProfile ? user.username : 'Profile'}
                {/* Show user avatar if available */}
                <img src={imagePath} alt="avatar" />
                <FaChevronDown className="react-icons icon-small" />
              </button>
              <div
                className={`sub-menu-wrap ${menuOpen ? 'open-menu' : ''}`}
                id="subMenu"
              >
                <div className="sub-menu">
                  <div
                    className="sub-menu-link"
                    onClick={() => {
                      handleMenuItemClick();
                      navigate('/profile/' + user.id);
                    }}
                  >
                    <FaUser className="react-icons" />
                    <p>Profile</p>
                  </div>
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
