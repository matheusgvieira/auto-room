import React, { useState } from 'react';
import './styles.css';

import firebase from '../../firebase';

import moment from 'moment';

import Logo from '../../assets/logo.png';

import thermometer from '../../assets/meter.png';

import drop from '../../assets/drop.png';

import clock from '../../assets/time.png';

import lightHigh from '../../assets/light_high.png';
import lightLow from '../../assets/light_low.png';

import { Button } from '@material-ui/core';

import GraphT from '../Graph/graphTemperature.js'

export default function RealTime() {

    function getMin(dt){
      return((moment(dt.split('T')[1].split('Z')[0], 'HH:mm:ss' ).format('HH:mm:ss')).split(':')[1]);
    }

    const [lampImg, setLampImg] = useState(lightLow);

    const temperature = firebase.database().ref('temperature');
    const humidity = firebase.database().ref('humidity');
    const time = firebase.database().ref('time');
    const lamp = firebase.database().ref('lamp');

    temperature.on('value', (snapshot) => {
        let tem = snapshot.val();
        const keys = Object.keys(tem);

        const last = keys.filter((value) => value === keys[keys.length - 1])[0];
        const last1 = keys.filter((value) => value === keys[keys.length - 2])[0];
        const last2 = keys.filter((value) => value === keys[keys.length - 3])[0];
        const last3 = keys.filter((value) => value === keys[keys.length - 4])[0];
        const last4 = keys.filter((value) => value === keys[keys.length - 5])[0];
        const last5 = keys.filter((value) => value === keys[keys.length - 6])[0];

        let t = JSON.parse('{"temperature":[' +
            String(tem[last5]) + ', ' +
            String(tem[last4]) + ', ' +
            String(tem[last3]) + ', ' +
            String(tem[last2]) + ', ' +
            String(tem[last1]) + ', ' +
            String(tem[last]) + ']}');
        localStorage.setItem('@temperature', JSON.stringify(t));
        //variavel.toFixed(2) duas casas após a virgula


    })
    humidity.on('value', (snapshot) => {
        let hum = snapshot.val()
        const keys = Object.keys(hum)
        const last = keys.filter((value) => value === keys[keys.length - 1])[0]
        localStorage.setItem('@humidity', hum[last]);

    })
    time.on('value', (snapshot) => {
        let datatime = snapshot.val()
        const keys = Object.keys(datatime);

        const last = keys.filter((value) => value === keys[keys.length - 1])[0];
        const last1 = keys.filter((value) => value === keys[keys.length - 2])[0];
        const last2 = keys.filter((value) => value === keys[keys.length - 3])[0];
        const last3 = keys.filter((value) => value === keys[keys.length - 4])[0];
        const last4 = keys.filter((value) => value === keys[keys.length - 5])[0];
        const last5 = keys.filter((value) => value === keys[keys.length - 6])[0];

        
        
        let time = JSON.parse('{"min":[' +
            String(getMin(datatime[last5])) + ', ' +
            String(getMin(datatime[last4])) + ', ' +
            String(getMin(datatime[last3])) + ', ' +
            String(getMin(datatime[last2])) + ', ' +
            String(getMin(datatime[last1])) + ', ' +
            String(getMin(datatime[last])) + ']}');

        localStorage.setItem('@min', JSON.stringify(time));

        const dataTime = `${datatime[last].split('T')[0]} ${datatime[last].split('T')[1].split('Z')[0]}`;
        localStorage.setItem('@time', moment(dataTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'));
    })

    let currentLampValue = false;
    lamp.on('value', (snapshot) => {
        let value = snapshot.val();
        let el = document.getElementById('lamp');
        if (value) {
            el.classList.add('amber-text');
        } else {
            el.classList.remove('amber-text');
        }
        currentLampValue = !!value;
    })

    function changeLamp() {
        lamp.set(!currentLampValue);
        console.log(currentLampValue);
        if (currentLampValue) {
            console.log("ligada");
            setLampImg(lightHigh);
        } else {
            console.log("desligada");
            setLampImg(lightLow);
        }

    }

    const temp = JSON.parse(localStorage.getItem('@temperature'));
    const humi = localStorage.getItem('@humidity');
    const dtime = localStorage.getItem('@time');

    return (
        <div className="dashboard-container">
            <div className="header">
                <div className="header__search">House</div>
                <div className="header__avatar">Matheus Gois Vieira</div>
            </div>

            <div className="sidenav">
                <div className="logo">
                    <img src={Logo} alt="logo" />
                    <h1>AUTOROOM</h1>
                </div>
                <ul className="sidenav__list">
                    <li className="sidenav__list-item">Dashboard</li>
                    <li className="sidenav__list-item">Records</li>
                    <li className="sidenav__list-item">Settings</li>
                    <li className="sidenav__list-item">Devices</li>
                    <li className="sidenav__list-item">About</li>
                </ul>
            </div>

            <div className="main">
                <div className="main-cards">
                    <div className="card">
                        <div className="card-title">
                            <h1>Temperature</h1>
                        </div>
                        <div className="value">
                            <img src={thermometer} alt="" />
                            <p>{(temp.temperature[5]).toFixed(2)} °C</p>
                        </div>
                        <div>
                            <GraphT />
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-title">
                            <h1>Humidity</h1>
                        </div>
                        <div className="value">
                            <img src={drop} alt="" />
                            <p>{humi} %</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-title">
                            <h1>Time</h1>
                        </div>
                        <div className="value_timeLamp">
                            <img src={clock} alt="" />
                            <p>{dtime}</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-title">
                            <h1>Light</h1>
                        </div>
                        <div className="value_timeLamp">
                            <img src={lampImg} alt="" />
                            <Button variant="contained" id="lamp" type="submit" onClick={changeLamp}>  ON/OFF   </Button>

                        </div>
                    </div>
                </div>

            </div>

            <div className="footer">
                <div className="footer__copyright">&copy; 2020</div>
                <div className="footer__signature">ESP32 - FIREBASE</div>
            </div>

        </div>

    );

}