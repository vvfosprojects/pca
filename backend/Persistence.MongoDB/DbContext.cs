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
                var indexDefinition = Builders<Application>.IndexKeys
                    .Ascending(_ => _.FiscalCode)
                    .Ascending(_ => _.DeletionTime);

                this.Applications.Indexes.CreateOne(indexDefinition);
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