//-----------------------------------------------------------------------
// <copyright file="AuthResult.cs" company="CNVVF">
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

namespace PCA.Models
{
    public class SpidAttribute
    {
        public string spidcode { get; set; }
        public string nome { get; set; }
        public string cognome { get; set; }
        public string codicefiscale { get; set; }
        public string ragionesociale { get; set; }
        public string indirizzo { get; set; }
        public string piva { get; set; }
        public string numtel { get; set; }
        public string email { get; set; }
        public string pec { get; set; }
        public string luogonascita { get; set; }
        public string provnascita { get; set; }
        public string datanascita { get; set; }
        public string sesso { get; set; }
    }
}