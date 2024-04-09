import React from 'react';
import apple from './assets/pineapple.jpg';
import { useNavigate } from 'react-router-dom';
import one from './assets/one.webp'
import two from './assets/two.jpg'
import three from './assets/three.jpg'

const Home = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/register');
  }

  return (
    <div>
      <img className="side" src={apple} alt="pineapple" />
      <input className="btn" type="submit" value="Register" onClick={handleClick}/>

      <div>
        <h1>Do you want to stop wasting Food?</h1>
        <h1>Try <span style={{color:"#FFAC1C"}}>Minwaste!</span></h1>

        <p>Our Website will help you reduce your food waste.</p>
        <p>Start saving money (and the planet) today!</p>
      </div>

      <div className="home">

        <div className="track">
          <img src={one} className="img" alt="keep track of food inventory"></img>
          <p className='abc'><span style={{color:"#FFAC1C"}}>Keep track of your items </span><br></br> Our innovative logging and tracking system will help you regain control of your kitchen</p>
        </div>

        <div class="track">
          <img src={two} className="img" alt="keep track of food inventory"></img>
          <p className='abc'><span style={{color:"#FFAC1C"}}>Customized recipes on demand </span><br></br> Get instant access to over 5,000 recipes based on what you have in your kitchen </p>
        </div>

        <div class="track">
          <img src={three} className="img" alt="keep track of food inventory"></img>
          <p className='abc'><span style={{color:"#FFAC1C"}}>Learn New Skills</span> <br></br> Our curated content will educate you on food waste, and give tools to improve your behaviour</p>
        </div>
        
      </div>
    </div>
  );
};

export default Home;