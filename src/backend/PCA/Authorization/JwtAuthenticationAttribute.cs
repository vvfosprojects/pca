//-----------------------------------------------------------------------
// <copyright file="JwtAuthenticationAttribute.cs" company="CNVVF">
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
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Configuration;
using System.Web.Http;
using System.Web.Http.Filters;
using log4net;
using Services.JwtAuthentication;

namespace PCA.Authorization
{
    public class JwtAuthenticationAttribute : ActionFilterAttribute, System.Web.Http.Filters.IAuthenticationFilter
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private static string adminUsername = WebConfigurationManager.AppSettings["adminUsername"];

        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            // 1. Look for credentials in the request.
            HttpRequestMessage request = context.Request;
            AuthenticationHeaderValue authorization = request.Headers.Authorization;

            // 2. If there are no credentials, do nothing.
            if (authorization == null)
            {
                log.Warn("Missing credentials");
                return;
            }

            // 3. If there are credentials but the filter does not recognize the
            //    authentication scheme, do nothing.
            if (authorization.Scheme != "Bearer")
            {
                log.Warn("Authorization scheme is not Bearer");
                return;
            }

            // 4. If there are credentials that the filter understands, try to validate them.
            // 5. If the credentials are bad, set the error result.
            if (String.IsNullOrEmpty(authorization.Parameter))
            {
                log.Warn("Authorization parameters are empty");
                context.ErrorResult = new AuthenticationFailureResult("Missing credentials", request);
                return;
            }

            string userName;
            try
            {
                userName = ExtractUserName(authorization.Parameter, request);
            }
            catch (Exception ex)
            {
                log.Warn("Cannot extract username from authorization parameters");
                context.ErrorResult = new AuthenticationFailureResult(ex.Message, request);
                return;
            }

            if (string.IsNullOrWhiteSpace(userName))
            {
                log.Warn("Empty username from authorization parameters");
                context.ErrorResult = new AuthenticationFailureResult("Invalid credentials", request);
                return;
            }

            IPrincipal principal = await this.VerifyUsername(userName, cancellationToken);
            if (principal == null)
            {
                log.Warn("Invalid username");
                context.ErrorResult = new AuthenticationFailureResult("Invalid username", request);
            }

            // 6. If the credentials are valid, set principal.
            else
            {
                context.Principal = principal;
            }

            log.Debug($"Authorization successful for { principal.Identity.Name }");
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            var challenge = new AuthenticationHeaderValue("Bearer");
            context.Result = new AddChallengeOnUnauthorizedResult(challenge, context.Result);
            return Task.FromResult(0);
        }

        private Task<IPrincipal> VerifyUsername(string userName, CancellationToken cancellationToken)
        {
            if (userName != adminUsername)
                return null;

            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.WindowsAccountName, userName),
            };

            // create an identity with the valid claims.
            ClaimsIdentity identity = new ClaimsIdentity(claims, "jwt");

            // set the context principal.
            return Task.FromResult<IPrincipal>(new ClaimsPrincipal(new[] { identity }));
        }

        private string ExtractUserName(string token, HttpRequestMessage request)
        {
            var jwtTools = GlobalConfiguration.Configuration.DependencyResolver
                .GetService(typeof(IJwtTools)) as IJwtTools;

            return jwtTools.DecodeUsername(token);
        }
    }

    internal class AuthenticationFailureResult : IHttpActionResult
    {
        private string v;
        private HttpRequestMessage request;

        public AuthenticationFailureResult(string v, HttpRequestMessage request)
        {
            this.v = v;
            this.request = request;
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            return Task.FromResult(Execute());
        }

        private HttpResponseMessage Execute()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            response.RequestMessage = this.request;
            return response;
        }
    }

    public class AddChallengeOnUnauthorizedResult : IHttpActionResult
    {
        public AddChallengeOnUnauthorizedResult(AuthenticationHeaderValue challenge, IHttpActionResult innerResult)
        {
            Challenge = challenge;
            InnerResult = innerResult;
        }

        public AuthenticationHeaderValue Challenge { get; private set; }

        public IHttpActionResult InnerResult { get; private set; }

        public async Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = await InnerResult.ExecuteAsync(cancellationToken);

            if (response.StatusCode == HttpStatusCode.Unauthorized)
            {
                // Only add one challenge per authentication scheme.
                if (!response.Headers.WwwAuthenticate.Any((h) => h.Scheme == Challenge.Scheme))
                {
                    response.Headers.WwwAuthenticate.Add(Challenge);
                }
            }

            return response;
        }
    }
}