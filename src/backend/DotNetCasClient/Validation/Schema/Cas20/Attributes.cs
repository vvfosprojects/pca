using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Xml.Serialization;


namespace DotNetCasClient.Validation.Schema.Cas20
{
    [Serializable]
    [DebuggerStepThrough]
    public class Attributes
    {

        private IDictionary<string, IList<string>> attributeDictionary;

        public Attributes() {
            attributeDictionary = new Dictionary<string, IList<string>>();
        }

        [XmlElement("isFromNewLogin")]
        public string isFromNewLogin
        {
            get ;
            set ;
        }

        [XmlElement("authenticationDate")]
        public string authenticationDate
        {
            get;
            set;
        }

        [XmlElement("successfulAuthenticationHandlers")]
        public string successfulAuthenticationHandlers
        {
            get;
            set;
        }

        [XmlElement("EMail")]
        public string EMail
        {
            get;
            set;
        }

        [XmlElement("Comune")]
        public string Comune
        {
            get;
            set;
        }

        [XmlElement("Nazione")]
        public string Nazione
        {
            get;
            set;
        }

        [XmlElement("credentialType")]
        public string credentialType
        {
            get;
            set;
        }

        [XmlElement("Cap")]
        public string Cap
        {
            get;
            set;
        }

        [XmlElement("NumCivico")]
        public string NumCivico
        {
            get;
            set;
        }

        [XmlElement("authenticationMethod")]
        public string authenticationMethod
        {
            get;
            set;
        }

        [XmlElement("Indirizzo")]
        public string Indirizzo
        {
            get;
            set;
        }

        [XmlElement("longTermAuthenticationRequestTokenUsed")]
        public string longTermAuthenticationRequestTokenUsed
        {
            get;
            set;
        }

        [XmlElement("Nome")]
        public string Nome
        {
            get;
            set;
        }

        [XmlElement("Cognome")]
        public string Cognome
        {
            get;
            set;
        }

        [XmlElement("NumTel")]
        public string NumTel
        {
            get;
            set;
        }

        [XmlElement("Prov")]
        public string Prov
        {
            get;
            set;
        }

        [XmlElement("spidCode")]
        public string spidCode
        {
            get;
            set;
        }

        [XmlElement("name")]
        public string name
        {
            get;
            set;
        }

        [XmlElement("familyName")]
        public string familyName
        {
            get;
            set;
        }

        [XmlElement("fiscalNumber")]
        public string fiscalNumber
        {
            get;
            set;
        }

        [XmlElement("companyName")]
        public string companyName
        {
            get;
            set;
        }

        [XmlElement("ivaCode")]
        public string ivaCode
        {
            get;
            set;
        }

        [XmlElement("mobilePhone")]
        public string mobilePhone
        {
            get;
            set;
        }

        [XmlElement("address")]
        public string address
        {
            get;
            set;
        }

        [XmlElement("digitalAddress")]
        public string digitalAddress
        {
            get;
            set;
        }

        public IDictionary<string, IList<string>> AttributeDictionary()
        {
            if(Nome != null)
            {
                IList<string> listaNome = new List<String>();
                listaNome.Add(Nome);
                attributeDictionary.Add("Nome", listaNome);
            }

            if (Cognome != null)
            {
                IList<string> listaCognome = new List<String>();
                listaCognome.Add(Cognome);
                attributeDictionary.Add("Cognome", listaCognome);
            }

            if (Indirizzo != null)
            {
                IList<string> listaIndirizzo = new List<String>();
                listaIndirizzo.Add(Indirizzo);
                attributeDictionary.Add("Indirizzo", listaIndirizzo);
            }

            if (NumCivico != null)
            {
                IList<string> listaNumCivico = new List<String>();
                listaNumCivico.Add(NumCivico);
                attributeDictionary.Add("NumCivico", listaNumCivico);
            }

            if (Cap != null)
            {
                IList<string> listaCap = new List<String>();
                listaCap.Add(Cap);
                attributeDictionary.Add("Cap", listaCap);
            }

            if (Comune != null)
            {
                IList<string> listaComune = new List<String>();
                listaComune.Add(Comune);
                attributeDictionary.Add("Comune", listaComune);
            }

            if (Prov != null)
            {
                IList<string> listaProv = new List<String>();
                listaProv.Add(Prov);
                attributeDictionary.Add("Prov", listaProv);
            }

            if (Nazione != null)
            {
                IList<string> listaNazione = new List<String>();
                listaNazione.Add(Nazione);
                attributeDictionary.Add("Nazione", listaNazione);
            }

            if (EMail != null)
            {
                IList<string> listaEMail = new List<String>();
                listaEMail.Add(EMail);
                attributeDictionary.Add("EMail", listaEMail);
            }


            if (NumTel != null)
            {
                IList<string> listaNumTel = new List<String>();
                listaNumTel.Add(NumTel);
                attributeDictionary.Add("NumTel", listaNumTel);
            }


            if (spidCode != null)
            {
                IList<string> listaSpidCode = new List<String>();
                listaSpidCode.Add(spidCode);
                attributeDictionary.Add("spidCode", listaSpidCode);
            }

            if (name != null)
            {
                IList<string> listaName = new List<String>();
                listaName.Add(name);
                attributeDictionary.Add("name", listaName);
            }

            if (familyName != null)
            {
                IList<string> listaFamilyName = new List<String>();
                listaFamilyName.Add(EMail);
                attributeDictionary.Add("familyName", listaFamilyName);
            }

            if (fiscalNumber != null)
            {
                IList<string> listaFiscalNumber = new List<String>();
                listaFiscalNumber.Add(fiscalNumber);
                attributeDictionary.Add("fiscalNumber", listaFiscalNumber);
            }

            if (companyName != null)
            {
                IList<string> listaCompanyName = new List<String>();
                listaCompanyName.Add(companyName);
                attributeDictionary.Add("companyName", listaCompanyName);
            }

            if (ivaCode != null)
            {
                IList<string> listaIvaCode = new List<String>();
                listaIvaCode.Add(ivaCode);
                attributeDictionary.Add("ivaCode", listaIvaCode);
            }

            if (mobilePhone != null)
            {
                IList<string> listaMobilePhone = new List<String>();
                listaMobilePhone.Add(mobilePhone);
                attributeDictionary.Add("mobilePhone", listaMobilePhone);
            }

            if (address != null)
            {
                IList<string> listaAddress = new List<String>();
                listaAddress.Add(address);
                attributeDictionary.Add("address", listaAddress);
            }

            if (digitalAddress != null)
            {
                IList<string> listaDigitalAddress = new List<String>();
                listaDigitalAddress.Add(digitalAddress);
                attributeDictionary.Add("digitalAddress", listaDigitalAddress);
            }

            /*
            IList<string> listaIsFromNewLogin = new List<String>();
            listaIsFromNewLogin.Add(isFromNewLogin);
            attributeDictionary.Add("isFromNewLogin", listaIsFromNewLogin);

            IList<string> listaLongTermAuthenticationRequestTokenUsed = new List<String>();
            listaLongTermAuthenticationRequestTokenUsed.Add(longTermAuthenticationRequestTokenUsed);
            attributeDictionary.Add("longTermAuthenticationRequestTokenUsed", listaLongTermAuthenticationRequestTokenUsed);

            IList<string> listaAuthenticationDate = new List<String>();
            listaAuthenticationDate.Add(authenticationDate);
            attributeDictionary.Add("authenticationDate", listaAuthenticationDate);

            IList<string> listaSuccessfulAuthenticationHandlers = new List<String>();
            listaSuccessfulAuthenticationHandlers.Add(successfulAuthenticationHandlers);
            attributeDictionary.Add("successfulAuthenticationHandlers", listaSuccessfulAuthenticationHandlers);

            IList<string> listaAuthenticationMethod = new List<String>();
            listaAuthenticationMethod.Add(authenticationMethod);
            attributeDictionary.Add("authenticationMethod", listaAuthenticationMethod);

            IList<string> listaCredentialType = new List<String>();
            listaCredentialType.Add(credentialType);
            attributeDictionary.Add("credentialType", listaCredentialType);
            */

            return attributeDictionary;
        }

    }
}
