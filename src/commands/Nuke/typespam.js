import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("loadtest")
    .setDescription("Safely test bot message performance (admin only)")
    .addIntegerOption(opt =>
      opt.setName("amount")
        .setDescription("How many messages to send (max 20)")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: "Admin only.",
        ephemeral: true,
      });
    }

    let amount = interaction.options.getInteger("amount");

   

    await interaction.reply({
      content: `Starting load test: ${amount} messages...`,
      ephemeral: true,
    });

    const start = Date.now();

    for (let i = 0; i < amount; i++) {
      await interaction.channel.send(`Load test message ${i + 1}`);
      await new Promise(r => setTimeout(r, 500)); // delay prevents spam
    }

    const time = Date.now() - start;

    await interaction.followUp({
      content: `Done. Sent ${amount} messages in ${time}ms.`,
      ephemeral: true,
    });
  },
};
