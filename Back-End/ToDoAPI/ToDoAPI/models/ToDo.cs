using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace ToDoAPI.models
{
    public class ToDo
    {
        public string Id { get; set; }
        public string? Title { get; set; }

    }
}
