using System.Collections.Generic;

namespace Services.CfChecker
{
    public interface ICfCheckOutcome
    {
        IEnumerable<ICfCheckResult> Results { get; }
        bool CanSubmit { get; }
    }
}