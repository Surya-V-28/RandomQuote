/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";

import { AiFillLinkedin } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { FaQuoteLeft } from "react-icons/fa";
function App() {
  const [loading, setLoading] = useState(true);
  const [dataFirst, setDataFirst] = useState(null);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [containerColor, setContainerColor] = useState('#3498db');
  const url = "https://api.quotable.io/random";

  useEffect(() =>  {
    if(!hasFetchedData){
      const fetchData = async ()=> {

        try {
        const  response = await fetch(url);
        const  result = await response.json();
        console.log(result);
        setDataFirst(result);
        }
        catch(e) {
          console.log("an error has occured ", e);
        }
        finally {
          setHasFetchedData(true);
          setLoading(false);
        }
      }
      fetchData();
    }
  },[]);

  const onNewQuoteGet= async () =>{
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result)
      setLoading(true)
      setDataFirst(result);
      setTimeout(() => {
        console.log('Timer completed!');
      }, 1000);
      
      setLoading(false)
      const changeColor = () => {
        const newColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        if(newColor==='')
        setContainerColor(newColor);
        document.documentElement.style.setProperty('--container-color', newColor);
      };
      changeColor()

    }catch(e) {
      console.log("unable to get the new Quote some issues", e);
    }finally{
      console.log("new quote fetched ended");
    }

  }

  return !loading? (
    <div className="App">
      <div className="quote-box-container" id="quote-box">
        <h5 id="text" className="quote-content">
          <span className="qotes">
            <FaQuoteLeft />{" "}
          </span>
          {dataFirst?.content}
        </h5>
        <div>
          <p id="author" className="author-class">
            --{dataFirst?.author}
          </p>
        </div>
        <div className="buttons-container">
          <div className="left-icons">
            <a
          
              id="tweet-quote" 
              href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${dataFirst?.content}`} target="_top"
            >
              <AiFillTwitterSquare className="LindedIn-cons" fontSize={37} />
            </a>
            <a href="https://www.linkedin.com/feed/">
              <AiFillLinkedin fontSize={37} className="LindedIn-cons" />
            </a>
          </div>
          <button id="new-quote" className="btn" onClick={onNewQuoteGet}>
            New Quote
          </button>
        </div>
      </div>
      <p style={{color:"white", fontWeight:"bold"}}>By Surya</p>
    </div>
  ) : (
    <div className="App"> <div className="loader-container">
     
      </div></div>
  );
}

export default App;
