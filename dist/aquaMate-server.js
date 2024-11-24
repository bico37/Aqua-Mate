"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
let drinkData = [];
function readData() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield promises_1.default.readFile(__dirname + '/../data/data.json', 'utf-8');
        drinkData = JSON.parse(data);
    });
}
readData();
app.use(express_1.default.static(__dirname + '/../public'));
app.listen(port, () => {
    console.log('Server gestartet');
    console.log(`Erreichbar unter http://localhost:${port}`);
});
app.get('/get-drink', (_req, res) => {
    let answer_json = {
        'result': drinkData
    };
    res.send(answer_json);
});
app.post('/add-drink', (req, res) => {
    let drink_date = req.body.date;
    let drink_amount = req.body.amount;
    let drink_type = req.body.type;
    let drink_time = req.body.time;
    let amount_pattern = /^[\d]{1,}([\.]{1}[\d]{1,2})?$/;
    let time_pattern = /^[0-2]{1}[0-9]{1}:[0-6]{1}[0-9]{1}$/;
    let text_pattern = /^[a-zA-ZßöÖäÄüÜ]+$/;
    let date_pattern = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/;
    if (amount_pattern.test(drink_amount) && time_pattern.test(drink_time) && text_pattern.test(drink_type) && date_pattern.test(drink_date)) {
        let newDrink_Input = {
            "date": drink_date,
            "amount": drink_amount,
            "type": drink_type,
            "time": drink_time
        };
        drinkData.push(newDrink_Input);
        try {
            promises_1.default.writeFile(__dirname + '/../data/data.json', JSON.stringify(drinkData, null, 2), 'utf-8');
            console.log('New drink added');
            let answer_json = { 'success': true };
            res.send(answer_json);
        }
        catch (error) {
            let answer_json = { 'success': false };
            res.send(answer_json);
        }
    }
    else {
        res.send("Error");
    }
});
