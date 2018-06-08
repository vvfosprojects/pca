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
using System.Web;
using System.Web.Http;
using System.Web.Http.Filters;
using JWT;
using JWT.Algorithms;
using JWT.Builder;
using Newtonsoft.Json;

namespace PCA.Authorization
{
    public class JwtAuthenticationAttribute : ActionFilterAttribute, System.Web.Http.Filters.IAuthenticationFilter
    {
        private const string secret = "AjryHgrt46dg299f8gbcWughTtT5342ydhJJhaget52939489fghdvBvegrftd75d6swhv";

        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            //var token = new JwtBuilder()
            //  .WithAlgorithm(new HMACSHA256Algorithm())
            //  .WithSecret(secret)
            //  //.AddClaim("exp", DateTimeOffset.UtcNow.AddHours(1).ToUnixTimeSeconds())
            //  .ExpirationTime(DateTime.UtcNow)
            //  .AddClaim("username", "foo")
            //  .Build();

            // 1. Look for credentials in the request.
            HttpRequestMessage request = context.Request;
            AuthenticationHeaderValue authorization = request.Headers.Authorization;

            // 2. If there are no credentials, do nothing.
            if (authorization == null)
            {
                return;
            }

            // 3. If there are credentials but the filter does not recognize the
            //    authentication scheme, do nothing.
            if (authorization.Scheme != "Bearer")
            {
                return;
            }

            // 4. If there are credentials that the filter understands, try to validate them.
            // 5. If the credentials are bad, set the error result.
            if (String.IsNullOrEmpty(authorization.Parameter))
            {
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
                context.ErrorResult = new AuthenticationFailureResult(ex.Message, request);
                return;
            }

            if (string.IsNullOrWhiteSpace(userName))
            {
                context.ErrorResult = new AuthenticationFailureResult("Invalid credentials", request);
            }

            IPrincipal principal = await this.VerifyUsername(userName, cancellationToken);
            if (principal == null)
            {
                context.ErrorResult = new AuthenticationFailureResult("Invalid username or password", request);
            }

            // 6. If the credentials are valid, set principal.
            else
            {
                context.Principal = principal;
            }
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            var challenge = new AuthenticationHeaderValue("Bearer");
            context.Result = new AddChallengeOnUnauthorizedResult(challenge, context.Result);
            return Task.FromResult(0);
        }

        private Task<IPrincipal> VerifyUsername(string userName, CancellationToken cancellationToken)
        {
            if (userName != "foo")
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
            try
            {
                var json = new JwtBuilder()
                    .WithSecret(secret)
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