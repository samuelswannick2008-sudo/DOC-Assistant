import {
  SlashCommandBuilder,
  PermissionFlagsBits,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("renameall")
    .setDescription("Rename all channels in a category (Administrator only)")
    .addStringOption(option =>
      option
        .setName("prefix")
        .setDescription("Prefix for channel names")
        .setRequired(true)
    )
    .addChannelOption(option =>
      option
        .setName("category")
        .setDescription("Category to modify")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: "You need Administrator permission.",
        ephemeral: true,
      });
    }

    const prefix = interaction.options.getString("prefix");
    const category = interaction.options.getChannel("category");

    if (!category || category.type !== 4) {
      return interaction.reply({
        content: "Select a valid category.",
        ephemeral: true,
      });
    }

    await interaction.reply({
      content: `Renaming channels in **${category.name}**...`,
      ephemeral: true,
    });

    let count = 0;

    for (const [, channel] of category.children.cache) {
      try {
        const cleaned = channel.name.replace(/^[^-]+-/, "");
        await channel.setName(`${prefix}-${cleaned}`);
        count++;
      } catch (err) {
        console.error(err);
      }
    }

    await interaction.followUp({
      content: `Done. Renamed ${count} channels.`,
      ephemeral: true,
    });
  },
};
