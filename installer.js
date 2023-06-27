// ask for the place id 

import inquirer from 'inquirer';
import fs from 'fs';


const questions = [
    {
        type: 'input',
        name: 'token',
        message: 'What is your bot token?'
    },
    {
        type: 'input',
        name: 'placeId',
        message: 'What is the place id of the game you want to monitor?'
    },
    {
        type: 'input',
        name: 'channelId',
        message: 'What is the channel id for total visits?',
    },
    {
        type: 'input',
        name: 'channelId2',
        message: 'What is the channel id for showing current players?',
    },
    {
        type: 'input',
        name: 'channelId3',
        message: 'What is the channel id for showing total favorites?',
    }
];

inquirer.prompt(questions).then(answers => {
    console.log(`Place id: ${answers['placeId']}`);
    console.log(`Channel id for total visits: ${answers['channelId']}`);
    console.log(`Channel id for showing current players: ${answers['channelId2']}`);
    console.log(`Channel id for showing total favorites: ${answers['channelId3']}`);
    let data = {
        token: answers['token'],
        placeId: answers['placeId'],
        channelId: answers['channelId'],
        channelId2: answers['channelId2'],
        channelId3: answers['channelId3']
    };
    let dataString = JSON.stringify(data);
    dataString = dataString.replace(/{/g, '{\n');
    dataString = dataString.replace(/}/g, '\n}');
    dataString = dataString.replace(/,/g, ',\n');
    fs.writeFile('config.json', dataString, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    }
    );
}
);