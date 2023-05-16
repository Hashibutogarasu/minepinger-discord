import { ICommand, IInteractionContext } from '../../types/bot-core';
import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    TextInputStyle,
    ComponentType,
    ActionRowBuilder,
} from 'discord.js';
import { ModalBuilder, TextInputBuilder } from '@discordjs/builders';

const PingCommand: ICommand = {
    // The builder that will be used to register the command
    builder: new SlashCommandBuilder().setName('ping').setDescription('send ping to minecraft'),

    // The function that will be executed when the command is used
    async execute({ interaction }: IInteractionContext<ChatInputCommandInteraction>): Promise<void> {
        // Create a new modal
        const modal = new ModalBuilder({
            title: 'Send ping',
            custom_id: 'ping_modal',
        });

        // Create a new text input
        const textInput = new TextInputBuilder({
            custom_id: 'ping_text_input',
            label: 'Server domain',
            placeholder: 'mc.hypixel.net',
            style: TextInputStyle.Short,
            type: ComponentType.TextInput,
        });

        // Create a new action row
        const row = new ActionRowBuilder<TextInputBuilder>().addComponents(textInput);

        // Add the row to the modal
        modal.addComponents(row);

        // Send the modal to the user
        await interaction.showModal(modal);
    },
};

export default PingCommand;
