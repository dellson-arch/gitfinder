
let searchBtn = document.querySelector(".search")
let userNameinp = document.querySelector(".userNameinp")
let card = document.querySelector(".card");

function getProfileData(userName){
    return fetch(`https://api.github.com/users/${userName}`)
    .then(raw =>{
        if(!raw.ok) throw new Error("user not found")
            return raw.json();
    })
}
function getRepos(userName){
    return fetch(`https://api.github.com/users/${userName}/repos?sort=updated`)
    .then(raw => {
        if(!raw.ok) throw new Error("failed to fetch repos")
            return raw.json();
    })
}

function decorateProfileData(details){
    console.log(details);
    let data = `
      <div class="flex items-center gap-4">
        <img id="avatar" src="${details.avatar_url}" class="w-16 h-16 rounded-full border-4 border-white shadow-md" />
        <div>
          <h2 id="name" class="font-bold text-xl">${details.name}</h2>
          <p id="bio" class="text-sm text-white/70">${details.bio}</p>
        </div>
      </div>
      <div>
        <h3 class="font-semibold text-lg mb-2">🗂 Latest Repositories:</h3>
        <ul id="repos" class="list-disc pl-5 text-sm space-y-1 text-white/90"> ${details.public_repos}</ul>
      </div>
    `
    card.innerHTML = data;

}
searchBtn.addEventListener("click",function(){
    let userName = userNameinp.value.trim()
    if(userName.length > 0){
        getProfileData(userName).then(function(data){
            decorateProfileData(data)
        })
    }else{
        alert()
    }
})
