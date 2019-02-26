import { TestBed } from "@angular/core/testing";

import { TodoDataService } from "./todo-data.service";
import { Todo } from "./todo";

describe("TodoDataService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: TodoDataService = TestBed.get(TodoDataService);
    expect(service).toBeTruthy();
  });

  describe("#getAllTodos()", () => {
    it("should return an empty array by default", () => {
      const service: TodoDataService = TestBed.get(TodoDataService);
      expect(service.getAllTodos()).toEqual([]);
    });
    it("should return all todos", () => {
      const service: TodoDataService = TestBed.get(TodoDataService);
      const todo1 = new Todo({ title: "Hello 1", complete: false });
      const todo2 = new Todo({ title: "Hello 2", complete: true });
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    });
  });

  describe("#save(todo)", () => {
    it("should automatically assign an incrementing id", () => {
      const service: TodoDataService = TestBed.get(TodoDataService);
      const todo1 = new Todo({ title: "Hello 1", complete: false });
      const todo2 = new Todo({ title: "Hello 2", complete: true });
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    });
  });

  describe("#deleteTodoById(id)", () => {
    it("should remove todo with corresponding id", () => {
      const service: TodoDataService = TestBed.get(TodoDataService);
      const todo1 = new Todo({ title: "Hello 1", complete: false });
      const todo2 = new Todo({ title: "Hello 2", complete: true });
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(1);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodoById(2);
      expect(service.getAllTodos()).toEqual([]);
    });
    it("should not remove anything if todo with corresponding id is not found", () => {
      const service: TodoDataService = TestBed.get(TodoDataService);
      const todo1 = new Todo({ title: "Hello 1", complete: false });
      const todo2 = new Todo({ title: "Hello 2", complete: true });
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(3);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    });
  });

  describe("#updateTodoById(id, values)", () => {
    it("should return todo with the corresponding id and updated data", () => {
      const service: TodoDataService = TestBed.get(TodoDataService);
      const todo = new Todo({ title: "Hello 1", complete: false });
      service.addTodo(todo);
      let updatedTodo = service.updateTodoById(1, { title: "new title" });
      expect(updatedTodo.title).toEqual("new title");
    });
    it("should return null if todo is not found", () => {
      const service: TodoDataService = TestBed.get(TodoDataService);
      const todo = new Todo({ title: "Hello 1", complete: false });
      service.addTodo(todo);
      let updatedTodo = service.updateTodoById(2, { title: "new title" });
      expect(updatedTodo).toEqual(null);
    });
  });

  describe("#toggleTodoComplete(todo)", () => {
    it("should return the updated todo with inverse complete status", () => {
      const service: TodoDataService = TestBed.get(TodoDataService);
      const todo = new Todo({ title: "Hello 1", complete: false });
      service.addTodo(todo);
      let updatedTodo = service.toggleTodoComplete(todo);
      expect(updatedTodo.complete).toBeTruthy();
      service.toggleTodoComplete(todo);
      expect(updatedTodo.complete).toBeFalsy();
    });
  });
});
