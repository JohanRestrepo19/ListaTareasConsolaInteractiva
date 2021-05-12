const Tarea = require("./tarea");


class Tareas {

    _listado = {};
    
    get listadoArr() {

        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;

    }


    constructor(){
        this._listado = {};
    }

    borrarTarea(id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){
        
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
        
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){

        const tareas = this.listadoArr;
        let estado = ``;
        let i = 1;

        console.log();
        tareas.forEach(tarea => {
            (tarea.completadoEn !== null)
            ? estado = 'Completada'.green
            : estado = 'Pendiente'.red;
            

            console.log(`${`${i}`.green}. ${tarea.desc} :: ${estado}`);
            i++;
        })

    }

    listarPendientesCompletadas(completado = true){
        const tareas = (completado)
                        ? this.listadoArr.filter(tarea => tarea.completadoEn !== null)
                        : this.listadoArr.filter(tarea => tarea.completadoEn == null);

        const estado = (completado)
                        ? `Completada`.green
                        : `Pendiente`.red;

        (completado)
            ? tareas.forEach((tarea, id) => console.log(`${`${id+1}`.green}. ${tarea.desc} :: ${tarea.completadoEn}`))
            : tareas.forEach((tarea, id) => console.log(`${`${id+1}`.green}. ${tarea.desc} :: ${estado}`));
         
    }


    toggleCompletadas(ids = []){
        ids.forEach(id => {
            
            const tarea = this._listado[id];

            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }

        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });

    }
}

module.exports = Tareas
