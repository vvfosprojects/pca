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