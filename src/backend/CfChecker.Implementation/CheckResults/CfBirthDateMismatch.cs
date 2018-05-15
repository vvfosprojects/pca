﻿namespace Services.CfChecker.Impl.CheckResults
{
    internal class CfBirthDateMismatch : ICfCheckResult
    {
        public string Code => "CfBirthDateMismatch";

        public string Message => "La data di nascita non è compatibile con il codice fiscale. Controlla meglio.";

        public ResultType Type => ResultType.Error;
    }
}