import logo from './logo.svg';
import './App.css';

import { observer } from 'mobx-react-lite'
import { direction } from './controller'

import Home from './components/Home'

function GazeCore() {
  return (
    <div className="App">
      <Home />

      <div class="calibrationDiv">
        <input type="button" class="Calibration" id="Pt1"></input>
        <input type="button" class="Calibration" id="Pt2"></input>
        <input type="button" class="Calibration" id="Pt3"></input>
        <input type="button" class="Calibration" id="Pt4"></input>
        <input type="button" class="Calibration" id="Pt5"></input>
        <input type="button" class="Calibration" id="Pt6"></input>
        <input type="button" class="Calibration" id="Pt7"></input>
        <input type="button" class="Calibration" id="Pt8"></input>
        <input type="button" class="Calibration" id="Pt9"></input>
      </div>


    </div>
  );
}

export default observer(GazeCore);
