using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Services.CfChecker.CheckResults
{
    internal class CfCheckOutcome : ICfCheckOutcome
    {
        public IEnumerable<ICfCheckResult> Results { get; set; }
        public bool CanSubmit { get; set; }
    }
}