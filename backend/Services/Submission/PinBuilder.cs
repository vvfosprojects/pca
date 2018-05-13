using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.Services;

namespace Services.Submission
{
    internal class PinBuilder : IPinBuilder
    {
        private Random rnd = new Random();
        private char[] chars = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'Z', '2', '3', '4', '5', '6', '7', '8', '9' };

        public string Build()
        {
            var sb = new StringBuilder();

            for (int i = 0; i < 6; i++)
                sb.Append(this.chars[rnd.Next()]);

            return sb.ToString();
        }
    }
}