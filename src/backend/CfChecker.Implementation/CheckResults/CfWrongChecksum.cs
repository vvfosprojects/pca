using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Services.CfChecker.Impl.CheckResults
{
    internal class CfWrongChecksum : ICfCheckResult
    {
        public string Code => "CfWrongChecksum";

        public string Message => "Il codice fiscale è sbagliato. Ricontrollalo.";

        public ResultType Type => ResultType.Warning;
    }
}