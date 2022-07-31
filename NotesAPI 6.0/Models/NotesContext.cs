using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace NotesAPI_6._0.Models
{
    public class NotesContext : DbContext
    {
        public NotesContext(DbContextOptions<NotesContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Note> Notes { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
    }
}
