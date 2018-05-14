using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel;

namespace DomainModel.Services
{
    public interface ISubmitApplication
    {
        ApplicationSubmissionResult Submit(Application application);
    }
}