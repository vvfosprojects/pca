//-----------------------------------------------------------------------
// <copyright file="AuthController.cs" company="CNVVF">
// Copyright (C) 2018 - CNVVF
//
// This file is part of Public Competition Application (PCA).
// PCA is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// PCA is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see http://www.gnu.org/licenses/.
// </copyright>
//-----------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Configuration;
using System.Web.Http;
using System.Web.Http.Cors;
using log4net;
using PCA.Models;
using Services.JwtAuthentication;

namespace PCA.Controllers
{
    public class AuthController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

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
            {
                log.Warn($"Invalid credentials on authentication. Username: { data.Username }");
                return new AuthResult(false, string.Empty, DateTime.UtcNow);
            }

            var result = this.jwtTools.GetToken(data.Username);
            log.Info($"Successful authentication. Username: { data.Username }");

            return new AuthResult(true, result.Token, result.ExpirationTime);
        }
    }
}