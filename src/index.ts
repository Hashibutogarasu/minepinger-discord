import { Client, GatewayIntentBits } from 'discord.js';
import Bot from './Bot';
import Logger from './utilities/logger.util';
import { registerCommands } from './utilities/registration.util';
import { ICommand, IModal, IButton } from './types/bot-core';
import { TestCommand, PingCommand, TestButton, TestModal, PingModal } from './interactions/index';
import { config } from 'dotenv';

config();

var express = require('express');
var app = express();

var server = require('http').createServer(app);
app.get('/', function (request: any, response: any) {
    response.json({ status: 'OK' });
});

server.listen(80);

async function start(): Promise<void> {
    if (!process.env.BOT_TOKEN) {
        Logger.error('BOT_TOKEN is missing. The bot cannot start without it.');
        return;
    }
    const client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildScheduledEvents],
    });

    const commands: ICommand[] = [PingCommand];
    const buttons: IButton[] = [];
    const modals: IModal[] = [PingModal];

    const bot = new Bot({
        token: process.env.BOT_TOKEN,
        client,
        interactions: {
            commands,
            buttons,
            modals,
        },
    });

    if (process.argv.includes('--register-commands')) {
        if (!process.env.BOT_CLIENT_ID) {
            Logger.error('BOT_CLIENT_ID is missing. The bot cannot register commands without it.');
            return;
        }

        await registerCommands(process.env.BOT_TOKEN, process.env.BOT_CLIENT_ID, commands);
        return;
    }

    await bot.start();
}

process.on('uncaughtException', function (exception) {
    // handle or ignore error
});

start();
