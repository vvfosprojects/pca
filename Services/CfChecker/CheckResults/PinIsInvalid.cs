﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Services.CfChecker.CheckResults
{
    public class PinIsInvalid : ICfCheckResult
    {
        public string Code => "PinIsInvalid";

        public string Message => "Il PIN indicato non è corretto. Controlla meglio.";

        public ResultType Type => ResultType.Warning;
    }
}