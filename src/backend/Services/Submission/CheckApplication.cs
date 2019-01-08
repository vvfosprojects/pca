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

        public ApplicationCheckResult Check(Application application, IDictionary<string, object> attributes)
        {
            log.Info($"Application check: { JsonConvert.SerializeObject(application) }");

            bool submit = true;
            string message = null;
            var fields = new List<string>();

            if(attributes.Any())
            {
                foreach (KeyValuePair<string, object> attribute in attributes)
                {
                    string key = attribute.Key;
                    string value = (string) attribute.Value;

                    if (value != null)
                    {
                        switch (key)
                        {
                            case "Nome" :
                                if (!value.ToLower().Equals(application.FirstName.ToLower()))
                                {
                                    fields.Add("Nome");
                                }                                   
                                break;

                            case "Cognome" :
                                if (!value.ToLower().Equals(application.LastName.ToLower()))
                                {
                                    fields.Add("Cognome");
                                }                                    
                                break;

                            case "CodiceFiscale":
                                string prefixcf = "TINIT-";
                                int size_prefixcf = prefixcf.Length;
                                string cf = value.Contains(prefixcf) ? value.Substring(size_prefixcf) : value;
                                if (!cf.Equals(application.FiscalCode.ToLower()))
                                {
                                    fields.Add("Codice Fiscale");
                                }
                                break;

                            case "Email":
                                if (!value.ToLower().Equals(application.Email.ToLower()))
                                {
                                    fields.Add("Email");
                                }
                                break;

                            case "DataNascita":
                                DateTime dataNascita = DateTime.ParseExact(value, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                                if (!dataNascita.Equals(application.BirthDate))
                                {
                                    fields.Add("Data di Nascita");
                                }
                                break;

                            case "RagioneSociale":
                                //TODO: add check
                                break;

                            case "PIva":
                                string prefixpiva = "VATIT-";
                                int size_prefixpiva = prefixpiva.Length;
                                string piva = value.Contains(prefixpiva) ? value.Substring(size_prefixpiva) : value;
                                //TODO: add check
                                break;

                            case "Pec":
                                //TODO: add check
                                break;

                            case "LuogoNascita":
                                //TODO: add check
                                break;

                            case "ProvNascita":
                                //TODO: add check
                                break;

                            case "Sesso":
                                //TODO: add check
                                break;

                            case "NumTel":
                                //TODO: add check
                                break;
                        }
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