using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Services.CfChecker.CheckResults
{
    internal class AlreadyExistingCf : ICfCheckResult
    {
        public string Code => "AlreadyExistingCf";

        public string Message => "Se stai modificando una precedente iscrizione, inserisci nella casella accanto il PIN che ti è stato fornito dal sistema.";

        public ResultType Type => ResultType.Warning;
    }
}