using System;

namespace DomainModel
{
    public class Anomaly
    {
        public string Code { get; set; }
        public DateTime DetectionTime { get; set; }
        public string Info { get; set; }
    }
}