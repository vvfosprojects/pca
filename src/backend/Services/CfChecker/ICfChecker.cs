﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.CfChecker
{
    public interface ICfChecker
    {
        ICfCheckOutcome Check(CfDataToBeChecked data);
    }
}