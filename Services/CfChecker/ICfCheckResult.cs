using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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