package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class TodoController {

    private final TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }
    
    @GetMapping("/")
    public String index() {
        return "Olá mundo!";
    }

    @PostMapping("/todo")
    @ResponseStatus(HttpStatus.CREATED)
    public Todo createTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    @GetMapping("/todos")
    public Iterable<Todo> getTodos() {
        return todoRepository.findAll();
    }
}