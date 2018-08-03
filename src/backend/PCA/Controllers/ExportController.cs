//-----------------------------------------------------------------------
// <copyright file="ExportController.cs" company="CNVVF">
// Copyright (C) 2018 - CNVVF
//
// This file is part of Public Competition Application (PCA).
// PCA is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// PCA is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see http://www.gnu.org/licenses/.
// </copyright>
//-----------------------------------------------------------------------
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
        [HttpPost]
        [Route("api/export/getDownloadAuthKey")]
        public object GetDownloadAuthKey()
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