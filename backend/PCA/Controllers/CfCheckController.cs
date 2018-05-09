using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Services.CfChecker;

namespace PCA.Controllers
{
    public class CfCheckController : ApiController
    {
        private readonly ICfChecker cfChecker;

        public CfCheckController(ICfChecker cfChecker)
        {
            this.cfChecker = cfChecker ?? throw new ArgumentNullException(nameof(cfChecker));
        }

        public ICfCheckOutcome Post(CfDataToBeChecked data)
        {
            return this.cfChecker.Check(data);
        }
    }
}