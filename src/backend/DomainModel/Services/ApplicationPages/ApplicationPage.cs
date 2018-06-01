using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Services.ApplicationPages
{
    public class ApplicationPage
    {
        public ApplicationPage(int startIdx, int howMany, int totalCount, IList<Application> applications)
        {
            StartIdx = startIdx;
            HowMany = howMany;
            TotalCount = totalCount;
            Applications = applications ?? throw new ArgumentNullException(nameof(applications));
        }

        public int StartIdx { get; }
        public int HowMany { get; }
        public int TotalCount { get; }
        public IList<Application> Applications { get; }
    }
}