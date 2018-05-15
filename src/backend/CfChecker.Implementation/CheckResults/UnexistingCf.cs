namespace Services.CfChecker.Impl.CheckResults
{
    internal class UnexistingCf : ICfCheckResult
    {
        public string Code => "UnexistingCf";

        public string Message => "Il codice fiscale non esiste. Strano che tu abbia potuto specificare il PIN.";

        public ResultType Type => ResultType.Warning;
    }
}