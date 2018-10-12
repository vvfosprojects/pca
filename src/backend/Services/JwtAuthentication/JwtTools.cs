//-----------------------------------------------------------------------
// <copyright file="JwtTools.cs" company="CNVVF">
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
using JWT;
using JWT.Algorithms;
using JWT.Builder;
using Newtonsoft.Json;

namespace Services.JwtAuthentication
{
    public class JwtTools : IJwtTools
    {
        private readonly string secretKey;
        private readonly int tokenDuration_Sec;

        public JwtTools(string secretKey,
            int tokenDuration_sec)
        {
            if (string.IsNullOrWhiteSpace(secretKey))
            {
                throw new ArgumentException("Key cannot be empty", nameof(secretKey));
            }

            this.secretKey = secretKey;
            tokenDuration_Sec = tokenDuration_sec;
        }

        public string DecodeUsername(string token)
        {
            try
            {
                var json = new JwtBuilder()
                    .WithSecret(this.secretKey)
                    .MustVerifySignature()
                    .Decode(token);
                var obj = JsonConvert.DeserializeObject<IDictionary<string, object>>(json);
                return (string)obj["username"];
            }
            catch (TokenExpiredException)
            {
                throw new UnauthorizedAccessException("Token expired");
            }
            catch (SignatureVerificationException)
            {
                throw new UnauthorizedAccessException("Token has invalid signature");
            }
        }

        public JwtToken GetToken(string username)
        {
            DateTime expTime = DateTime.UtcNow.AddSeconds(this.tokenDuration_Sec);
            var token = new JwtBuilder()
                .WithAlgorithm(new HMACSHA256Algorithm())
                .WithSecret(this.secretKey)
                .ExpirationTime(expTime)
                .AddClaim("username", username)
                .Build();

            return new JwtToken(token, expTime);
        }
    }
}