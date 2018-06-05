//-----------------------------------------------------------------------
// <copyright file="ResultMessage.cs" company="CNVVF">
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
    public class ResultMessage
    {
        public ResultMessage(string code, string message, string type)
        {
            Code = code ?? throw new ArgumentNullException(nameof(code));
            Message = message ?? throw new ArgumentNullException(nameof(message));
            Type = type ?? throw new ArgumentNullException(nameof(type));
        }

        public string Code { get; }
        public string Message { get; }
        public string Type { get; }
    }
}