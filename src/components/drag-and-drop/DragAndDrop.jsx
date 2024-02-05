import { useEffect, useState } from 'react';
import styles from './DragAndDrop.module.css';
import BackLink from '../BackLink';
import Note from '../note/Note';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// mock data
// const initialTasks = [
//   { id: 1, content: 'Something Typescript related', status: 'todo' },
//   {
//     id: 2,
//     content: 'Drag and drop component in Bits&Bobs',
//     status: 'inProgress',
//   },
//   { id: 3, content: 'A decent full stack project', status: 'todo' },
//   { id: 4, content: 'Portfolio', status: 'completed' },
//   { id: 5, content: 'Get in touch with Noelia', status: 'completed' },
//   { id: 6, content: 'Call Laia', status: 'completed' },
// ];

const DragAndDropApp = () => {
  useEffect(() => {
    document.title = 'Drag & Drop';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  // const [tasks, setTasks] = useState(initialTasks);
  const [tasks, setTasks] = useState([
    // { id: 1, content: 'todo / test', status: 'todo' },
  ]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem('dnd-tasks')) || tasks);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Note content={'Uses react-dnd library. Tasks saved to local storage'} />
      <Toaster />
      <div className={styles.app}>
        <BackLink type='white' />
        <h1>Drag & Drop</h1>
        <h2>Kanban Board</h2>

        <div className={styles.container}>
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <KanbanBoard tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </DndProvider>
  );
};

export default DragAndDropApp;

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: '2',
    content: '',
    status: 'todo', // 'inProgress' | 'completed'
  });
  console.log(task);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.content.length < 3)
      return toast.error('Must have more than 3 characters');
    if (task.content.length > 100)
      return toast.error('Must have less than 100 characters');
    setTasks((prev) => {
      const list = [...prev, task];
      localStorage.setItem('dnd-tasks', JSON.stringify(list));
      return list;
    });

    toast.success('Task created successfully');
    // input reset
    setTask({
      id: '',
      content: '',
      status: 'todo', // 'inProgress' | 'completed'
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className={styles.formInput}
        value={task.content}
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), content: e.target.value })
        }
      />
      <button className={styles.addBtn}>Add a task</button>
    </form>
  );
};

const KanbanBoard = ({ tasks, setTasks }) => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const todoTasks = tasks.filter((t) => t.status === 'todo');
    const inProgressTasks = tasks.filter((t) => t.status === 'inProgress');
    const completedTasks = tasks.filter((t) => t.status === 'completed');

    setTodoTasks(todoTasks);
    setInProgressTasks(inProgressTasks);
    setCompletedTasks(completedTasks);
  }, [tasks]);

  const statuses = ['todo', 'inProgress', 'completed'];

  return (
    <div className={styles.kanbanBoard}>
      {statuses.map((status, index) => (
        <Column
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todoTasks={todoTasks}
          inProgressTasks={inProgressTasks}
          completedTasks={completedTasks}
        />
      ))}
    </div>
  );
};

const Column = ({
  status,
  tasks,
  setTasks,
  todoTasks,
  inProgressTasks,
  completedTasks,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => addItemToColumn(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let title = 'To do';
  let tasksToMap = todoTasks;

  if (status === 'inProgress') {
    title = 'In Progress';
    tasksToMap = inProgressTasks;
  }
  if (status === 'completed') {
    title = 'Completed';
    tasksToMap = completedTasks;
  }
  // console.log('todoTasks', todoTasks);
  // console.log('inProgressTasks', inProgressTasks);
  // console.log('completedTasks', completedTasks);
  // console.log('tasksToMap', tasksToMap);
  const addItemToColumn = (id) => {
    setTasks((prev) => {
      const updatedTasks = prev.map((task) => {
        // task.id === id ? { ...task, status: status } : task;
        if (task.id === id) {
          return { ...task, status: status };
        }
        return task;
      });
      localStorage.setItem('dnd-tasks', JSON.stringify(updatedTasks));
      toast.success(`Status updated to: ${title}`);
      return updatedTasks;
    });
  };
  return (
    <div
      ref={drop}
      className={
        isOver ? `${styles.column} ${styles.isOverColumn}` : `${styles.column}`
      }
    >
      <ColumnHeader title={title} count={tasksToMap.length} />
      <ul>
        {tasksToMap.length > 0 &&
          tasksToMap.map((task) => (
            <Task key={task.id} tasks={tasks} setTasks={setTasks} task={task} />
          ))}
      </ul>
    </div>
  );
};

const ColumnHeader = ({ title, count }) => {
  return (
    <div className={styles.columnHeader}>
      <h3 className={styles.columnTitle}>{title}</h3>
      <div className={styles.columnCount}>{count}</div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    console.log(id);
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem('dnd-tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    toast.success('Task deleted successfully!');
  };
  return (
    <li
      ref={drag}
      className={
        isDragging
          ? `${styles.taskStyles} ${styles.isDraggingTaskStyles}`
          : `${styles.taskStyles}`
      }
    >
      <p>{task.content}</p>

      <div className={styles.btns}>
        {' '}
        <button className={styles.btn}>
          {' '}
          <FaRegEdit size={18} color={'blue'} />
        </button>
        <button className={styles.btn} onClick={() => handleRemove(task.id)}>
          <FaRegTrashAlt size={18} color={'red'} />
        </button>
      </div>
    </li>
  );
};
