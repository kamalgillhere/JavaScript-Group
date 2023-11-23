import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

interface Task {
  itemName: string;
  itemDueDate: string;
  itemPriority: string;
  itemCategory: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todoList: Task[] = [
    {
      itemName: 'GYM',
      itemDueDate: '11-30-23',
      itemPriority: 'middle',
      itemCategory: 'Personal',
    },
    {
      itemName: 'College',
      itemDueDate: '12-15-23',
      itemPriority: 'low',
      itemCategory: 'Education',
    },
    {
      itemName: 'Assignment',
      itemDueDate: '11-26-23',
      itemPriority: 'high',
      itemCategory: 'Education',
    },
    {
      itemName: 'Meeting',
      itemDueDate: '12-01-23',
      itemPriority: 'high',
      itemCategory: 'Work',
    },
  ];

  newTask: Task = {
    itemName: '',
    itemDueDate: '',
    itemPriority: '',
    itemCategory: '',
  };

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'middle':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'medium';
    }
  }

  showAddTaskModal() {
    this.modalController.create({
      component: 'modal-content',
      componentProps: { value: 123 },
    }).then((modal) => modal.present());
  }

  closeAddTaskModal() {
    this.modalController.dismiss();
  }

  addTask() {
    this.todoList.push({ ...this.newTask });
    this.closeAddTaskModal();
    this.presentToast('Task added successfully!');
  }

  completeTask(task: Task) {
    this.presentToast(`${task.itemName} marked as complete.`);
  }

  deleteTask(task: Task) {
    const index = this.todoList.indexOf(task);
    if (index > -1) {
      this.todoList.splice(index, 1);
      this.presentToast(`${task.itemName} deleted.`);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  getCardColor(dueDate: string): string {
    const today = new Date();
    const itemDueDate = new Date(dueDate);

    if (itemDueDate.toDateString() === today.toDateString()) {
      return 'due-today';
    } else if (itemDueDate > today && itemDueDate <= new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)) {
      return 'due-soon';
    } else {
      return 'due-normal';
    }
  }
}
