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
using System.Web.Security;
using Newtonsoft.Json;
using System;
using DomainModel;
using Services.Submission;
using System.IO;

namespace PCA.Controllers
{
    public class SpidController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        [HttpGet]
        [Route("api/spid/login")]
        public HttpResponseMessage GetLogin()
        {
            if (HttpContext.Current == null || HttpContext.Current.Session == null)
            {
                throw new System.ApplicationException("Current Session is null!");
            }

            log.Info("SpidController SessionId: " + HttpContext.Current.Session.SessionID);
            log.Info("SpidController IsNewSession: " + HttpContext.Current.Session.IsNewSession);
            log.Info("SpidController IsAuthenticated: " + HttpContext.Current.Request.IsAuthenticated);
         
            if (CasAuthentication.ServiceTicketManager != null)
            {

                FormsAuthenticationTicket ticket = null;
                HttpCookieCollection cookies = HttpContext.Current.Request.Cookies;
                if (cookies != null && cookies.Count > 0)
                {
                    for (int i = 0; i < cookies.Count; i++)
                    {
                        if (cookies[i].Name.Equals(".ASPXAUTH"))
                        {
                            ticket = FormsAuthentication.Decrypt(cookies[i].Value);
                        }
                    }
                }

                bool IsAuthenticated = HttpContext.Current.Request.IsAuthenticated;

                if (ticket != null && IsAuthenticated)
                {
                    IEnumerable<string> serviceTickets = CasAuthentication.ServiceTicketManager.GetUserServiceTickets(HttpContext.Current.User.Identity.Name);

                    if (serviceTickets != null && serviceTickets.Any())
                    {
                        var dict = new Dictionary<string, string>();
                        CasAuthenticationTicket casTicket = CasAuthentication.ServiceTicketManager.GetTicket(ticket.UserData);

                        var jsonObject = new JObject();
                        if (CasAuthentication.ServiceTicketManager.VerifyClientTicket(casTicket))
                        {
                            dict.Add("status", "OK");
                            dict.Add("message", "Authentication successfully");

                            foreach (KeyValuePair<string, IList<string>> item in casTicket.Assertion.Attributes)
                            {
                                var key = item.Key;
                                var values = item.Value;
                                string attribute = null;
                                foreach (string value in values)
                                {
                                    attribute = value;
                                }
                                dict.Add(key, attribute);
                            }                  
                            HttpContext.Current.Session["attributes_spid"] = dict;
                        }
                        else
                        {
                            dict.Add("status", "KO");
                            dict.Add("message", "Authentication failed!");
                            jsonObject = JObject.Parse(JsonConvert.SerializeObject(dict));
                            return Request.CreateResponse(HttpStatusCode.Unauthorized, jsonObject);
                        }

                        jsonObject = JObject.Parse(JsonConvert.SerializeObject(dict));
                        log.Info("Spind Authentication: " + jsonObject.ToString());
                        return Request.CreateResponse(HttpStatusCode.OK, jsonObject);
                    }
                }
            }

            return Request.CreateResponse(HttpStatusCode.InternalServerError);
        }

        [HttpPost]
        [Route("api/spid/check")]
        public ApplicationCheckResult Post(Application application)
        {

            if (HttpContext.Current == null || HttpContext.Current.Session == null)
            {
                throw new System.ApplicationException("Current Session is null!");
            }

            bool authenticated = HttpContext.Current.Request.IsAuthenticated;
            Dictionary<string, string> attributes = (Dictionary<string, string>) HttpContext.Current.Session["attributes_spid"];
            return new CheckApplication().Check(application, authenticated, attributes);
        }
    }
}
