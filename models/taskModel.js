const db = require('../config/db.js');

class Task {
  constructor(id, title, dueDate, urgency, userId) {
    this.id = id;
    this.title = title;
    this.dueDate = dueDate;
    this.urgency = urgency;
    this.userId = userId;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }

  static get(taskId, callback) {
    db.query('SELECT * FROM todolist.tasks WHERE id = ?', [taskId], (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, rows[0]);
    });
  }   

  static getAllTasks(userId, callback) {
    db.query('SELECT * FROM todolist.tasks WHERE userId = ?', [userId], (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, rows);
    });
  }    

  static create(newTask, callback) {
    db.query('INSERT INTO todolist.tasks SET ?', newTask, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }

      newTask.id = result.insertId;
      callback(null, newTask);
    });
  }

  static update(newTask, callback) {
    db.query('UPDATE todolist.tasks SET ? WHERE id = ?', [newTask, newTask.id], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
  
      callback(null, newTask);
    });
  }  

  static complete(id, callback) {
    db.query('DELETE FROM todolist.tasks WHERE id = ?', [id], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      
      callback(null, `Tarefa com o ID ${id} foi excluída com sucesso`);
    });
  }    
}
  
  module.exports = Task;
  