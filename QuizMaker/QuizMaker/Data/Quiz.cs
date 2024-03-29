﻿using Microsoft.AspNetCore.Mvc;
using QuizMakerFree.ViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuizMaker.Model.Data
{
    public class Quiz
    {
        public Quiz() { }

        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public string Text { get; set; }

        public string? Notes { get; set; }

        [DefaultValue(0)]
        public int Type { get; set; }

        [DefaultValue(0)]
        public int Flags { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public int ViewCount { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime LastModifiedDate { get; set;}

        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }

        public virtual List<Question> Questions { get; set; }

        public virtual List<Result> Results { get; set; }

        public static implicit operator Quiz(Task<ActionResult<QuizViewModel>> v)
        {
            throw new NotImplementedException();
        }
    }
}
