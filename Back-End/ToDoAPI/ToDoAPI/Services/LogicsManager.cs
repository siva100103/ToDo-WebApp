namespace ToDoAPI.Services
{
    public class LogicsManager
    {
        public string GetConnectionString()
        {
            var configuration = new ConfigurationManager();
            configuration.SetBasePath(Directory.GetCurrentDirectory());
            configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
            return configuration.GetConnectionString("Default");
        }
    }
}
