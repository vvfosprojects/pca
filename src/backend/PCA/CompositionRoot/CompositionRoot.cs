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
                Persistence.MongoDB.DbServices.ActiveApplicationExistsByFiscalCode>(Lifestyle.Scoped);

            container.Register<
                DomainModel.Services.IActiveApplicationExistsByFiscalCodeAndPin,
                Persistence.MongoDB.DbServices.ActiveApplicationExistsByFiscalCodeAndPin>(Lifestyle.Scoped);

            container.Register<
                DomainModel.Services.ISubmitApplication,
                Services.Submission.SubmitApplication>(Lifestyle.Scoped);

            container.Register<
                DomainModel.Services.IGetActiveApplicationsByFiscalCode,
                Persistence.MongoDB.DbServices.GetActiveApplicationsByFiscalCode>(Lifestyle.Scoped);

            container.Register<
                DomainModel.Services.IPinBuilder,
                Services.Submission.PinBuilder>(Lifestyle.Singleton);

            container.Register<Persistence.MongoDB.DbContext>(() =>
            {
                return new Persistence.MongoDB.DbContext("mongodb://localhost:27017/pca");
            }, Lifestyle.Singleton);

            container.Register<
                DomainModel.Services.IStoreApplication,
                Persistence.MongoDB.DbServices.StoreApplication>(Lifestyle.Singleton);
        }
    }
}