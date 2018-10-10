//-----------------------------------------------------------------------
// <copyright file="DbContext.cs" company="CNVVF">
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
using DomainModel;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

namespace Persistence.MongoDB
{
    internal class DbContext
    {
        private readonly IMongoDatabase database;

        public DbContext(string mongoUrl)
        {
            InitDbSettings();
            MapClasses();
            this.database = InitDbInstance(mongoUrl);
            CreateIndexes();
        }

        private IMongoDatabase InitDbInstance(string mongoUrl)
        {
            var url = new MongoUrl(mongoUrl);
            var client = new MongoClient(mongoUrl);
            return client.GetDatabase(url.DatabaseName);
        }

        private void InitDbSettings()
        {
            var pack = new ConventionPack();
            pack.Add(new CamelCaseElementNameConvention());
            ConventionRegistry.Register("camel case", pack, t => true);
        }

        private void CreateIndexes()
        {
            {
                var indexDefinition = Builders<Application>.IndexKeys;
                var indexModel = new CreateIndexModel<Application>(
                    indexDefinition
                    .Ascending(_ => _.FiscalCode)
                    .Ascending(_ => _.DeletionTime));
                this.Applications.Indexes.CreateOne(indexModel);
            }

            {
                var indexDefinition = Builders<Application>.IndexKeys;
                var indexModel = new CreateIndexModel<Application>(
                    indexDefinition
                    .Ascending(_ => _.SubmissionTime)
                    .Ascending(_ => _.DeletionTime));

                this.Applications.Indexes.CreateOne(indexModel);
            }

            {
                var indexDefinition = Builders<Application>.IndexKeys;
                var indexModel = new CreateIndexModel<Application>(
                    indexDefinition
                    .Text(_ => _.FiscalCode)
                    .Text(_ => _.FirstName)
                    .Text(_ => _.LastName)
                    .Text(_ => _.Email)
                    .Text(_ => _.Pin)
                    .Text(_ => _.BusinessUnits)
                    .Text(_ => _.License.Number)
                    .Text(_ => _.PhoneNumber),
                    new CreateIndexOptions()
                    {
                        Name = "fullTextIndex"
                    });

                this.Applications.Indexes.CreateOne(indexModel);
            }
        }

        private void MapClasses()
        {
            BsonClassMap.RegisterClassMap<Application>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id)
                    .SetIdGenerator(StringObjectIdGenerator.Instance)
                    .SetSerializer(new StringSerializer(BsonType.ObjectId));
            });
        }

        public IMongoCollection<Application> Applications
        {
            get
            {
                return this.database.GetCollection<Application>("applications");
            }
        }
    }
}