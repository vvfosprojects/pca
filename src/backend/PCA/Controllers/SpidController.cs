using PCA.Models;
using System.Web.Http;
using log4net;
using System.Net.Http;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using System.Web;
using Newtonsoft.Json;
using System;
using System.Net.Http.Headers;
using DomainModel.Services;

namespace PCA.Controllers
{
    public class SpidController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        [HttpGet]
        [Route("api/spid/attributes")]
        public HttpResponseMessage GetAttributes()
        {

            var jsonObject = new JObject();
            try
            {
                string token = null;
                var authHeader = HttpContext.Current.Request.Headers["Authorization"];
                if (authHeader != null)
                {
                    AuthenticationHeaderValue authorization = AuthenticationHeaderValue.Parse(authHeader);
                    token = authorization.Parameter;
                }

                if (token != null)
                {
                    IJwtTools jwtTools = GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(IJwtTools)) as IJwtTools;
                    IDictionary<string, object> attributes = jwtTools.DecodeAttributes(token);

                    log.Info("Successful authentication");
                    jsonObject = JObject.Parse(JsonConvert.SerializeObject(attributes));
                    jsonObject.Add("status", "OK");
                    jsonObject.Add("message", "SPID attributes found correctly");
                    log.Info("SPID attributes found correctly: " + jsonObject.ToString());
                }
                else
                {
                    jsonObject.Add("status", "KO");
                    jsonObject.Add("message", "SPID attributes not found!");
                    log.Warn("SPID attributes not found: " + jsonObject.ToString());
                }                  
            }
            catch (Exception e)
            {
                log.Warn("GetAttributes: " + e.Message);
                jsonObject.Add("status", "KO");
                jsonObject.Add("message", e.Message);
            }
    
            return Request.CreateResponse(HttpStatusCode.OK, jsonObject);
        }


        [HttpGet]
        [Route("api/spid/token")]
        public AuthResult GetJwtToken()
        {     
            bool authenticated = HttpContext.Current.Request.IsAuthenticated;
            Dictionary<string, string> attributes = (Dictionary<string, string>) HttpContext.Current.Session["attributes_spid"];

            if (authenticated && attributes.Any())
            {
                IJwtTools jwtTools = GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(IJwtTools)) as IJwtTools;
                var result = jwtTools.GetToken(attributes);
                log.Info("Successful authentication");
                return new AuthResult(true, result.Token, result.ExpirationTime);
            }
        
            log.Warn("Not Authorized");
            return new AuthResult(false, string.Empty, DateTime.UtcNow);
        }

    }
}
