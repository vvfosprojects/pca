namespace Services.JwtAuthentication
{
    public interface IJwtTools
    {
        string DecodeUsername(string token);

        JwtToken GetToken();
    }
}