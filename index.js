import config from './config.json';
import discord from 'discord.js';
import fetch from 'node-fetch';

const client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds, discord.GatewayIntentBits.GuildMessages] });

let universeId = 0;
client.on('ready', () => {
    console.log('Bot is ready!');
    // check if bot has been set up
    if (config.token === 'token' || config.placeId === 'placeId' || config.channelId === 'channelId' || config.channelId2 === 'channelId2' || config.channelId3 === 'channelId3') {
        console.log('Please configure the bot before running it! || npm run setup');
        process.exit(1);
    }
    // fetch the universe id
    let placeId = config.placeId;
    fetch(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`)
        .then(res => res.json())
        .then(json => {
            universeId = json.universeId;
            console.log(`Universe id: ${universeId}`);
        }
        )
        .catch(err => {
            console.log('Invalid place id!');
            process.exit(1);
        }
        );
    // fetch the game info
    function mainfunction() {
        fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`)
            .then(res => res.json())
            .then(json => {
            // set the channel names
            client.channels.cache.get(config.channelId).setName(`Visits: ${json.data[0].visits}`)
            .catch(err => {
                console.log('Something went wrong!');
                });
            client.channels.cache.get(config.channelId2).setName(`Playing: ${json.data[0].playing}`)
            .catch(err => {
                console.log('Something went wrong!');
                });
            client.channels.cache.get(config.channelId3).setName(`Favorites: ${json.data[0].favoritedCount}`)
            .catch(err => {
                console.log('Something went wrong!');
                });
            }
            )
            .catch(err => {
                console.log('Something went wrong!');
                }
            );
    }
    // set the interval
    setInterval(() => {
        mainfunction();
    }
    , 30000);
}
);
client.login(config.token);
