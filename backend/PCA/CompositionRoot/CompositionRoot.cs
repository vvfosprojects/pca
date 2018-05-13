using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SimpleInjector;

namespace PCA.CompositionRoot
{
    internal static class CompositionRoot
    {
        internal static void Wire(Container container)
        {
            container.Register<Services.CfChecker.ICfChecker, CfChecker.Impl.CfChecker>(Lifestyle.Scoped);
            container.Register<
                DomainModel.Services.IActiveApplicationExistsByFiscalCode,
                Persistence.Fake.FakeServices.ActiveApplicationExistsByFiscalCode_ReturnsFalse>(Lifestyle.Scoped);
            container.Register<
                DomainModel.Services.IActiveApplicationExistsByFiscalCodeAndPin,
                Persistence.Fake.FakeServices.ActiveApplicationExistsByFiscalCodeAndPin_ReturnsTrue>(Lifestyle.Scoped);
        }
    }
}