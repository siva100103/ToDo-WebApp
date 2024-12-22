using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoAPI.Data;
using ToDoAPI.models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ToDoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        public readonly ApplicationDbContext _context;
        public ToDoController(ApplicationDbContext context) 
        { 
            _context = context;
        }


        //GET API ENDPOINT :("api/ToDo")
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDo>>> GetToDos()
        {
            var todos = await _context.ToDo.ToListAsync();
            return Ok(todos);
        }

        [HttpPost]
        public async Task<ActionResult> Create(ToDo toDo)
        {
            await _context.ToDo.AddAsync(toDo);
            await _context.SaveChangesAsync();
            return Ok("Task Added Successfully");
        }



        [HttpDelete]
        public async Task<ActionResult> Delete(string id)
        {
            ToDo? item = await _context.ToDo.FindAsync(id);
            if(item==null) return NotFound("Task Not Found");
            _context.ToDo.Remove(item);
            await _context.SaveChangesAsync();
            return Ok("Task deleted Successfully");
        }
    }
}
