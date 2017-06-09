import { TodoApp0609Page } from './app.po';

describe('todo-app0609 App', () => {
  let page: TodoApp0609Page;

  beforeEach(() => {
    page = new TodoApp0609Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
