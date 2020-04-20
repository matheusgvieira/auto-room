import React, { useState } from 'react';
import './styles.css';
import ReactDOM from 'react-dom';
import firebase from '../../firebase';
import moment from 'moment';

export default function RealTime() {
    const temperature = firebase.database().ref('temperature');
    const humidity = firebase.database().ref('humidity');
    const time = firebase.database().ref('time');
    const lamp = firebase.database().ref('lamp');

    temperature.on('value', (snapshot) => {
        let tem = snapshot.val();
        const keys = Object.keys(tem)
        const last = keys.filter((value) => value === keys[keys.length - 1])[0]
        console.log(tem[last]);
        ReactDOM.render((tem[last]).toFixed(2) + '°C', document.getElementById('tem'));
    })
    humidity.on('value', (snapshot) => {
        let hum = snapshot.val()
        const keys = Object.keys(hum)
        const last = keys.filter((value) => value === keys[keys.length - 1])[0]
        console.log(hum[last]);
        ReactDOM.render(hum[last] + '%', document.getElementById('hum'));
        //document.getElementById('hum').innerText = hum[last].hum + '%';
    })
    time.on('value', (snapshot) => {
        let datatime = snapshot.val()
        const keys = Object.keys(datatime)
        const last = keys.filter((value) => value === keys[keys.length - 1])[0]
        console.log(datatime[last])

        const dataTime = `${datatime[last].split('T')[0]} ${datatime[last].split('T')[1].split('Z')[0]}`
        ReactDOM.render(moment(dataTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'), document.getElementById('time'));
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
    function sayHello() {
        lamp.set(!currentLampValue);
    }
    
    return (
        <div>
            <div className="header">
                <a href="#default" class="logo">AutoRoom</a>
                <div class="header-right">
                    <a class="active" href="#home">RealTime</a>
                    <a href="#contact">History</a>
                    <a href="#about">About</a>
                </div>
            </div>


            <div className="main-container">
                <div>
                    <div className="value">
                        <h1>Temperatura</h1>
                        <p id="tem"></p>
                    </div>

                    <div className="value">
                        <h1>Humidade</h1>
                        <p id="hum"></p>
                    </div>
                </div>

                <div>
                    <div className="value">
                        <h1>Time</h1>
                        <p id="time"></p>
                    </div>
                    <div className="value">
                        <h1>Lâmpada</h1>
                        <button id="lamp" type="submit" onClick={sayHello}> Ligar/Desligar</button>
                    </div>
                </div>
            </div>


        </div>

    );

}