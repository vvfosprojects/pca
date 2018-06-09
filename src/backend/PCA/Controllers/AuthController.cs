using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Configuration;
using System.Web.Http;
using PCA.Models;
using Services.JwtAuthentication;

namespace PCA.Controllers
{
    public class AuthController : ApiController
    {
        private readonly IJwtTools jwtTools;

        public AuthController(IJwtTools jwtTools)
        {
            this.jwtTools = jwtTools ?? throw new ArgumentNullException(nameof(jwtTools));
        }

        public AuthResult Get(string username, string password)
        {
            var adminUsername = WebConfigurationManager.AppSettings["adminUsername"];
            var adminPassword = WebConfigurationManager.AppSettings["adminPassword"];

            if (adminUsername != username || adminPassword != password)
                return new AuthResult(false, string.Empty, DateTime.UtcNow);

            var result = this.jwtTools.GetToken();

            return new AuthResult(true, result.Token, result.ExpirationTime);
        }
    }
}