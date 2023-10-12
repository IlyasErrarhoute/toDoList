import { json } from "stream/consumers"
import { v4 as uuidV4 } from "uuid"
console.log(uuidV4())
type Task = {
  id:string
   title:string
    completed:boolean 
    createdAt:Date
  }

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks : Task[] = loadtasks()
tasks.forEach(addListItem)


form?.addEventListener("submit", e =>{
  e.preventDefault()
  if (input?.value =="" || input?.value == null)  return
    
  const newTask : Task = {
    id : uuidV4(),
    title : input.value,
    completed: false ,
    createdAt: new Date()
  }
  tasks.push(newTask)
 

  addListItem(newTask)
})
function addListItem(task : Task){
 const item = document.createElement("li");
 const label = document.createElement("label")
 const checkbox = document.createElement("input")
 checkbox.addEventListener("change" , () => {
  task.completed = checkbox.checked
    savetasks()
 })
 checkbox.type = "checkbox"
 checkbox.checked = task.completed
 label.append(checkbox , task.title)
 item.append(label)
 list?.append(item)
 
}
function savetasks(){
  localStorage.setItem("TASKS" , JSON.stringify(tasks))
}
function loadtasks(): Task[]{
  const taskJson = localStorage.getItem("TASKS")
  if (taskJson == null) { return[]
    
  }
  else{

    return JSON.parse(taskJson)
  }
}