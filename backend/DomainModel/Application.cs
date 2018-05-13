using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel
{
    public class Application
    {
        public string Id { get; set; }

        public string FiscalCode { get; set; }
        public string Pin { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int WorkingDays { get; set; }
        public string DrivingLicense { get; set; }

        public DateTime? DeletionTime { get; set; }
        public Anomaly[] Anomalies { get; set; }
        public bool ToBeSupervised { get; set; }
    }
}