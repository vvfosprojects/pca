//-----------------------------------------------------------------------
// <copyright file="PinBuilder.cs" company="CNVVF">
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
using System.Text;
using DomainModel.Services;

namespace Services.Submission
{
    internal class PinBuilder : IPinBuilder
    {
        private Random rnd = new Random();
        private char[] chars = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'M', 'N', 'P', 'Q', 'R', 'T', 'W', 'X', 'Y', 'Z', '2', '3', '4', '6', '7', '8', '9' };

        public string Build()
        {
            var sb = new StringBuilder();

            for (int i = 0; i < 6; i++)
                sb.Append(this.chars[rnd.Next(chars.Length)]);

            return sb.ToString();
        }
    }
}