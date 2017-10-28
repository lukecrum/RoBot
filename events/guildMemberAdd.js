var Discord = require('discord.js')

exports.run = (bot, member) => {
    bot.getCurrentSetting('welcomeMessagesEnabled', member.guild.id).then(res => {
        if (res == 1) {
            bot.getCurrentSetting('welcomeMessage', member.guild.id).then(text => {
                var welcome = new Discord.RichEmbed()
                    .setAuthor(member.user.username, member.user.avatarURL)
                    .setFooter(member.guild.name)
                    .setTimestamp()
                    .setColor("#00FF00")
                text = text.replace('{server:name}', member.guild.name)
                    .replace('{server:membercount}', member.guild.members.size)
                    .replace('{user:mention}', member.user)
                    .replace('{user:username}', member.user.username)
                    .replace('{user:discrim}', member.user.discriminator)
                welcome.setDescription(text)
                bot.getCurrentSetting('announcementChannel', member.guild.id).then(id => {
                    var channel = member.guild.channels.get(id)
                    channel.send({
                        embed: welcome
                    })
                })
            })
        }
    })
}