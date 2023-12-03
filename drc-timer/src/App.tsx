import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RoomTable } from './Layout/RoomTable/RoomTable';
import { ReservationTable } from './Layout/ReservationTable/ReservationTable';

function App() {
  return (
    <div className="App">
      <div className='row'>
        <div className='col'>
          <RoomTable/>
        </div>
        <div className='col'>
          <ReservationTable/>
        </div>
      </div>
    </div>
  );
}

export default App;
