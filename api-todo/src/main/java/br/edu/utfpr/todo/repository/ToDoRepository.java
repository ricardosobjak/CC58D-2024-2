package br.edu.utfpr.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.utfpr.todo.model.ToDo;

public interface ToDoRepository extends JpaRepository<ToDo, Long> {

}
