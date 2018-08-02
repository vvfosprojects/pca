using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using DomainModel.Services.ApplicationPages;
using PCA.Authorization;

namespace PCA.Controllers
{
    [EnableCors(origins: "http://localhost:4200, http://localhost:4201", headers: "*", methods: "*")]
    public class ExportController : ApiController
    {
        private static Random rnd = new Random();
        private static string currentAuthKey = GetCurrentAuthKey();

        private readonly IGetActiveApplicationPage getActiveApplications;

        public ExportController(
            IGetActiveApplicationPage getActiveApplications)
        {
            this.getActiveApplications = getActiveApplications;
        }

        [Authorize]
        [JwtAuthentication]
        public object Post()
        {
            currentAuthKey = GetCurrentAuthKey();
            return new { authKey = currentAuthKey };
        }

        public async Task<HttpResponseMessage> Get(string searchKey, string downloadAuthKey)
        {
            if (downloadAuthKey != currentAuthKey)
                throw new UnauthorizedAccessException("Unauthorized download");

            var page = await this.getActiveApplications.GetAsync(0, int.MaxValue, searchKey);

            MemoryStream stream = new MemoryStream();
            StreamWriter writer = new StreamWriter(stream);
            foreach (var application in page.Applications)
            {
                writer.WriteLine(application.ToCsv());
            }
            writer.Flush();
            stream.Position = 0;

            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            result.Content = new StreamContent(stream);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("text/csv");
            var now = DateTime.Now.ToString("yyyyMMddHHmmss");
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment") { FileName = $"Export_{now}.csv" };
            return result;
        }

        private static string GetCurrentAuthKey()
        {
            const int length = 50;
            const string chars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[rnd.Next(s.Length)]).ToArray());
        }
    }
}