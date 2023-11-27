using Microsoft.AspNetCore.Identity;
using QuizMaker.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuizMaker.Model.Data
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser() { }

        //[Key]
        //[Required]
        //public string Id { get; set; }

        //[Required]
        //[MaxLength(128)]
       // public string UserName { get; set; }

       // [Required]
       // public string Email { get; set; }

        public string? DisplayName { get; set; }
        public string? Notes { get; set; }

        [Required]
        public int Type { get; set; }
        [Required]
        public int Flags{ get; set;}

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime LastModifiedDate { get; set; }

        public virtual List<Quiz> Quizzes { get; set; }

        public virtual List<Token> Tokens { get; set; }
    }
}
