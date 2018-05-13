using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DomainModel.Services;

namespace PCA.Controllers
{
    public class CanUpdateApplicationController : ApiController
    {
        private readonly ICanUpdateApplication canUpdateApplication;

        public CanUpdateApplicationController(ICanUpdateApplication canUpdateApplication)
        {
            this.canUpdateApplication = canUpdateApplication ?? throw new ArgumentNullException(nameof(canUpdateApplication));
        }

        public bool CanUpdate(string fiscalCode, string pin)
        {
            return this.canUpdateApplication.CanUpdate(fiscalCode, pin);
        }
    }
}