using System;
using System.Collections.Generic;
using System.Xml;
using System.Linq;
using System.Xml.Linq;

namespace DotNetCasClient.Validation.Schema.Cas20
{
    class AuthenticationAttributes
    {

        private IDictionary<string, IList<string>> attributeDictionary;

        public AuthenticationAttributes()
        {
            attributeDictionary = new Dictionary<string, IList<string>>();
        }

        public IDictionary<string, IList<string>> AttributesDictionaryFromXml(string responseXml)
        {
            try
            {

                XDocument doc = XDocument.Parse(responseXml);
                XNamespace cas = "http://www.yale.edu/tp/cas";
               
                foreach (XElement element in doc.Descendants().Where(p => p.Name.Namespace == cas && p.HasElements == false))
                {
                    string keyName = element.Name.LocalName;

                    if (keyName.Equals("user"))
                    {
                        continue;
                    }

                    IList<string> lista = new List<String>();
                    lista.Add(element.Value);
                    attributeDictionary.Add(keyName, lista);

                }            
            } catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
            }

            return attributeDictionary;
        }

    }
}
