using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PCA.Models
{
    public class AuthResult
    {
        public AuthResult(bool success, string jwtToken, DateTime expirationDate)
        {
            Success = success;
            JwtToken = jwtToken ?? throw new ArgumentNullException(nameof(jwtToken));
            ExpirationDate = expirationDate;
        }

        public bool Success { get; }
        public string JwtToken { get; }
        public DateTime ExpirationDate { get; }
    }
}