package br.edu.utfpr.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.utfpr.todo.model.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {

}
