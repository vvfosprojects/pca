//-----------------------------------------------------------------------
// <copyright file="Producer.cs" company="CNVVF">
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
using System.Linq;
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
        [Ignore("Not a test but a fake db feeder.")]
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