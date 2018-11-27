//-----------------------------------------------------------------------
// <copyright file="SubmitApplication.cs" company="CNVVF">
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
using System.Linq;
using DomainModel;
using log4net;
using Newtonsoft.Json;
using DomainModel.Services;
using System.Globalization;

namespace Services.Submission
{
    public class CheckApplication : ICheckApplication
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public ApplicationCheckResult Check(Application application, bool authenticated, IDictionary<string, string> attributes)
        {
            log.Info($"Application check: { JsonConvert.SerializeObject(application) }");

            bool submit = true;
            string message = null;
            var fields = new List<string>();

            if(authenticated && attributes.Any())
            {
                foreach (KeyValuePair<string, string> attribute in attributes)
                {
                    string key = attribute.Key;
                    string value = attribute.Value;
                    var check = new { valid = "false" };

                    if (value != null)
                    {
                        if (key.Equals("Nome") && !value.ToLower().Equals(application.FirstName.ToLower()))
                        {               
                            fields.Add("Nome");
                        }
                        else if (key.Equals("Cognome") && !value.ToLower().Equals(application.LastName.ToLower()))
                        {
                            fields.Add("Cognome");
                        }
                        else if (key.Equals("CodiceFiscale"))
                        {
                            string prefixcf = "TINIT-";
                            int size_prefixcf = prefixcf.Length;
                            string cf = value.Contains(prefixcf) ? value.Substring(size_prefixcf) : value;
                        
                            if(!cf.Equals(application.FiscalCode.ToLower()))
                            fields.Add("Codice Fiscale");
                        }
                        else if (key.Equals("Email") && !value.ToLower().Equals(application.Email.ToLower()))
                        {
                            fields.Add("Email");
                        }
                        else if (key.Equals("DataNascita") && !value.ToLower().Equals(application.BirthDate))
                        {
                            DateTime dataNascita = DateTime.ParseExact("2012-04-05", "yyyy-MM-dd", CultureInfo.InvariantCulture);
                            if(!dataNascita.Equals(application.BirthDate))
                                fields.Add("Data di Nascita");
                        }

                        //TODO: add other values to check...
                        // - RagioneSociale
                        // - PIva (VATIT-<PartitaIVA>)
                        // - Pec
                        // - Indirizzo
                        // - LuogoNascita
                        // - ProvNascita
                        // - Sesso
                        // - NumTel
                    }
                }

                if (fields.Any())
                {
                    submit = false;
                    message = "I dati inseriti non sono validi. Controlla le informazioni inserite.";
                }
            }
            else
            {
                submit = false;
                message = "Errore durante l'esecuzione: Utente non autenticato!";
            }

            log.Debug("Application check");

            return new ApplicationCheckResult(submit, message, (fields.Any() ? fields.ToArray() : null));
        }
    }
}