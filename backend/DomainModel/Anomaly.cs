using System;

namespace DomainModel
{
    public class Anomaly
    {
        public Anomaly(string code, DateTime detectionTime, string info)
        {
            Code = code ?? throw new ArgumentNullException(nameof(code));
            DetectionTime = detectionTime;
            Info = info ?? throw new ArgumentNullException(nameof(info));
        }

        public string Code { get; }
        public DateTime DetectionTime { get; }
        public string Info { get; }
    }
}