import {useState, useEffect} from 'react';
import Weather from './components/Weather';
import { Dimmer, Loader } from 'semantic-ui-react';
import './App.css';

function App() {
  const [data, setData] = useState();
  const [reload, setReload] = useState(false);

  //function to get the geolocation and then pass it to fetchData()
  //update the reload state to true
  const updateLocation = () => {
    console.log('here',reload);
    setReload(true);
    console.log('here2',reload);

    navigator.geolocation.getCurrentPosition(function(position) {
      fetchData(position.coords.latitude, position.coords.longitude)
    });
  }

  //take in the geolocation and call the weather API endpoints to get the informaion
  //update the data state, update the reload state to false
  const fetchData = async (lat, long) => {
    await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(result => {
      setData(result);
      setReload(false);
      console.log('result',result);
    });
  }

  useEffect(() => {
    updateLocation()
  }, [])
  
  console.log('relaod', reload);

  return (
    <div className="App">
      {data && !reload ? <Weather weatherData={data} updateLocation={updateLocation}/> 
      : <div>
          <Dimmer active>
            <Loader>Loading...</Loader>
          </Dimmer>
        </div>}
    </div>
  );
}

export default App;