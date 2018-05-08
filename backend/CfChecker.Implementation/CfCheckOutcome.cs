using System.Collections.Generic;
using System.Linq;
using Services.CfChecker;

namespace CfChecker.Impl
{
    internal class CfCheckOutcome : ICfCheckOutcome
    {
        public CfCheckOutcome()
        {
            this.Results = new List<ICfCheckResult>();
        }

        public IEnumerable<ICfCheckResult> Results { get; }

        public bool CanSubmit
        {
            get
            {
                return !this.Results.Any(r => r.Type == ResultType.Error);
            }
        }

        public void AddResult(ICfCheckResult result)
        {
            ((List<ICfCheckResult>)this.Results).Add(result);
        }
    }
}