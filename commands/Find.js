const { SlashCommandBuilder } = require('discord.js');
const {request} = require ('undici');
const { EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('find')
    .setDescription('Find the sauce')
    .addStringOption(option =>
        option
        .setName('url')
        .setDescription('ImageURL')
        ),
        async execute(interaction){
            const url = interaction.options.getString('url') ?? 'Please provide a URL';

            await interaction.deferReply('Searching for the sauce');
            const result = await request( `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(url)}`);
            const response = await result.body.json();
        
            const Embed  = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('The Sauce')
            .setAuthor({name: 'SauceBot', iconURL: 'https://www.onceuponachef.com/images/2015/07/Homemade-Tomato-Sauce-scaled.jpg'})
            .setThumbnail('https://www.onceuponachef.com/images/2015/07/Homemade-Tomato-Sauce-scaled.jpg')
            .addFields(
                {name: 'Series Title', value: `${response.result[0].anilist.title.romaji}` },
                { name: '\u200B', value: '\u200B' },
                {name: 'Episode', value: `${response.result[0].episode}`, inline: true },
                {name: 'From', value: `${response.result[0].from}`, inline: true },
                {name: 'To', value: `${response.result[0].to}`, inline: true },

            )
            .setImage(response.result[0].image)
            


            await interaction.editReply({embeds: [Embed]});
            
        }
   
}