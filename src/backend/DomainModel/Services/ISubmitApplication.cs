namespace DomainModel.Services
{
    public interface ISubmitApplication
    {
        ApplicationSubmissionResult Submit(Application application);
    }
}