import { IModal, IInteractionContext, IInteractionOptions } from '../../types/bot-core';
import { ModalSubmitInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, Colors } from 'discord.js';
import InteractionUtils from '../../utilities/interaction.util';
const pinger = require('minecraft-pinger');

const PingModal: IModal = {
    // The custom_id of the modal that this interaction will be executed for
    id: 'ping_modal',

    // Options for this interaction
    options: {
        ephemeral: true,
    },

    // The function that will be executed when the modal is submitted
    async execute({ interaction }: IInteractionContext<ModalSubmitInteraction>): Promise<void> {
        // Respond to the modal submit with a message containing a button
        var domain = JSON.parse(JSON.stringify(interaction.components[0].components[0]))['value'];

        try {
            pinger.pingPromise(domain, 25565).then(async (result: any) => {
                const embed = new EmbedBuilder()
                    .setTitle(domain)
                    .setDescription(result.description)
                    .addFields(
                        {
                            name: 'version',
                            value: 'name:' + result.version.name + ' protocol:' + result.version.protocol,
                        },
                        {
                            name: 'players',
                            value: result.players.online + '/' + result.players.max,
                        }
                    )
                    .setColor(Colors.Green)
                    .setTimestamp();

                await interaction.editReply({ embeds: [embed] });
            });
        } catch (exception: any) {
            const embed = new EmbedBuilder()
                .setTitle(domain)
                .setDescription(exception)
                .setColor(Colors.Red)
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });
        }
    },
};

export default PingModal;
