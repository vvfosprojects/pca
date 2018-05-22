using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Services.CfChecker;

namespace Services.CfChecker.Impl.CheckResults
{
    internal class CfException : ICfCheckResult
    {
        public string Code => "CfEException";

        public string Message => "Errore nel controllo dei dati. Ricontrollare.";

        public ResultType Type => ResultType.Error;
    }
}