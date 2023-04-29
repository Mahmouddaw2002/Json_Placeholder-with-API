function getPosts(userId) {
  let i = 0;

  fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userId, {
    responseType: "json",
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((posts) => {
      document.getElementById("posts").innerHTML = "";
      for (post of posts) {
        let content = `
            <div id="post">
                <h2>${++i}- ${post.title}</h2>
                <h3>
                 ${post.body}
                </h3>
           </div>
              `;
        document.getElementById("posts").innerHTML += content;
      }
    });
}

function getUsers() {
  let i = 0;

  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET",
      responseType: "json",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          reject("error with users request");
        }
      })
      .then((users) => {
        document.getElementById("users").innerHTML = "";
        for (user of users) {
          let content = `
                <div id="user" onclick="userClicked(${user.id}, this)">
                <h2>${++i}- ${user.name}</h2>
                <h3>${user.email}</h3>
              </div>
                  `;
          document.getElementById("users").innerHTML += content;
        }
        resolve();
      });
  });
}
getUsers()
  .then(() => {
    getPosts();
  })
  .catch((error) => console.log(error));

function userClicked(id, ele) {
  getPosts(id);

  let selectedElement = document.getElementsByClassName("selected");

  for (element of selectedElement) {
    element.classList.remove("selected");
  }
  ele.classList.add("selected");
}
