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
using System.Globalization;

namespace PCA.Controllers
{
    public class SpidController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private readonly IJwtTools jwtTools;

        public SpidController(IJwtTools jwtTools)
        {
            this.jwtTools = jwtTools ?? throw new ArgumentNullException(nameof(jwtTools));
        }

        [HttpGet]
        [Route("api/spid/token")]
        public AuthResult GetJwtToken()
        {
            bool isAuthenticated = HttpContext.Current.Request.IsAuthenticated;
            Dictionary<string, string> attributes = (Dictionary<string, string>)HttpContext.Current.Session["attributes_spid"];

            if (isAuthenticated && attributes.Any())
            {
                var result = this.jwtTools.GetToken(attributes);
                log.Info("Successful JWT Token: " + result.Token);
                return new AuthResult(true, result.Token, result.ExpirationTime);
            }

            log.Warn("Not authenticated or missing SPID Attributes");
            return new AuthResult(false, string.Empty, DateTime.UtcNow);
        }

        [HttpGet]
        [Route("api/spid/attributes")]
        public SpidAttributeResult GetAttributes()
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
                    log.Info("Successful authentication");
                    IDictionary<string, object> attributes = this.jwtTools.DecodeAttributes(token);
                    SpidAttribute spidAttribute = this.getSpidAttribute(attributes);
                    return new SpidAttributeResult(true, "SPID attributes found correctly", spidAttribute);
                }
            }
            catch (Exception e)
            {
                return new SpidAttributeResult(false, e.Message, null);
            }

            return new SpidAttributeResult(false, "SPID attributes not found!", null);
        }

        private SpidAttribute getSpidAttribute(IDictionary<string, object> attributes)
        {
            SpidAttribute spidAttribute = new SpidAttribute();

            foreach (KeyValuePair<string, object> attribute in attributes)
            {
                string key = attribute.Key;
                string value = (string)attribute.Value;

                if (value != null)
                {
                    switch (key)
                    {
                        case "spidCode":
                            spidAttribute.spidcode = value;
                            break;
                        case "Nome":
                            spidAttribute.nome = value;
                            break;
                        case "Cognome":
                            spidAttribute.cognome = value;
                            break;
                        case "CodiceFiscale":
                            string prefixcf = "TINIT-";
                            int size_prefixcf = prefixcf.Length;
                            string cf = value.Contains(prefixcf) ? value.Substring(size_prefixcf) : value;
                            spidAttribute.codicefiscale = value;
                            break;
                        case "Email":
                            spidAttribute.email = value;
                            break;
                        case "DataNascita":                           
                            spidAttribute.datanascita = value;
                            break;
                        case "RagioneSociale":
                            spidAttribute.ragionesociale = value;
                            break;
                        case "PIva":
                            string prefixpiva = "VATIT-";
                            int size_prefixpiva = prefixpiva.Length;
                            string piva = value.Contains(prefixpiva) ? value.Substring(size_prefixpiva) : value;
                            spidAttribute.piva = piva;
                            break;
                        case "Pec":
                            spidAttribute.pec = value;
                            break;
                        case "LuogoNascita":
                            spidAttribute.luogonascita = value;
                            break;
                        case "ProvNascita":
                            spidAttribute.provnascita = value;
                            break;
                        case "Sesso":
                            spidAttribute.sesso = value;
                            break;
                        case "NumTel":
                            spidAttribute.numtel = value;
                            break;
                    }
                }
            }

            return spidAttribute;
        }

    }
}
