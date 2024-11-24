import express from 'express';
import fsp from 'fs/promises';

const app = express();
app.use(express.json());
// server konfigurieren
const port = 3000;

interface Drink {
    date: string;
    amount: number;
    type: string;
    time: string;
}

let drinkData: Drink[] = [];

async function readData() {
    const data: string = await fsp.readFile(__dirname + '/../data/data.json', 'utf-8');
    drinkData = JSON.parse(data);
}
readData();

// static file server starten
app.use(express.static(__dirname + '/../public'));

// server starten
app.listen(port, () => {
    console.log('Server gestartet');
    console.log(`Erreichbar unter http://localhost:${port}`);
});

// // NGROK Tunnel öffnen
// import ngrok from 'ngrok';

// (async function () {
//     const url = await ngrok.connect({
//         authtoken: '',
//         addr: port
//     });
//     console.log('***************ngrok Tunnel offen *********************');
//     console.log(url);
//     console.log('');
// })();

// GET ROUTE definieren
app.get('/get-drink', (_req, res) => {
    let answer_json = {
        'result': drinkData
    };
    res.send(answer_json);
});

// POST ROUTE für das Hinzufügen eines Drinks ohne Bild
app.post('/add-drink', (req, res) => {
    let drink_date = req.body.date;
    let drink_amount = req.body.amount;
    let drink_type = req.body.type;
    let drink_time = req.body.time;

    // Pattern zur Validierung der Eingabedaten
    let amount_pattern = /^[\d]{1,}([\.]{1}[\d]{1,2})?$/;
    let time_pattern = /^[0-2]{1}[0-9]{1}:[0-6]{1}[0-9]{1}$/;
    let text_pattern = /^[a-zA-ZßöÖäÄüÜ]+$/;
    let date_pattern = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/;

    if (amount_pattern.test(drink_amount) && time_pattern.test(drink_time) && text_pattern.test(drink_type) && date_pattern.test(drink_date)) {
        let newDrink_Input: Drink = {
            "date": drink_date,
            "amount": drink_amount,
            "type": drink_type,
            "time": drink_time
        };

        drinkData.push(newDrink_Input);

        try {
            fsp.writeFile(__dirname + '/../data/data.json', JSON.stringify(drinkData, null, 2), 'utf-8');
            console.log('New drink added');
            let answer_json = { 'success': true };
            res.send(answer_json);
        } catch (error) {
            let answer_json = { 'success': false };
            res.send(answer_json);
        }
    } else {
        res.send("Error");
    }
});
