namespace Services.CfChecker
{
    public interface ICfChecker
    {
        ICfCheckOutcome Check(CfDataToBeChecked data);
    }
}