using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatProto
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string channel, string fullName, string message)
        {
            await Clients.Group(channel).SendAsync("ReceiveMessage", fullName, message);
        }

        public async Task Join(string channel, string fullName)
        {
            await Groups.AddToGroupAsync(this.Context.ConnectionId, channel);
            await Clients.Group(channel).SendAsync("ReceiveMessage", "HOST", $"{fullName} joined the room.");
        }
    }
}
