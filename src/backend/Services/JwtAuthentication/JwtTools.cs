using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JWT;
using JWT.Algorithms;
using JWT.Builder;
using Newtonsoft.Json;

namespace Services.JwtAuthentication
{
    public class JwtTools : IJwtTools
    {
        private readonly string secretKey;
        private readonly int tokenDuration_Sec;

        public JwtTools(string secretKey,
            int tokenDuration_sec)
        {
            if (string.IsNullOrWhiteSpace(secretKey))
            {
                throw new ArgumentException("Key cannot be empty", nameof(secretKey));
            }

            this.secretKey = secretKey;
            tokenDuration_Sec = tokenDuration_sec;
        }

        public string DecodeUsername(string token)
        {
            try
            {
                var json = new JwtBuilder()
                    .WithSecret(this.secretKey)
                    .MustVerifySignature()
                    .Decode(token);
                var obj = JsonConvert.DeserializeObject<IDictionary<string, object>>(json);
                return (string)obj["username"];
            }
            catch (TokenExpiredException)
            {
                throw new UnauthorizedAccessException("Token expired");
            }
            catch (SignatureVerificationException)
            {
                throw new UnauthorizedAccessException("Token has invalid signature");
            }
        }

        public JwtToken GetToken()
        {
            DateTime expTime = DateTime.UtcNow.AddSeconds(this.tokenDuration_Sec);
            var token = new JwtBuilder()
                .WithAlgorithm(new HMACSHA256Algorithm())
                .WithSecret(this.secretKey)
                .ExpirationTime(expTime)
                .AddClaim("username", "foo")
                .Build();

            return new JwtToken(token, expTime);
        }
    }
}