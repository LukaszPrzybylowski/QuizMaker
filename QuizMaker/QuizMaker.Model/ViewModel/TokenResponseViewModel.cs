using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuizMaker.Model.ViewModel
{
    [JsonObject(MemberSerialization.OptOut)]
    public class TokenResponseViewModel
    {
        public TokenResponseViewModel() { }

        public string Token { get; set; }
        public int Expiration { get; set; }

        public string Refresh_Token { get; set; }
    }
}
