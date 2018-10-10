//-----------------------------------------------------------------------
// <copyright file="License.cs" company="CNVVF">
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

namespace DomainModel
{
    public class License
    {
        public License(string type, string category, string number, string releasedBy, DateTime releaseDate, DateTime validUntil)
        {
            if (string.IsNullOrWhiteSpace(type))
            {
                throw new System.ArgumentException("Cannot be empty", nameof(type));
            }

            if (string.IsNullOrWhiteSpace(category))
            {
                throw new System.ArgumentException("Cannot be empty", nameof(category));
            }

            if (string.IsNullOrWhiteSpace(number))
            {
                throw new System.ArgumentException("Cannot be empty", nameof(number));
            }

            if (string.IsNullOrWhiteSpace(releasedBy))
            {
                throw new System.ArgumentException("Cannot be empty", nameof(releasedBy));
            }

            Type = type;
            Category = category;
            Number = number;
            ReleasedBy = releasedBy;
            ReleaseDate = releaseDate;
            ValidUntil = validUntil;
        }

        public string Type { get; protected set; }
        public string Category { get; protected set; }
        public string Number { get; protected set; }
        public string ReleasedBy { get; protected set; }
        public DateTime ReleaseDate { get; protected set; }
        public DateTime ValidUntil { get; protected set; }

        public override string ToString()
        {
            return $"Patente {Type} di cat. {Category} n. {Number} rilasciata da {ReleasedBy} il {ReleaseDate.ToShortDateString()} valida fino al {ValidUntil.ToShortDateString()}";
        }
    }
}