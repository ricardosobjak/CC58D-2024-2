package br.edu.utfpr.todo.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.edu.utfpr.todo.dto.PersonDTO;
import br.edu.utfpr.todo.model.Person;
import br.edu.utfpr.todo.repository.PersonRepository;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;

import java.util.List;

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

    // Obter uma pessoa pelo ID
    @GetMapping("{id}")
    public ResponseEntity<Object> get(@PathVariable long id) {
        // Buscando a pessoa no DB (retorna um tipo Optional)
        var personOpt = personRepository.findById(id);

        return personOpt.isPresent()
                ? ResponseEntity.ok(personOpt.get()) // status 200
                : ResponseEntity.notFound().build(); // status 404
    }

    // Busca paginada
    @GetMapping
    public ResponseEntity<Page<Person>> getAll(
            @PageableDefault(page = 0, size = 10, sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {

        return ResponseEntity
                .status(206)
                .body(personRepository.findAll(pageable));
    }

    @PutMapping("{id}")
    public ResponseEntity<Object> put(@PathVariable long id, 
        @Valid @RequestBody PersonDTO dto) {
            // Buscar a pessoa no banco de dados
            var personOpt = personRepository.findById(id);

            if(personOpt.isPresent()) {
                var person = personOpt.get();
                BeanUtils.copyProperties(dto, person);
                try { 
                    personRepository.save(person);
                    return ResponseEntity.ok().body(person);
                } catch(Exception ex) {
                    return ResponseEntity.badRequest()
                        .body("Falha ao salvar: " + ex.getMessage());
                }
            } else {
                return ResponseEntity.notFound().build();
            }
    }


    @DeleteMapping("{id}")
    public ResponseEntity<Object> delete(@PathVariable long id) {
        // Busca a pessoa no banco de dados pelo ID
        var personOpt = personRepository.findById(id);

        if(personOpt.isPresent()) { // A pessoa existe
            try { // Tenta deletar (Sucesso)
                personRepository.delete(personOpt.get());
                return ResponseEntity.ok().build();
            } catch(Exception ex) { // Falha ao deletar
                return ResponseEntity.badRequest()
                    .body("Falha ao deletar: " + ex.getMessage());
            }
        } else 
            // Pessoa não encontrada (404)
            return ResponseEntity.notFound().build();
    }
}
