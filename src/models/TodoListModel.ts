import { observable, computed, action } from "mobx";
import TodoModel, { TodoModelProps } from "./TodoModel";

export default class TodoListModel {
  @observable list: TodoModel[] = [];

  @computed get todoCount() {
    return this.list.length;
  }

  @action addTodo(todo: TodoModelProps) {
    this.list.push(new TodoModel(todo));
  }

  @action delTodo(taskId: string) {
    const index = this.list.findIndex(
      (todo: TodoModel) => todo.taskId === taskId
    );
    if (index !== -1) {
      this.list.splice(index, 1);
    }
  }
}
