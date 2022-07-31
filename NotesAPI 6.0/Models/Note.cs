namespace NotesAPI_6._0.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string? Text { get; set; }
        public string? Catagory { get; set; }
        public string? Color { get; set; }
        public string? Bg_color { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
