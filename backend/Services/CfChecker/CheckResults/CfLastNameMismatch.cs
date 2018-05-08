using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Services.CfChecker.CheckResults
{
    internal class CfLastNameMismatch : ICfCheckResult
    {
        public string Code => "CfLastNameMismatch";

        public string Message => "Il cognome inserito non è compatibile con il codice fiscale. Controlla meglio.";

        public ResultType Type => ResultType.Error;
    }
}