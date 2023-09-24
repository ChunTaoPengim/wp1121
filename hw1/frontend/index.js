const addButton = document.querySelector("#add-diary");

const itemTemplate = document.querySelector("#todo-item-template");
const todoList = document.querySelector("#todos");


const instance = axios.create({ // eslint-disable-line
  baseURL: "http://localhost:8000/api",
});

async function main() {
  setupEventListeners();
  try {
    const diaries = await getDiaries();
    diaries.forEach((diary) => renderTodo(diary));
  } catch (error) {
    alert("Failed to load todos!");
  }
}

function setupEventListeners() {
  const infoModal=document.querySelector("#diary-modal");
  addButton.addEventListener("click", function(){
    infoModal.showModal();
  })

  const cancelButton = document.querySelector(".cancel-input-button");
  cancelButton.addEventListener("click", () =>{
    infoModal.close();
  })

  const saveButton = document.querySelector(".save-input-button");
  saveButton.addEventListener("click", async () =>{
    const inputDate = document.querySelector(".add-diary-date").value;
    const inputMood = document.querySelector(".add-diary-mood").value;
    const inputTag = document.querySelector(".add-diary-tag").value;
    const inputText = document.querySelector(".add-diary-content").value;
    

    
    infoModal.close();
    try {
      
      const todo = await createDiaries({ date:inputDate, mood:inputMood, tag:inputTag, description:inputText });
      
      renderTodo(todo);
    } catch (error) {
      alert("Failed to create todo!");
      return;
    }
    

  });
  
}



async function getDiaries() {
  const response = await instance.get("/diaries");
  return response.data;
}

async function createDiaries(diary) {
  
  const response = await instance.post("/diaries", diary);
  
  return response.data;
  
}
async function updateDiaryStatus(id, diary) {
  const response = await instance.put(`/diaries/${id}`, diary);
  return response.data;
}




const startFilter = document.querySelector("#filter-diary");
const filterModal = document.querySelector("#filter-modal");
startFilter.addEventListener("click", ()=>{
  filterModal.showModal();
})
const filterButton = document.querySelector("#filter-button");
filterButton.addEventListener("click", ()=>{
  const filterMood = document.querySelector(".filter-diary-mood").value;
  const filterTag = document.querySelector(".filter-diary-tag").value;
  const diaries = [...document.querySelectorAll(".todo-item")];
  // const diaries = document.querySelectorAll(".todo-item");
  if(filterTag !== "" && filterMood !=="")
  {
    for( let i =0; i< diaries.length;i++)
    {
      const diary = diaries[i];
      const diaryTag = diary.querySelector(".todo-tag");
      const diaryMood = diary.querySelector(".todo-mood");
      if(diaryTag.innerText === filterTag && diaryMood.innerText === filterMood){
        diary.style.display ="block";
      }
      else{
        diary.style.display ="none";
      }
    }
  }
  else if(filterTag !== "" && filterMood ==="")
  {
    
    for( let i =0; i< diaries.length;i++)
    {
      const diary = diaries[i];
      const diaryTag = diary.querySelector(".todo-tag");
      if(diaryTag.innerText === filterTag){
        diary.style.display ="block";
      }
      else{
        diary.style.display ="none";
      }
    }
  }

  else if(filterTag === "" && filterMood !=="")
  {
    
    for( let i =0; i< diaries.length;i++)
    {
      const diary = diaries[i];
      const diaryMood = diary.querySelector(".todo-mood");
      if(diaryMood.innerText === filterMood){
        diary.style.display ="block";
      }
      else{
        diary.style.display ="none";
      }
    }
  }
  else
  {
    for( let i =0; i< diaries.length;i++)
    {
      const diary = diaries[i];

      diary.style.display = "block";
    }
  }
  filterModal.close();
})







const day_list = ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'];






function renderTodo(todo) {
  
  
  const item = createTodoElement(todo);
  
  todoList.appendChild(item);
}
function createTodoElement(todo){
  
  const item = itemTemplate.content.cloneNode(true);
  
  item.id = todo.id;
  const Time = item.querySelector(".todo-date");
  const Day = new Date (todo.date);
  Time.innerText = todo.date.replaceAll("-",'.')+ day_list[Day.getDay()];
  
  
  const Mood = item.querySelector(".todo-mood");
  Mood.innerText = todo.mood;
  const Tag = item.querySelector(".todo-tag");
  Tag.innerText = todo.tag;
  const Dep = item.querySelector(".todo-description");
  Dep.innerText = todo.description;
  
  editDiary(item, todo, Time, Mood, Tag, Dep);
  return item;

}
function editDiary(item, todo,Time, Mood, Tag, Dep ){
  let id = item.id;
  const editButon = item.querySelector(".edit-button");
  const editModal = item.querySelector(".edit-diary-modal");
  const editDate = editModal.querySelector(".add-diary-date");
  const editMood = editModal.querySelector(".add-diary-mood");
  const editTag = editModal.querySelector(".add-diary-tag");
  const editText = editModal.querySelector(".add-diary-content");
  const cancelEditButton = editModal.querySelector(".cancel-input-button");
  cancelEditButton.addEventListener("click", () =>{
    editDate.value = todo.date;
    editMood.value = todo.mood;
    editTag.value = todo.tag;
    editText.value = todo.description;
    editModal.close();
  })
  const saveEditButton = editModal.querySelector(".save-input-button");
  editDate.value = todo.date;
  editMood.value = todo.mood;
  editTag.value = todo.tag;
  editText.value = todo.description;
  editButon.addEventListener("click",()=>{
    editModal.showModal();
  })
  saveEditButton.addEventListener("click", () =>{
  
    todo.date = editDate.value;
    todo.mood = editMood.value;
    todo.tag = editTag.value;
    todo.description = editText.value;
    
    let Day = new Date (editDate.value);
    Time.innerText = editDate.value.replaceAll("-",'.')+ day_list[Day.getDay()];
  
    Mood.innerText = editMood.value;
    
    Tag.innerText = editTag.value;
  
    Dep.innerText = editText.value;
    updateDiaryStatus(id, todo);
    editModal.close();
  
  })
  


}
main();
