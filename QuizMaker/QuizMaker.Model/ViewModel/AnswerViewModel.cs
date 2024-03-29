﻿using Newtonsoft.Json;
using System.ComponentModel;
using System.Text.Json.Serialization;

namespace QuizMakerFree.ViewModels
{
    public class AnswerViewModel
    {
        public AnswerViewModel() { }

        public int? Id { get; set; }
        public int QuizId { get; set; }
        public int QuestionId { get; set; }
        public string Text { get; set; }
        public string? Notes { get; set; }
        [DefaultValue(0)]
        public int Type { get; set; }
        [DefaultValue(0)]
        public int Flags { get; set; }
        [DefaultValue(0)]
        public int Value { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastModifiedDate { get; set; }
    }
}
