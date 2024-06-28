import { Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useContext, useEffect, useRef, useState } from 'react'
import searchTermContext from '../context/searchTermContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [searchText, setSearchText] = useState("");
  const {searchTerm, setSearchTerm} = useContext(searchTermContext);
  const navigate = useNavigate();
  let firstRun = useRef(true);
  const handleClick = () => {
    logout()
  }
  const handleSearch = ()=>{
    setSearchTerm(searchText);
  }
  useEffect(()=>{
    if(!firstRun.current){
      navigate("/search/");
    }
    else{
      firstRun.current=false;
    }
  },[searchTerm]);
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>TM!</h1>
        </Link>
        <div className='searchDiv'>
            <input type='text' onChange={(e)=>{setSearchText(e.target.value)}}></input>
            <button onClick={()=>{handleSearch()}}>Search</button>
        </div>
        <nav>
          <button onClick={()=>{navigate("/addListing")}}>Have something to sell?</button>
          {user && (
            <div>
              <Link to="/profile" className="custom-link outline">{user.email}</Link>
              <Link to="/settings" className="custom-link outline">Settings</Link>
              <button onClick={handleClick} className="custom-link outline">Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login" className="custom-link outline">Login</Link>
              <Link to="/signup" className="custom-link outline">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar