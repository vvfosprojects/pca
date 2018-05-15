namespace Services.CfChecker.Impl.CheckResults
{
    internal class CfLastNameMismatch : ICfCheckResult
    {
        public string Code => "CfLastNameMismatch";

        public string Message => "Il cognome inserito non è compatibile con il codice fiscale. Controlla meglio.";

        public ResultType Type => ResultType.Error;
    }
}