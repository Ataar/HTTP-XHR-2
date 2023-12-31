
let postId = document.getElementById("postId");
postId.className = ('d-flex flex-column-reverse')
let createpost = document.getElementById("createpost");
const title = document.getElementById("title");
let body = document.getElementById("body");
let userId = document.getElementById("userId");
let info = document.getElementById("info");
let submitBtn = document.getElementById('submitBtn')
let updateBtn = document.getElementById('updateBtn')


let heading = document.createElement("h1");
heading.className = "bg-dark p-2 text-center text-white";
heading.innerHTML = "HTTP-XHR";
info.prepend(heading);
info.style.backgroundColor = "rgb(78, 75, 75)";
let baseUrl = `https://jsonplaceholder.typicode.com`;
let postsUrl = `${baseUrl}/posts`;

let postArray = []


const onEdit=(ele)=>{
  console.log(ele);
  let getId = ele.closest('.card').id;
  console.log(getId);
  localStorage.setItem('editId',getId)
  let getObjUrl = `${baseUrl}/posts/${getId}`;

  let xhr = new XMLHttpRequest()

  xhr.open('GET',getObjUrl,true)

  xhr.send()

  xhr.onload = function() {
    if(xhr.status===200)
    {
     console.log(xhr.response);
      let getObj = JSON.parse(xhr.response)
      title.value = getObj.title;
      body.value = getObj.body;
      userId.value = getObj.userId;
      updateBtn.classList.remove('d-none');
      submitBtn.classList.add('d-none'); 
    }
  }  
}

const onDelete= (ele)=>{
  // console.log(ele);
 let getDeleteId = ele.closest('.card').id
 console.log(getDeleteId);

let deleteUrl = `${baseUrl}/posts/${getDeleteId}`
console.log(deleteUrl);

   let xhr = new XMLHttpRequest();
   xhr.open('DELETE',deleteUrl,true);
   xhr.send()
   xhr.onload = function()
   {
    if(xhr.status===200)
    {
      console.log(xhr.response);
      let id = document.getElementById(getDeleteId)
      console.log(id);
      id.remove();
      // templating(postArray)
    }
   }
}


const templating = (arr) => {
  let result = "";
  arr.forEach((add) => {
    result += `
      <div class="card mt-5" id="${add.id}">
      <div class="card-header text-center">
                <h2>
                 ${add.title} 
                </h2>
              </div>
              <div class="card-body">
                <p>
                 ${add.body}
                </p>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <button class="btn btn-outline-primary" onclick='onEdit(this)'>
                  Edit
                </button>
                <button class="btn btn-outline-danger" onclick='onDelete(this)'>
                 Delete
                </button>
              </div>
            </div>
    
    
    `;
  });
  postId.innerHTML = result;
};


const createposts = (pobj)=>{
  let xhr = new XMLHttpRequest();
  xhr.open('POST',postsUrl,true);
  xhr.send(JSON.stringify(pobj))
  xhr.onload = function()
  {
    if(xhr.status === 200 || xhr.status === 201)
    {
          console.log(xhr.response);
          pobj.id = JSON.parse(xhr.response).id
          postArray.push(pobj)
          templating(postArray)
        }
      }

}

// -----------------------------------------------------
const onposts = (ele)=>{
  ele.preventDefault();

  let postsobj = 
  {                               // This function is used to submit a form and create new object.
    title : title.value,
    body : body.value,
    userId : userId.value,
  }
  console.log(postsobj);
  createpost.reset();
  createposts(postsobj)
  
}

// ----------------------------------------------


const getposts = () => {
  // 1st step create instance or object XMLHttpRequest
  let xhr = new XMLHttpRequest();

  // 2nd step configration of API

  xhr.open("GET", postsUrl, true);

  // 3rd step send API Call
  xhr.send();

  // 4th step we send API call then DB will give response and that response will be loded into Browser.
  xhr.onload = function () {
    if (xhr.status === 200) {
      // console.log(xhr.response);
      postArray = JSON.parse(xhr.response);
      // console.log(data);
      templating(postArray);
    } else {
      alert("Somthing is wrong");
    }
  };
};
getposts();

const onupdateBtn = ()=>{
  let updateObj = 
  {
    title:title.value,
    body:body.value,
    userId:userId.value
  }
  console.log(updateObj);
  let getEditId = localStorage.getItem('editId')
  console.log(getEditId);
  let upadteUrl = `${baseUrl}/posts/${getEditId}`
  console.log(upadteUrl);

  let xhr = new XMLHttpRequest();

  xhr.open('PATCH',upadteUrl,true);

  xhr.send(JSON.stringify(updateObj))

  xhr.onload = function()
  {
    if(xhr.status===200)
    {
      console.log(xhr.response);
      let getIndexofObj = postArray.findIndex(post=>{
        return post.id==getEditId
      })
      console.log(getIndexofObj);
        postArray[getIndexofObj].title=updateObj.title;
        postArray[getIndexofObj].body=updateObj.body;
        postArray[getIndexofObj].userId=updateObj.userId;

        templating(postArray)
    }

    createpost.reset()
    updateBtn.classList.add('d-none')
    submitBtn.classList.remove('d-none')
  }
  
}

createpost.addEventListener('submit',onposts);
updateBtn.addEventListener('click',onupdateBtn);


// --------------------------------------------------------------------

// Notes:-

// payload:-

// whatever the data is send to DB throw API Call is called Payload.