using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bogus;
using Bogus.Extensions.Italy;
using DomainModel;
using NUnit.Framework;
using Persistence.MongoDB;

namespace FakeApplicationProducer
{
    [TestFixture]
    public class Producer
    {
        [Test]
        //[Ignore("Not a test but a fake db feeder.")]
        public void FillDatabase()
        {
            var faker = new Faker("it");

            var applications = Enumerable.Range(1, 10000).Select((i) =>
            {
                var person = new Bogus.Person("it");
                var app = new Application(
                    person.CodiceFiscale(),
                    person.FirstName,
                    person.LastName,
                    person.DateOfBirth.Date,
                    person.Email,
                    faker.Random.Replace("******"),
                    new string[0],
                    faker.Random.Number(10, 100),
                    faker.Lorem.Paragraph()
                    );
                app.SourceIp = faker.Internet.Ip();
                app.Anomalies = new Anomaly[0];
                app.SubmissionTime = faker.Date.Between(DateTime.Now.AddMonths(-1), DateTime.Now);
                return app;
            });

            var dbContext = new DbContext("mongodb://localhost:27017/pca");
            dbContext.Applications.InsertMany(applications);
        }
    }
}