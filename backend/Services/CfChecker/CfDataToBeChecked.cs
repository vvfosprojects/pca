using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Services.CfChecker
{
    public class CfDataToBeChecked
    {
        public string FiscalCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Pin { get; set; }
    }
}