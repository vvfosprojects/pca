//-----------------------------------------------------------------------
// <copyright file="CfCheckerTester.cs" company="CNVVF">
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
using System.Linq;
using DomainModel.Services;
using Moq;
using NUnit.Framework;
using Services.CfChecker;

namespace CfChecker.Impl.UnitTests
{
    [TestFixture]
    public class CfCheckerTester
    {
        [Test]
        public void MyFiscalCodeWorks()
        {
            CfChecker checker = GetCfChecker();
            var data = new CfDataToBeChecked("SPSMCL73T16L259D", "Marcello", "Esposito", new DateTime(1973, 12, 16), string.Empty);

            var results = checker.Check(data);

            Assert.That(results.Results, Is.Empty);
        }

        private static CfChecker GetCfChecker()
        {
            var activeApplicationExistsByFiscalCode = new Mock<IActiveApplicationExistsByFiscalCode>();
            activeApplicationExistsByFiscalCode.Setup(a => a.Exists(It.IsAny<string>())).Returns(false);
            var activeApplicationExistsByFiscalCodeAndPin = new Mock<IActiveApplicationExistsByFiscalCodeAndPin>();
            activeApplicationExistsByFiscalCodeAndPin.Setup(a => a.Exists(It.IsAny<string>(), It.IsAny<string>())).Returns(true);

            var checker = new CfChecker(activeApplicationExistsByFiscalCode.Object, activeApplicationExistsByFiscalCodeAndPin.Object);
            return checker;
        }

        /// <summary>
        /// Check whether an omocode fiscal code works.
        /// <see cref="http://community.visual-basic.it/lucianob/articles/2234.aspx"/>
        /// <see cref="https://it.wikipedia.org/wiki/Codice_fiscale"/>
        /// </summary>
        [Test]
        public void AnOmocodeFiscalCodeWorks()
        {
            var checker = GetCfChecker();
            var data = new CfDataToBeChecked("BNZVCN32S10E57PV", "Vincenzo", "Bonzi", new DateTime(1932, 11, 10), string.Empty);

            var results = checker.Check(data);

            Assert.That(results.Results, Is.Empty);
        }

        [Test]
        public void MyFiscalCodeWithWrongFirstnameGivesFirstnameError()
        {
            var checker = GetCfChecker();
            var data = new CfDataToBeChecked("SPSMCM73T16L259D", "Marcello", "Esposito", new DateTime(1973, 12, 16), string.Empty);

            var results = checker.Check(data);

            Assert.That(results.Results.Count(r => r.Code == "CfFirstNameMismatch"), Is.EqualTo(1));
        }

        [Test]
        public void MyFiscalCodeWithWrongLastnameGivesLastnameError()
        {
            var checker = GetCfChecker();
            var data = new CfDataToBeChecked("SPPMCL73T16L259D", "Marcello", "Esposito", new DateTime(1973, 12, 16), string.Empty);

            var results = checker.Check(data);

            Assert.That(results.Results.Count(r => r.Code == "CfLastNameMismatch"), Is.EqualTo(1));
        }

        [Test]
        public void MyFiscalCodeWithWrongDayGivesBirthDateError()
        {
            var checker = GetCfChecker();
            var data = new CfDataToBeChecked("SPSMCL73T17L259D", "Marcello", "Esposito", new DateTime(1973, 12, 16), string.Empty);

            var results = checker.Check(data);

            Assert.That(results.Results.Count(r => r.Code == "CfBirthDateMismatch"), Is.EqualTo(1));
        }

        [Test]
        public void MyFiscalCodeWithWrongMonthGivesBirthDateError()
        {
            var checker = GetCfChecker();
            var data = new CfDataToBeChecked("SPSMCL73A16L259D", "Marcello", "Esposito", new DateTime(1973, 12, 16), string.Empty);

            var results = checker.Check(data);

            Assert.That(results.Results.Count(r => r.Code == "CfBirthDateMismatch"), Is.EqualTo(1));
        }

        [Test]
        public void MyFiscalCodeWithWrongYearGivesBirthDateError()
        {
            var checker = GetCfChecker();
            var data = new CfDataToBeChecked("SPSMCL74T16L259D", "Marcello", "Esposito", new DateTime(1973, 12, 16), string.Empty);

            var results = checker.Check(data);

            Assert.That(results.Results.Count(r => r.Code == "CfBirthDateMismatch"), Is.EqualTo(1));
        }

        [Test]
        public void MyFiscalCodeWithWrongChecksumGivesChecksumError()
        {
            var checker = GetCfChecker();
            var data = new CfDataToBeChecked("SPSMCL73T16L259E", "Marcello", "Esposito", new DateTime(1973, 12, 16), string.Empty);

            var results = checker.Check(data);

            Assert.That(results.Results.Single().Code, Is.EqualTo("CfWrongChecksum"));
        }

        [Test]
        public void GivesAnomalyIfCfExists()
        {
            var activeApplicationExistsByFiscalCode = new Mock<IActiveApplicationExistsByFiscalCode>();
            activeApplicationExistsByFiscalCode.Setup(a => a.Exists(It.IsAny<string>())).Returns(true);
            var activeApplicationExistsByFiscalCodeAndPin = new Mock<IActiveApplicationExistsByFiscalCodeAndPin>();
            activeApplicationExistsByFiscalCodeAndPin.Setup(a => a.Exists(It.IsAny<string>(), It.IsAny<string>())).Returns(true);

            var checker = new CfChecker(activeApplicationExistsByFiscalCode.Object, activeApplicationExistsByFiscalCodeAndPin.Object);

            var data = new CfDataToBeChecked("SPSMCL73T16L259D", "Marcello", "Esposito", new DateTime(1973, 12, 16), string.Empty);

            var results = checker.Check(data);

            Assert.That(results.Results.Single().Code, Is.EqualTo("AlreadyExistingCf"));
        }

        [Test]
        public void GivesAnomalyIfPinIsProvidedButCfDoesNotExist()
        {
            var activeApplicationExistsByFiscalCode = new Mock<IActiveApplicationExistsByFiscalCode>();
            activeApplicationExistsByFiscalCode.Setup(a => a.Exists(It.IsAny<string>())).Returns(false);
            var activeApplicationExistsByFiscalCodeAndPin = new Mock<IActiveApplicationExistsByFiscalCodeAndPin>();
            activeApplicationExistsByFiscalCodeAndPin.Setup(a => a.Exists(It.IsAny<string>(), It.IsAny<string>())).Returns(false);

            var checker = new CfChecker(activeApplicationExistsByFiscalCode.Object, activeApplicationExistsByFiscalCodeAndPin.Object);

            var data = new CfDataToBeChecked("SPSMCL73T16L259D", "Marcello", "Esposito", new DateTime(1973, 12, 16), "12345");

            var results = checker.Check(data);

            Assert.That(results.Results.Single().Code, Is.EqualTo("UnexistingCf"));
        }

        [Test]
        public void GivesAnomalyIfUnmatchingPinIsProvided()
        {
            var activeApplicationExistsByFiscalCode = new Mock<IActiveApplicationExistsByFiscalCode>();
            activeApplicationExistsByFiscalCode.Setup(a => a.Exists(It.IsAny<string>())).Returns(true);
            var activeApplicationExistsByFiscalCodeAndPin = new Mock<IActiveApplicationExistsByFiscalCodeAndPin>();
            activeApplicationExistsByFiscalCodeAndPin.Setup(a => a.Exists(It.IsAny<string>(), It.IsAny<string>())).Returns(false);

            var checker = new CfChecker(activeApplicationExistsByFiscalCode.Object, activeApplicationExistsByFiscalCodeAndPin.Object);

            var data = new CfDataToBeChecked("SPSMCL73T16L259D", "Marcello", "Esposito", new DateTime(1973, 12, 16), "12345");

            var results = checker.Check(data);

            Assert.That(results.Results.Single().Code, Is.EqualTo("PinIsInvalid"));
        }

        [Test]
        public void SucceedsIfValidPinIsProvided()
        {
            var activeApplicationExistsByFiscalCode = new Mock<IActiveApplicationExistsByFiscalCode>();
            activeApplicationExistsByFiscalCode.Setup(a => a.Exists(It.IsAny<string>())).Returns(true);
            var activeApplicationExistsByFiscalCodeAndPin = new Mock<IActiveApplicationExistsByFiscalCodeAndPin>();
            activeApplicationExistsByFiscalCodeAndPin.Setup(a => a.Exists(It.IsAny<string>(), It.IsAny<string>())).Returns(true);

            var checker = new CfChecker(activeApplicationExistsByFiscalCode.Object, activeApplicationExistsByFiscalCodeAndPin.Object);

            var data = new CfDataToBeChecked("SPSMCL73T16L259D", "Marcello", "Esposito", new DateTime(1973, 12, 16), "12345");

            var results = checker.Check(data);

            Assert.That(results.Results.All(a => a.Type == ResultType.Success), Is.True);
        }
    }
}