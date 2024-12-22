using Microsoft.EntityFrameworkCore;
using ToDoAPI.models;

namespace ToDoAPI.Data
{
    public class ApplicationDbContext :DbContext
    {
        public DbSet<ToDo> ToDo { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ToDo>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.Property(x => x.Title)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnType("varchar(100)");

                entity.Property(x => x.Id)
                .HasMaxLength(100)
                .HasColumnType("varchar(100)");
            });
        }

    }
}
