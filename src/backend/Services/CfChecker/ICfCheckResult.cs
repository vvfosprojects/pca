namespace Services.CfChecker
{
    public enum ResultType { Error, Warning, Success }

    public interface ICfCheckResult
    {
        string Code { get; }
        string Message { get; }
        ResultType Type { get; }
    }
}