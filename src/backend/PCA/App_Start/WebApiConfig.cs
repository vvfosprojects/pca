using System.Web.Http;

namespace PCA
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Servizi e configurazione dell'API Web
            config.EnableCors();

            // Route dell'API Web
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}