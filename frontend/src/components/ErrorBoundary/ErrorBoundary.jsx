import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    console.log(error, errorInfo);
  }

  reloadPage() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="confirmWindowBackdrop">
            <div className="errorBoundaryDiv">
                <h2>Something went wrong</h2>
                <button onClick={()=>{window.location.replace("https://trader-mingle-61w8x27j2-jedidiah-franciscos-projects.vercel.app/")}}>Back to Home</button>
                <button onClick={()=>{window.location.reload()}}>Reload</button> 
                <button onClick={()=>{localStorage.clear();window.location.replace("https://trader-mingle-61w8x27j2-jedidiah-franciscos-projects.vercel.app/")}}>Remove session data and relogin</button>
            </div>
         </div> 
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

        
