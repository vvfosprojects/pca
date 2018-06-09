using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.JwtAuthentication
{
    public class JwtToken
    {
        public JwtToken(string token, DateTime expirationTime)
        {
            Token = token ?? throw new ArgumentNullException(nameof(token));
            ExpirationTime = expirationTime;
        }

        public string Token { get; }
        public DateTime ExpirationTime { get; }
    }
}