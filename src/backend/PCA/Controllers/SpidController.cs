using PCA.Models;
using System.Web.Http;
using log4net;
using System.Net.Http;
using System.Net;
using DotNetCasClient;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using System.Web;
using Newtonsoft.Json;
using DomainModel;
using Services.Submission;

namespace PCA.Controllers
{
    public class SpidController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        [HttpGet]
        [Route("api/spid/attributes")]
        public HttpResponseMessage GetAttributes()
        {
            if (HttpContext.Current == null || HttpContext.Current.Session == null)
            {
                throw new System.ApplicationException("Current Session is null!");
            }

            //log.Info("SpidController SessionId: " + HttpContext.Current.Session.SessionID);
            //log.Info("SpidController IsNewSession: " + HttpContext.Current.Session.IsNewSession);
            //log.Info("SpidController IsAuthenticated: " + HttpContext.Current.Request.IsAuthenticated);
         
            if (CasAuthentication.ServiceTicketManager != null)
            {
                var jsonObject = new JObject();
                bool authenticated = HttpContext.Current.Request.IsAuthenticated;
                Dictionary<string, string> attributes = (Dictionary<string, string>)HttpContext.Current.Session["attributes_spid"];

                if (authenticated && attributes.Any())
                {
                    jsonObject = JObject.Parse(JsonConvert.SerializeObject(attributes));
                    jsonObject.Add("status", "OK");
                    jsonObject.Add("message", "Authentication successfully");
                    log.Info("Spind Authentication: " + jsonObject.ToString());                                  
                }
                else
                {
                    jsonObject.Add("status", "KO");
                    jsonObject.Add("message", "Not Authorized");                   
                }
                return Request.CreateResponse(HttpStatusCode.OK, jsonObject);
            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
