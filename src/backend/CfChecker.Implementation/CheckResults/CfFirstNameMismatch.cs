using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Services.CfChecker.Impl.CheckResults
{
    internal class CfFirstNameMismatch : ICfCheckResult
    {
        public string Code => "CfFirstNameMismatch";

        public string Message => "Il nome inserito non è compatibile con il codice fiscale. Controlla meglio.";

        public ResultType Type => ResultType.Error;
    }
}