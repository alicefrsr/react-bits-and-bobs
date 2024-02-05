import { useEffect, useState } from 'react';
import styles from './DragAndDrop.module.css';
import BackLink from '../BackLink';
// import Note from '../note/Note';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const tasks = [
  { id: 1, content: 'Something Typescript related' },
  { id: 2, content: 'Drag and drop component (in Bits&Bobs)' },
  { id: 3, content: 'A decent full stack project' },
  { id: 4, content: 'Portfolio' },
  { id: 5, content: 'Get in touch with Noelia' },
  { id: 6, content: 'Call Laia' },
];

const DragAndDropApp = () => {
  useEffect(() => {
    document.title = 'Drag & Drop';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  return (
    <div className={styles.app}>
      <BackLink type='white' />
      <h1>Drag & Drop</h1>
      <h2>Kanban Board</h2>
      <KanbanBoard />
    </div>
  );
};

export default DragAndDropApp;

// DND lib: DradDropContext component
const KanbanBoard = (tasks) => {
  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/todos')
  //     .then((res) => res.json())
  //     .then((json) => {
  //       // console.log(json);
  //       setCompleted(json.filter((task) => task.completed));
  //       setIncomplete(json.filter((task) => !task.completed));
  //     });
  // }, []);

  // const handleDragEnd = () => {
  //   console.log('drag ending');
  // };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.kanbanBoard}>
        <div className={styles.columnStyles}>
          {/* TO DO */}
          <h3 className={styles.columnTitleStyles}>To do column</h3>
          <ul>
            {/* {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))} */}
            <Task />
          </ul>
        </div>
      </div>
    </DndProvider>
  );
};

// DND lib:
const Column = ({ title, tasks }) => {
  console.log(tasks);
  return (
    <div className={styles.columnStyles}>
      <h3 className={styles.columnTitleStyles}>{title}</h3>
      <ul>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

// DND lib:
const Task = ({ task }) => {
  console.log(task);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  console.log(isDragging);
  return (
    <li ref={drag}>
      <div className={styles.taskStyles}>{task.content}</div>
    </li>
  );
};
