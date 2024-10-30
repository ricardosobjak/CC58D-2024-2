package br.edu.utfpr.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.utfpr.todo.model.ToDo;
import br.edu.utfpr.todo.repository.ToDoRepository;

@RestController
@RequestMapping("/todo")
public class ToDoController {
    @Autowired
    private ToDoRepository toDoRepository;

    @PostMapping
    public ToDo create(@RequestBody ToDo todo) {
        toDoRepository.save(todo);
        return todo;
    }

    @GetMapping
    public List<ToDo> getAll() {
        return toDoRepository.findAll();
    }
}
