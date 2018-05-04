using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Services.CfChecker.CheckResults
{
    public class CfBirthDateMismatch : ICfCheckResult
    {
        public string Code => "CfBirthDateMismatch";

        public string Message => "La data di nascita non è compatibile con il codice fiscale. Controlla meglio.";

        public ResultType Type => ResultType.Error;
    }
}