package br.edu.utfpr.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.utfpr.todo.model.Person;
import br.edu.utfpr.todo.repository.PersonRepository;

@RestController
@RequestMapping("/person")
public class PersonController {
    @Autowired // Injeção de dependência
    private PersonRepository personRepository;

    @PostMapping
    public Person create(@RequestBody Person person) {
        personRepository.save(person);
        System.out.println(person);
        return person;
    }

    @GetMapping("{id}")
    public String get(@PathVariable int id) {
        return "Obtendo uma pessoa: "+id;
    }

    @GetMapping
    public String getAll() {
        return "Obtendo todas pessoas";
    }

    @PutMapping
    public String put() {
        return "Pessoa Atualizada";
    }

    @DeleteMapping
    public String delete() {
        return "Pessoa Deletada";
    }
}
