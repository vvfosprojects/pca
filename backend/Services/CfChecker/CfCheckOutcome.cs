using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Services.CfChecker
{
    public class CfCheckOutcome
    {
        public IEnumerable<ICfCheckResult> Results { get; set; }
        public bool CanSubmit { get; set; }
    }
}