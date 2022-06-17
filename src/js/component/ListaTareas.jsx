import React, {useState, useEffect} from "react";
import BlockTareas from "./BlockTareas.jsx";
import {getTareas, putTarea, deletelistado, nuevolistado} from "../comoinsomnia/metodos.js";
import "../../styles/ListaTareas.css";

const ListaTareas = ()=>{
    const [tareaLista, setTareaLista] = useState([]);
    const [tareasListadas, setTareasListadas] = useState([]);
    const [contadorTareas, setContadorTareas] = useState(0);
    const [tareasPendientes, setTareasPendientes] = useState(0);
    const [typeTodo, setTypeTodo] = useState("normal");
    const [nuevaTarea, setNuevaTarea] = useState({
        label:"",
        done: false,
        type: typeTodo,
    });

    const getTodasTareas = () => {
        getTareas()
            .then((res)=>{
                return res.json();
            })
            .then((data) => {
                if (data[0].label !== "sample task"){setTareaLista(data);
                let contador = 0;
                data.forEach((todo) => {
                    if (todo.done === true) { contador++;}
                    if (todo.type === "normal"){tareasListadas.push(todo)}
                    
                });
            setcontadorTareas(contador);
            settareasPendientes(data.length - contador);
            }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getTodasTareas();},[]);

    const grabarTodo = (e) => {
        if (e.code === "Enter"){
            if (nuevaTarea.type === "normal"){
                const nuevaTareaLista = [...tareasListadas, nuevaTarea];
                const totalTareas = nuevaTareaLista;
                setTareaLista(totalTareas);
                setTareasListadas(nuevaTareaLista);
                setTareasPendientes(tareasPendientes + 1);
            }
            setNuevaTarea({label: "" });
        }
    }
    };
    const borrartodo = (id) => {
        const list = tareaLista.filter((todo) => tareaLista[id] !== todo);
        if (tareaLista[id].done === true) {
            setContadorTareas(contadorTareas - 1);
        }else {
            setTareasPendientes(tareasPendientes - 1)
        }
        if (tareaLista[id].type === "normal"){
            const nuevaTareaLista = tareasListadas.filter((todo) => tareaLista[id] !==todo);
        }
        setTareaLista(list);
        if (list.length > 1){
            putTarea(list);
        }else{
            deletelistado()
            .then((res) => {
                return res.json();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => newlist([]));
        }
    };
    const tareaDone = (id) => {
        const list = tareaLista;
        if (tareaLista[id].done === true){
            list[id].done = false;
            setContadorTareas(contadorTareas - 1);
        }else {
            list[id].done = true;
            setContadorTareas(contadorTareas + 1);
        }
        if (tareasPendientes > 0){
            setTareasPendientes(tareasPendientes - 1);
        }
        setTareaLista(list);
        putTarea(list);
    };
    return(
        <div className="gradient-custom vh-100">
            <div className="pt-3 row d-flex justyfy-content-center align-item-center h-100">
                <div className="col-10 col-xl-10">
                    <div className="card-body p-5">
                        <h1 className="d-flex justyfy-content-center p-3">Lista de tareas</h1>
                        <select className="form-select mb-3" onChange={(e) => {setTypeTodo(e.target.value);}}>
                    </div>
                </div>
            </div>
        </div>
    )
    
