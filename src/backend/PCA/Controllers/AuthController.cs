using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Configuration;
using System.Web.Http;
using System.Web.Http.Cors;
using PCA.Models;
using Services.JwtAuthentication;

namespace PCA.Controllers
{
    [EnableCors(origins: "http://localhost:4200, http://localhost:4201", headers: "*", methods: "*")]
    public class AuthController : ApiController
    {
        private readonly IJwtTools jwtTools;

        public AuthController(IJwtTools jwtTools)
        {
            this.jwtTools = jwtTools ?? throw new ArgumentNullException(nameof(jwtTools));
        }

        public AuthResult Post(AuthData data)
        {
            var adminUsername = WebConfigurationManager.AppSettings["adminUsername"];
            var adminPassword = WebConfigurationManager.AppSettings["adminPassword"];

            if (adminUsername != data.Username || adminPassword != data.Password)
                return new AuthResult(false, string.Empty, DateTime.UtcNow);

            var result = this.jwtTools.GetToken(data.Username);

            return new AuthResult(true, result.Token, result.ExpirationTime);
        }
    }
}