using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using DomainModel;
using DomainModel.Services;
using Services.CfChecker;

namespace PCA.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class ApplicationController : ApiController
    {
        private readonly ISubmitApplication submitApplication;

        public ApplicationController(ISubmitApplication storeApplication)
        {
            this.submitApplication = storeApplication ?? throw new ArgumentNullException(nameof(storeApplication));
        }

        public ApplicationSubmissionResult Post(Application application)
        {
            application.SourceIp = HttpContext.Current.Request.UserHostAddress;
            return this.submitApplication.Submit(application);
        }
    }
}