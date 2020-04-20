(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBTED-rL_Iq5kRY8PxDJoCotz6PLwiI13s",
        authDomain: "autoroom-1a19b.firebaseapp.com",
        databaseURL: "https://autoroom-1a19b.firebaseio.com/",
        projectId: "autoroom-1a19b",
        storageBucket: "autoroom-1a19b.appspot.com",
        messagingSenderId: "1003878804264",
        appId: "1:1003878804264:web:bc9084b663b1e80f953e1d",
        measurementId: "G-SR4X69F4JM"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();
    var data = database.ref().child('data');
    data.on('value', snapshot => {
        dataContent = snapshot.val();
        const keys = Object.keys(dataContent)
        const last = keys.filter((value) => value === keys[keys.length - 1])[0]
        console.log(dataContent[last])
        document.getElementById('tem').innerText = (dataContent[last].tem).toFixed(2) + '°C';
        document.getElementById('hum').innerText = dataContent[last].hum + '%';
        const datatime = `${dataContent[last].time.split('T')[0]} ${dataContent[last].time.split('T')[1].split('Z')[0]}`
        document.getElementById('time').innerText = moment(datatime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
    });
}());