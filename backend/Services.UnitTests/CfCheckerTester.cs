using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
            var checker = new CfChecker();
            var data = new CfDataToBeChecked("SPSMCL73T16L259D", "Marcello", "Esposito", new DateTime(1973, 12, 16), "12345");

            var results = checker.Check(data);

            Assert.That(results.Results, Is.Empty);
        }

        [Test]
        public void MyFiscalCodeWithWrongFirstnameGivesFirstnameError()
        {
            var checker = new CfChecker();
            var data = new CfDataToBeChecked("SPSMCM73T16L259D", "Marcello", "Esposito", new DateTime(1973, 12, 16), "12345");

            var results = checker.Check(data);

            Assert.That(results.Results.Count(r => r.Code == "CfFirstNameMismatch"), Is.EqualTo(1));
        }

        [Test]
        public void MyFiscalCodeWithWrongLastnameGivesLastnameError()
        {
            var checker = new CfChecker();
            var data = new CfDataToBeChecked("SPPMCL73T16L259D", "Marcello", "Esposito", new DateTime(1973, 12, 16), "12345");

            var results = checker.Check(data);

            Assert.That(results.Results.Count(r => r.Code == "CfLastNameMismatch"), Is.EqualTo(1));
        }

        [Test]
        public void MyFiscalCodeWithWrongDayGivesBirthDateError()
        {
            var checker = new CfChecker();
            var data = new CfDataToBeChecked("SPSMCL73T17L259D", "Marcello", "Esposito", new DateTime(1973, 12, 16), "12345");

            var results = checker.Check(data);

            Assert.That(results.Results.Count(r => r.Code == "CfBirthDateMismatch"), Is.EqualTo(1));
        }

        [Test]
        public void MyFiscalCodeWithWrongMonthGivesBirthDateError()
        {
            var checker = new CfChecker();
            var data = new CfDataToBeChecked("SPSMCL73A16L259D", "Marcello", "Esposito", new DateTime(1973, 12, 16), "12345");

            var results = checker.Check(data);

            Assert.That(results.Results.Count(r => r.Code == "CfBirthDateMismatch"), Is.EqualTo(1));
        }

        [Test]
        public void MyFiscalCodeWithWrongYearGivesBirthDateError()
        {
            var checker = new CfChecker();
            var data = new CfDataToBeChecked("SPSMCL74T16L259D", "Marcello", "Esposito", new DateTime(1973, 12, 16), "12345");

            var results = checker.Check(data);

            Assert.That(results.Results.Count(r => r.Code == "CfBirthDateMismatch"), Is.EqualTo(1));
        }

        [Test]
        public void MyFiscalCodeWithWrongChecksumGivesChecksumError()
        {
            var checker = new CfChecker();
            var data = new CfDataToBeChecked("SPSMCL73T16L259E", "Marcello", "Esposito", new DateTime(1973, 12, 16), "12345");

            var results = checker.Check(data);

            Assert.That(results.Results.Single().Code, Is.EqualTo("CfWrongChecksum"));
        }
    }
}