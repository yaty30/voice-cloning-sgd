import react, { useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

import { observer } from 'mobx-react-lite'
import { direction } from './controller'

import { getVoices, getHistory, getTTSVoices } from './axios/fetch';

import Home from './components/Home'
import UserBar from './components/UserBar'
import Menu from './components/Menu'
import Upload from './components/Upload'
import History from './components/History'

function App() {
  return (
    <div className="App">
      <div id="homeElements">
        <Menu />
        <UserBar />
        <History />
        <div id="uploadElement">
          <Upload />
        </div>
      </div>
      <Home />

      <div class="calibrationDiv" style={{ position: 'relative', zIndex: 3 }}>
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

export default observer(() => {
  useEffect(() => {
    getVoices()
    getHistory()
    getTTSVoices()
  }, [])

  return (
    App()
  )
});
