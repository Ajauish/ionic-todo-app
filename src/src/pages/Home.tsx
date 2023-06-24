import { useState, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import {
  IonPage,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonModal,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { add, checkmark } from 'ionicons/icons';

const currentDate = new Date();

interface Task {
  id: number;
  title: string;
  description: string;
  color: string;
}

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskColor, setTaskColor] = useState('#9decff');
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  // Define the tasks array
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks
      ? JSON.parse(storedTasks)
      : [{ id: 1, title: 'Example Task', description: 'Description for task', color: '#9decff' }];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task to the tasks array
  const addTask = () => {
    if (taskTitle.trim() !== '' && taskDescription.trim() !== '') {
      const newTask: Task = {
        id: tasks.length + 1,
        title: taskTitle,
        description: taskDescription,
        color: taskColor || '#9decff', // Set taskColor to an empty string if it's falsy
      };
      setTasks([...tasks, newTask]);
      setShowModal(false);
      setTaskTitle('');
      setTaskDescription('');
      setTaskColor('#9decff');
    }
  };
  // Define the deleteTasks function to remove the selected tasks from the tasks state variable
  const deleteTasks = (selectedTaskIds: number[]) => {
    const updatedTasks = tasks.filter((task: Task) => !selectedTaskIds.includes(task.id));
    setTasks(updatedTasks);
    setSelectedTasks([]);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>

        <div className='header-div'>
          <IonTitle class='ion-text-start' className='title'>
            Hello,
          </IonTitle>

          <h3>Today date is —</h3>
          <p>{currentDate.toDateString()}.</p>
        </div>

        <div className='category'>
        <h1>Tasks</h1>
        </div>

        {/* Show ExploreContainer only if there are no tasks */}
        {!tasks.length && (
          <ExploreContainer />
        )}

        {tasks.map((task: Task) => (
          <div key={task.id} className='list' style={{ backgroundColor: task.color ? task.color : '#9decff' }}>
            <IonCheckbox className='select'
              checked={selectedTasks.includes(task.id)}
              onIonChange={(e) => {
                const checked = e.detail.checked;
                setSelectedTasks((prevSelectedTasks) => {
                  if (checked) {
                    return [...prevSelectedTasks, task.id];
                  } else {
                    return prevSelectedTasks.filter((taskId) => taskId !== task.id);
                  }
                  
                  });
                  }}
                  />
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
            </div>
          ))}

    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton onClick={() => setShowModal(true)}>
        <IonIcon icon={add} />
      </IonFabButton>
    </IonFab>

    {selectedTasks.length > 0 && (
       <IonFab vertical="bottom" horizontal="end" slot="fixed">

      <IonFabButton className="delete-button" color={'success'} onClick={() => deleteTasks(selectedTasks)}>
        <IonIcon icon={checkmark}></IonIcon>
      </IonFabButton>

      </IonFab>

    )}

    <IonModal isOpen={showModal} className='my-custom-class'>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Task</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
          </IonButtons>
         </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonItem>
          <IonLabel className='label' position='stacked'>Title</IonLabel>
          <IonInput
            value={taskTitle}
            onIonChange={(e) => setTaskTitle(e.detail.value!)}
            required
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel className='label' position='stacked'>Description</IonLabel>
          <IonTextarea
            value={taskDescription}
            onIonChange={(e) => setTaskDescription(e.detail.value!)}
            required
          ></IonTextarea>
        </IonItem>

        <IonItem>
          <IonLabel className='label' position='stacked'>Color</IonLabel>
          <IonSelect
            value={taskColor}
            placeholder='Select Color'
            onIonChange={(e) => setTaskColor(e.detail.value)}
          >
            <IonSelectOption value='#9decff'>Primary</IonSelectOption>
            <IonSelectOption value='#fe7070'>Red</IonSelectOption>
            <IonSelectOption value='#fef970'>Yellow</IonSelectOption>
            <IonSelectOption value='#70fe9c'>Green</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonButton expand='block' onClick={addTask}>
          Add Task
        </IonButton>
      </IonContent>
    </IonModal>
  </IonContent>
</IonPage>
);
};

export default Home;


