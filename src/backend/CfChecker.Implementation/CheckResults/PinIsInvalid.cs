namespace Services.CfChecker.Impl.CheckResults
{
    internal class PinIsInvalid : ICfCheckResult
    {
        public string Code => "PinIsInvalid";

        public string Message => "Il PIN indicato non è corretto. Controlla meglio.";

        public ResultType Type => ResultType.Warning;
    }
}