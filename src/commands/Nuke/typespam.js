import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("typespam")
    .setDescription("spam and be annoying")
    .addIntegerOption(opt =>
      opt.setName("amount")
        .setDescription("how many spam")
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
      await interaction.channel.send(`DOC OWNS YOUDOC OWNS YOUDOC OWNS YOUDOC OWNS YOUDOC OWNS YOUDOC OWNS YOUDOC OWNS YOUDOC OWNS YOUDOC OWNS YOUDOC OWNS YOUDOC OWNS YOUDOC OWNS YOUDOC OWNS YOUDOC OWNS YOU`);
    }

    const time = Date.now() - start;

    await interaction.followUp({
      content: `Done. Sent ${amount} messages in ${time}ms.`,
      ephemeral: true,
    });
  },
};
